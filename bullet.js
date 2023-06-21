class Bullet {
  constructor(x, y, sy, t, c, sx) {
    this.x = x;
    this.y = y;
    this.sy = sy;
    this.sx = sx;
    this.t = t;
    this.c = c;
  }

  show() {
    fill(this.c);
    noStroke();

    circle(this.x, this.y, 8);
  }

  move() {
    this.y += this.sy;
    this.x += this.sx;
  }

  // reset(x, y, s, t) {
  //   this.x = x;
  //   this.y = y;
  //   this.s = s;
  //   this.t = t;
  // }
}
