const bp = import.meta.env.PUBLIC_BREAKPOINT ?? '';

export default /^[1-9]\d{2,3}$/.test(bp)
  ? `${Math.round(bp)}px`
  : /^[1-9]\d{2,3}px$/.test(bp)
    ? bp
    : '800px';
