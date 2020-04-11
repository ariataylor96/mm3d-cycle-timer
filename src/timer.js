class Timer {
  running = false;
  startTime = null;
  homeBufferTime = 3700;

  wrongWarpWindowOffset = 149000;
  zeroDayWindowOffset = 84000;

  wrongWarpWindowLength = 15000;
  zeroDayWindowLength = 15000;

  get inWrongWarpWindow() {
    return this.inWindow(this.wrongWarpWindowOffset, this.wrongWarpWindowLength);
  }

  get inZeroDayWindow() {
    return this.inWindow(this.zeroDayWindowOffset, this.zeroDayWindowLength);
  }

  inWindow = (offset, length) => {
    if (!this.running) {
      return false;
    }

    const currentTime = Date.now();
    const delta = (currentTime - this.startTime) % offset;

    if (currentTime - this.startTime < offset) {
      return false;
    }

    return delta > 0 && delta < length;
  };

  start = () => {
    this.running = true;
    this.startTime = Date.now();
  };

  stop = () => {
    this.running = false;
    this.startTime = null;
  };

  toggle = () => {
    if (this.running) {
      return this.stop();
    }

    return this.start();
  };

  homeBuffer = () => {
    if (!this.running) {
      return;
    }

    this.startTime += this.homeBufferTime;
  };

  undoHomeBuffer = () => {
    if (!this.running) {
      return;
    }

    this.startTime -= this.homeBufferTime;
  };
}

export default Timer;
