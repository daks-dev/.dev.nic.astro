interface SwipeDelta {
  x: number;
  y: number;
  h: boolean;
  v: boolean;
}

class Swipe {
  destroy: () => void;
  callback: (x: SwipeDelta) => void;

  constructor(el: HTMLElement, cb: (x: SwipeDelta) => void, touch = true, mouse = true) {
    if (touch) {
      el.addEventListener('touchstart', this.touch.start, { passive: true });
      el.addEventListener('touchend', this.touch.end, { passive: true });
    }
    if (mouse) {
      el.addEventListener('mousedown', this.mouse.start, {});
      el.addEventListener('mouseup', this.mouse.end);
    }
    this.destroy = () => {
      if (touch) {
        el.removeEventListener('touchstart', this.touch.start, true);
        el.removeEventListener('touchend', this.touch.end, true);
      }
      if (mouse) {
        el.removeEventListener('mousedown', this.mouse.start, true);
        el.removeEventListener('mouseup', this.mouse.end, true);
      }
    };
    this.callback = cb;
  }

  get screen() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }

  start = {
    x: 0,
    y: 0
  };
  end = {
    x: 0,
    y: 0
  };

  get delta(): SwipeDelta {
    return {
      x: this.end.x - this.start.x,
      y: this.end.y - this.start.y,
      h: Math.abs(this.end.x - this.start.x) > this.screen.width / 10,
      v: Math.abs(this.end.y - this.start.y) > this.screen.height / 10
    };
  }

  invoke = (ev: Event) => {
    ev instanceof MouseEvent && ev.preventDefault();
    ev.stopPropagation();
    return this;
  };

  touch = {
    start: (ev: TouchEvent) => {
      this.invoke(ev).start = {
        x: ev.touches[0].clientX,
        y: ev.touches[0].clientY
      };
    },
    end: (ev: TouchEvent) => {
      this.invoke(ev).end = {
        x: ev.changedTouches[0].clientX,
        y: ev.changedTouches[0].clientY
      };
      this.callback(this.delta);
    }
  };

  mouse = {
    start: (ev: MouseEvent) => {
      this.invoke(ev).start = {
        x: ev.clientX,
        y: ev.clientY
      };
    },
    end: (ev: MouseEvent) => {
      this.invoke(ev).end = {
        x: ev.clientX,
        y: ev.clientY
      };
      this.callback(this.delta);
    }
  };
}

function swipe(node: HTMLElement, cb?: (x: SwipeDelta) => void) {
  const action = cb ? new Swipe(node, cb) : { destroy: () => null };
  return {
    destroy() {
      action.destroy();
    }
  };
}

swipe.touch = function (node: HTMLElement, cb?: (x: SwipeDelta) => void) {
  const action = cb ? new Swipe(node, cb, true, false) : { destroy: () => null };
  return {
    destroy() {
      action.destroy();
    }
  };
};

swipe.mouse = function (node: HTMLElement, cb?: (x: SwipeDelta) => void) {
  const action = cb ? new Swipe(node, cb, false, true) : { destroy: () => null };
  return {
    destroy() {
      action.destroy();
    }
  };
};

export { swipe };

export default Swipe;
