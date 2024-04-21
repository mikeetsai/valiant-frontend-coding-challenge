import { defineRule, configure } from 'vee-validate';
import { required, between, numeric } from '@vee-validate/rules';

import type { Rule, Messages } from '@/types/ValidationTypes';

defineRule('required', required);
defineRule('numeric', numeric);
defineRule('between', between);

configure({
  generateMessage: ({ rule, field }: { rule: Rule, field: string }) => {
    const messages: Messages = {
      required: `${field} is required`,
      numeric: `${field} must be a number`,
      between: `${field} must be between ${rule.params[0]} and ${rule.params[1]}`,
    };
    return messages[rule.name] || `${field} has an invalid value`;
  },
});
