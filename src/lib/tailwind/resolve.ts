const bp = import.meta.env.PUBLIC_BREAKPOINT ?? '';

export default /^[1-9]\d{2,3}$/.test(bp)
  ? `${Math.round((bp * 100) / 16) / 100}rem`
  : /^[1-9]\d{1,2}rem$/.test(bp)
    ? bp
    : '50rem';
