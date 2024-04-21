import { useAxios } from '@/utils/Axios';
import type {
  LoanPurposesApiResponse,
  RequestedRepaymentPeriodsApiResponse,
  RequestedTermMonthsApiResponse,
} from '@/types/RepaymentCalculatorTypes';

const axios: any = useAxios();

export async function useGetLoanPurposesApi (): Promise<LoanPurposesApiResponse[]> {
  const url = '/loan-purposes';
  const res = await axios.get(url);
  return res.data;
}

export async function useGetRequestedRepaymentPeriodsApi (): Promise<RequestedRepaymentPeriodsApiResponse[]> {
  const url = '/requested-repayment-periods';
  const res = await axios.get(url);
  return res.data;
}

export async function useGetRequestedTermMonthsApi (): Promise<RequestedTermMonthsApiResponse[]> {
  const url = '/requested-term-months';
  const res = await axios.get(url);
  return res.data;
}
