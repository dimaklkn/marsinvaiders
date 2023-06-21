class Enemy {
  constructor(x, y) {
    this.ox = x;
    this.oy = y;
    this.s = 0.5;
    this.x = x;
    this.y = y;
    this.a = 0;
    this.t = 0;
    this.aTimer = 15;
    this.gotHit = false;
    this.speedY = 0;
    this.hitPlayer = false;
  }

  show() {
    push();
    translate(this.x, this.y);

    if(this.gotHit) {
      rotate(this.a + 0.1);
      this.a += 0.1;
    }

    if(this.aTimer > 14) {
      fill("silver");
    } else {
      fill("tomato");
    }

    this.aTimer++;

    stroke(75);
    strokeWeight(2);
  
    fill(200);
    ellipse(0, 8, 40, 20);
  
    fill("MediumTurquoise");
    ellipse(0, 0, 24, 19);
  
    fill(255);
    noStroke();
    circle(5, - 2, 5);
    pop();
  }

  move() {
    if(this.gotHit) {
      this.speedY += 0.5;

      this.y += this.speedY;
    } else {
      this.x = this.ox + (150 * sin(this.t * 1));
      this.y = this.oy + (25 * sin(this.t * 7));
    }

    this.t += 0.01;
  }

  checkBullet(bullet) {
    if(dist(bullet.x, bullet.y, this.x, this.y) < 20)
      if(bullet.t === "e") {
        this.gotHit = true;
        //this.speedY = -1;
        return true;
      }
  }
}
