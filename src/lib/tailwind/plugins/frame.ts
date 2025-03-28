import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      frame: (value, { modifier }) => {
        const css: Record<string, string | Record<string, string>> = {
          width: '100%',
          'margin-inline': 'auto'
        };
        const pad = Number(modifier ?? theme('framePadding', 2));
        if (pad && !isNaN(pad)) {
          css['padding-inline'] = `calc(1rem * ${pad})`;
        }
        if (value) {
          const max = Number(value);
          if (max && !isNaN(max)) {
            css['max-width'] = `calc(1rem * ${max})`;
            if (pad && !isNaN(pad)) {
              css[`@media (min-width: calc(1rem * ${max + 2 * pad}))`] = {
                'padding-inline': '0px'
              };
            }
          }
        }
        return css;
      }
    },
    {
      values: Object.assign(theme('frameMaxSize', {}), {
        DEFAULT: '64',
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
