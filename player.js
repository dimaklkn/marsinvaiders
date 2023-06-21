class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.gotHit = false;
    this.aTimer = 0;
    this.a = 0;
  }

  show() {
    rectMode(CENTER);
    angleMode(DEGREES);

    //Battery
    
    if(this.gotHit){
      fill("tomato");
    } else {
      fill(225);
    }
    
    stroke(75);
  
    strokeWeight(1);
  
    push();
    translate(this.x, this.y);
    rotate(45);
  
    rect(0 ,-37, 20);
    pop();

    //Canon
  
    rect(this.x + 5, this.y - 35, 10);
    rect(this.x + 5, this.y - 40, 15, 5);

    //Base
  
    rect(this.x + 5, this.y - 20, 50, 20, 0, 0, 20, 0);

    //Wheel Frame
  
    strokeWeight(3);
  
    line(this.x - 25, this.y, this.x - 25, this.y - 10);
    line(this.x - 25, this.y - 10, this.x, this.y - 18);
    line(this.x, this.y - 18, this.x + 10, this.y - 10);
    line(this.x + 10, this.y - 10, this.x, this.y);
    line(this.x + 10, this.y - 10, this.x + 20, this.y - 10);
    line(this.x + 20, this.y - 10, this.x + 20, this.y);

    //Arm
  
    line(this.x - 20, this.y - 20, this.x - 30 + this.speedX, this.y - 40 - this.speedX);
    line(this.x - 30 + this.speedX, this.y - 40 - this.speedX, this.x - 40 + this.speedX, this.y - 20 - this.speedX);

    //Camera Arm
  
    strokeWeight(2);
  
    line(this.x - 12, this.y - 30, this.x - 12, this.y - 50);

    //Arm End
  
    strokeWeight(8);
  
    point(this.x - 40 + this.speedX, this.y - 20 - this.speedX);

    //Camera
  
    strokeWeight(1);
  
    rect(this.x - 12, this.y - 55, 17, 10);
  
    circle(this.x -16, this.y - 55, 5);

    //Wheels
  
    strokeWeight(2);
  
    push();
    translate(this.x - 25, this.y);
    rotate(this.a);
    circle(0, 0, 15);
  
    line(7, 0, -7, 0);
    line(0, 7, 0, -7);
    pop();
  
    push();
    translate(this.x, this.y);
    rotate(this.a);
    circle(0, 0, 15);
  
    line(7, 0, -7, 0);
    line(0, 7, 0, -7);
    pop();
  
    push();
    translate(this.x + 20, this.y);
    rotate(this.a);
    circle(0, 0, 15);
  
    line(7, 0, -7, 0);
    line(0, 7, 0, -7);
    pop();

    if(this.gotHit) {
      this.aTimer++;
    } else {
      this.aTimer = 0;
    }

    if(this.aTimer > 14) {
      this.gotHit = false;
    }

    rectMode(CORNER);
    angleMode(RADIANS);
  }

  move() {
    if(keyIsDown(39)) {
      this.speedX += 3;
      //this.a += 5;
    }

    if(keyIsDown(37)) {
      this.speedX -= 3;
      //this.a -= 5;
    }

    this.speedX *= 0.75;

    this.x += this.speedX;
    this.x = constrain(this.x, 25, 975);

    this.a += this.speedX;
  }

  checkBullet(bullet) {
    if(dist(bullet.x, bullet.y, this.x, this.y) < 35){
      if(bullet.t === "p") {
        this.gotHit = true;
        return true;
      }
    }
  }

  checkEnemy(enemy) {
    if(dist(enemy.x, enemy.y, this.x, this.y) < 45){
      if(!enemy.hitPlayer) {
        this.gotHit = true;
        return true;
      }
    }
  }
}
