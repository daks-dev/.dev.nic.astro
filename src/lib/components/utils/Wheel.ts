interface WheelDelta {
  x: number;
  y: number;
  z: number;
}

class Wheel {
  static DELAY = 200;

  destroy: () => void;
  callback: (x: WheelDelta) => void;

  constructor(el: HTMLElement, cb: (x: WheelDelta) => void) {
    el.addEventListener('wheel', this.handle);
    this.destroy = () => {
      el.removeEventListener('wheel', this.handle, true);
      clearTimeout(this.timeout);
    };
    this.callback = cb;
  }

  timeout?: ReturnType<typeof setInterval>;

  delta = {
    x: 0,
    y: 0,
    z: 0
  };

  handle = (ev: WheelEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.timeout) {
      this.delta.x += ev.deltaX;
      this.delta.y += ev.deltaY;
      this.delta.z += ev.deltaZ;
      clearTimeout(this.timeout);
    } else {
      this.delta = {
        x: ev.deltaX,
        y: ev.deltaY,
        z: ev.deltaZ
      };
    }
    this.timeout = setTimeout(this.execute, Wheel.DELAY);
    //return false;
  };

  execute = () => {
    this.timeout = undefined;
    this.callback(this.delta);
  };
}

function wheel(node: HTMLElement, cb?: (x: WheelDelta) => void) {
  const action = cb ? new Wheel(node, cb) : { destroy: () => null };
  return {
    destroy() {
      action.destroy();
    }
  };
}

export { wheel };

export default Wheel;
