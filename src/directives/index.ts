import type { Directive } from 'vue';

const digitsOnly: Directive = {
  mounted (el) {
    el.addEventListener('keypress', (e: any) => {
      const regex = /^\d+$/;
      const isDigits = regex.test(e.key);
      if (!isDigits) {
        e.preventDefault();
      }
    });
  },
};

export { digitsOnly };
