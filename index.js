let player;
let bullets = [];
let enemies = [];
let ebt = 0; //Enemy Bullets Timing
let level = -1;
let score = 0;
let bestScore = 0;
let cheats = false;
let lives = 0;

let canShoot = true;

function setup() {
  createCanvas(1000, 750);

  player = new Player(500, 650);

  spawnEnemies();

  if(getItem("bestScore") !== null) {
    bestScore = getItem("bestScore");
  }
}

function draw() {
  background(35);

  if(lives > 0) {
    enemiesBulletsPlayer();
    showMenu();
  } else {
    if(level > -1) {
      showGameOver();
    } else {
      showStartMenu(); 
    }
  }
}

function showForeground() {
  fill("rosybrown");

  strokeWeight(10);
  stroke("#704343");

  rect(-50, 660, 1100, 150);

  fill("#b38080");
  noStroke();

  // circle(50, 700, 30);
  // circle(200, 900, 400);
  // circle(250, 685, 15);
  // circle(400, 715, 50);
  // circle(475, 700, 20);
  // circle(600, 725, 25);
  // circle(700, 825, 200);
  // circle(725, 700, 15);
  // circle(850, 700, 40);
  // circle(950, 725, 20);
  
  circle(50, 700, 30);
  circle(200, 900, 400);
  circle(250, 685, 15);
  circle(400, 715, 50);
  circle(475, 700, 20);
  circle(600, 725, 25);
  circle(700, 825, 200);
  circle(725, 700, 15);
  circle(850, 700, 40);
  circle(950, 725, 20);
}

function showBackground() {
  fill("#9f6060");
  noStroke();

  triangle(0, 750, 500, 750, 250, 350);
  triangle(500, 750, 800, 750, 650, 550);

  textSize(125);
  fill(255, 10);
  textFont("cursive");

  text("Level " + level, 250, 500);
}

function resetEnemies() {
  enemies = [];

  spawnEnemies();
}

function showGameOver() {
  //Game Over Text

  fill("white");
  textFont("cursive");

  textSize(50);

  text("Game Over", 400, 300);

  //Score Text

  textSize(25);

  text("Score " + score, 375, 350);

  text("Best Score " + bestScore, 375, 400);

  //Continue Text

  text("press enter to try again", 375, 450);

  //Reset Level

  if(keyIsDown(13)) {
    resetEnemies();

    score = 0;
    lives = 3;
    level = 0;
    bullets = [];
  }
}

function showStartMenu() {
  //Game Name Text

  fill("white");
  textFont("cursive");

  textSize(50);

  text("Mars Invaders", 350, 300);

  //Score Text

  textSize(25);

  text("Best Score " + bestScore, 375, 350);

  //Continue Text

  text("press enter to start", 375, 400);

  textSize(15);

  text("© Ernest Klyukin 2023", 375, 725);

  //Start Game

  if(keyIsDown(13)) {
    resetEnemies();

    score = 0;
    lives = 3;
    level = 0;
  }
}

function showMenu() {
  //Menu Box

  noStroke();

  fill("white");

  rect(0, 0, 1000, 50);

  //Show Score

  fill(35);

  textFont("cursive");
  textSize(25);
  text("Score " + score, 20, 33);

  //text("Level : " + level, 20, 33);

  //Show Lives

  for(let i = 0; i < lives; i++) {
    circle(875 + i * 50, 25, 20)
  }
}

function spawnEnemies() {
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 9; j++){
      enemies.push(new Enemy(300 + j * 50, 150 + i * 50));
    }
  }
}

function enemiesBulletsPlayer() {
  showBackground();

  //Enemy Bullets

  if(ebt > 89 - (level * 2)) {
    if(enemies.length > 0) {
      let enemy = random(enemies);

      bullets.push(new Bullet(enemy.x, enemy.y, 5, "p", "orchid", 0));

      enemy.aTimer = 0;

      ebt = 0;
    }
  }

  //New Enemies
  
  if(enemies.length === 0) {
    spawnEnemies();

    bullets = [];

    level++;

    ebt = 0;
  }

  //Player Bullets

  if(keyIsDown(32)) {
    if(canShoot) {
      bullets.push(new Bullet(player.x + 5, player.y - 40, -5, "e", "white", (player.speedX) / 8));
      if(!cheats) {
        canShoot = false; 
      }
    }
  } else {
    canShoot = true;
  }

  //Bullets Movement
  //Player Damage

  for(let i = 0; i < bullets.length; i++){
    bullet = bullets[i];
    
    bullet.move();
    bullet.show();

    if(bullet.y < 0 || bullet.y > 750) {
      bullets.splice(i, 1);
    }

    if(player.checkBullet(bullet)) {
      bullets.splice(i, 1);
      lives -= 1;
    }
  }

  //Enemy Movement
  //Enemy Damage

  for(let i = 0; i < enemies.length; i++){
    enemy = enemies[i];

    enemy.move();
    enemy.show();

    for(let j = 0; j < bullets.length; j++){
      bullet = bullets[j];

      if(enemy.checkBullet(bullet)) {
        //enemies.splice(i, 1);
        bullets.splice(j, 1);
        score += 100;

        if(score > bestScore) {
          bestScore = score;
          storeItem("bestScore", bestScore);
        }
      }
    }

    if(player.checkEnemy(enemy)) {
      lives -= 1;
      enemy.hitPlayer = true;
    }

    if(enemy.y > 1000) {
      enemies.splice(i, 1);
    }
  }

  showForeground();

  //Player Movements

  player.move();
  player.show();

  ebt++;
}
