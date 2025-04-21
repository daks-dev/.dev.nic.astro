const config = {
  extend: {
    theme: {
      color: ['theme']
    },
    classGroups: {
      'iconify-icon': [
        {
          ph: [(x: string) => /^-([\w\d-]+)$/.test(x)]
        }
      ]
    }
  }
};

export default config;
