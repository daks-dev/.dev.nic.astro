import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      wrapper: (value, { modifier }) => {
        const css: Record<string, string | Record<string, string>> = {
          width: '100%',
          'margin-inline': 'auto'
        };
        if (modifier) {
          const indent = Number(modifier);
          if (indent && !isNaN(indent)) {
            css['padding-inline'] = `calc(1rem * ${indent})`;
          }
        }
        if (value) {
          const max = Number(value);
          if (max && !isNaN(max)) {
            css['max-width'] = `calc(1rem * ${max})`;
          }
        }
        return css;
      }
    },
    {
      values: Object.assign(theme('wrapperMaxSize', {}), {
        DEFAULT: '',
        sm: '40',
        md: '48',
        lg: '64',
        xl: '80',
        '2xl': '96'
      }),
      modifiers: 'any'
    }
  );
});
