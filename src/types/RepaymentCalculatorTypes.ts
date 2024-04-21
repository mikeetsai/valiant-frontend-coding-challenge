interface CalcRepaymentRequest {
  loanAmount: number | string;
  annualRate: number;
  repaymentPeriod: number;
  repaymentTermMonths: number;
}

interface CalcRepaymentResult {
  monthlyRepayment: number;
  totalRepayment: number;
  repaymentTermMonths: number;
}

interface LoanPurposesApiResponse {
  label: string;
  value: string;
  annualRate: number;
}

interface RequestedRepaymentPeriodsApiResponse {
  label: string;
  value: number;
}

interface RequestedTermMonthsApiResponse {
  label: string;
  value: number;
}

export type {
  CalcRepaymentRequest,
  CalcRepaymentResult,
  LoanPurposesApiResponse,
  RequestedRepaymentPeriodsApiResponse,
  RequestedTermMonthsApiResponse,
};
