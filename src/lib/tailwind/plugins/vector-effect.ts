import plugin from 'tailwindcss/plugin.js';

export default plugin(({ addUtilities }) => {
  const utilities = {
    '.vector-non-scaling-stroke': {
      'vector-effect': 'non-scaling-stroke'
    },
    '.vector-non-scaling-size': {
      'vector-effect': 'non-scaling-size'
    },
    '.vector-non-rotation': {
      'vector-effect': 'non-rotation'
    },
    '.vector-fixed-position': {
      'vector-effect': 'fixed-position'
    },
    '.vector-effect-none': {
      'vector-effect': 'none'
    }
  };
  addUtilities(utilities);
});
