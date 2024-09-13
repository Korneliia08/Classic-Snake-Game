let canvasEl = $(".canvasEl")[0];
let ctx = canvasEl.getContext("2d");

let width = canvasEl.width;
let height = canvasEl.height;
let blockSize = 28;
let widthIdBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
let colorType = Math.floor(Math.random() * 3);

function drawBorder() {
  ctx.fillStyle = "rgba(169,227,255,0.92)";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
}

function drawScore() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, blockSize, blockSize);
}

function circle(x, y, r, fill) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function gameOver() {
  clearInterval(intervalId);
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game over", width / 2, height / 2);
}

let Block = function (col, row) {
  this.col = col;
  this.row = row;
  let getRandomColor = () => {
    let r, g, b;

    switch (colorType) {
      case 0:
        r = 0;
        g = Math.floor(Math.random() * 50) + 150;
        b = 0;
        break;
      case 1:
        r = Math.floor(Math.random() * 50) + 150;
        g = 0;
        b = 0;
        break;
      case 2:
        r = 0;
        g = 0;
        b = Math.floor(Math.random() * 50) + 150;
        break;
    }

    return `rgb(${r},${g},${b})`;
  };
  this.color = getRandomColor();
};

Block.prototype.drawSquare = function (color) {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  if (color) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = this.color;
  }

  ctx.fillRect(x, y, blockSize, blockSize);
  ctx.fill();

  if (color) {
    ctx.fillStyle = "#414AFF99";
    ctx.fillRect(x + 5, y + 5, blockSize / 8, blockSize / 8);
    ctx.fillRect(x + 15, y + 5, blockSize / 8, blockSize / 8);
    if (score > 4) {
      ctx.beginPath();
      ctx.strokeStyle = "#414AFF99";
      ctx.lineWidth = 2;
      ctx.arc(x + blockSize / 2, y + 14, 5, 0, Math.PI, false); // Центр рота і параметри дуги
      ctx.stroke();
    } else {
      ctx.fillRect(x + 5, y + 15, blockSize - 15, blockSize / 15);
    }
  }
};
Block.prototype.drawCircle = function () {
  // ctx.fillStyle = color;
  let x = this.col * blockSize + blockSize / 2;
  let y = this.row * blockSize + blockSize / 2;
  // circle(x, y, blockSize / 2, true);
  ctx.drawImage(appleImage, x - 10, y - 10, blockSize, blockSize);
};

Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

let Snake = function () {
  this.direction = "right";
  this.nextDirection = "right";
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5),
    new Block(4, 5),
  ];
};
Snake.prototype.move = function () {
  let head = this.segments[0];
  let newHead;
  this.direction = this.nextDirection;
  if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  }
  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
  this.segments.unshift(newHead);
};
Snake.prototype.draw = function () {
  for (let x = 0; x < this.segments.length; x++) {
    if (x === 0) {
      this.segments[x].drawSquare("yellow");
      continue;
    }

    this.segments[x].drawSquare();
  }
};
Snake.prototype.checkCollision = function (newHead) {
  let topCollision = newHead.row === 0;
  let bottomCollision = newHead.row === heightInBlocks - 1;
  let leftCollision = newHead.col === 0;
  let rightCollision = newHead.col === widthIdBlocks - 1;
  let wallCollision =
    topCollision || bottomCollision || leftCollision || rightCollision;
  let selfCollision = false;

  for (let x = 0; x < this.segments.length; x++) {
    selfCollision = newHead.equal(this.segments[x]);
    if (selfCollision) return true;
  }

  return wallCollision || selfCollision;
};
Snake.prototype.setDirection = function (nowDirection) {
  if (this.nextDirection === "up" && nowDirection === "down") {
    return;
  }
  if (this.nextDirection === "down" && nowDirection === "up") {
    return;
  }
  if (this.nextDirection === "left" && nowDirection === "right") {
    return;
  }
  if (this.nextDirection === "right" && nowDirection === "left") {
    return;
  }
  this.nextDirection = nowDirection;
};
let appleImage = new Image();
appleImage.src = "./assets/images/apple.png"; // Шлях до твого зображення яблука

let Apple = function () {
  this.position = new Block(5, 7);
};
Apple.prototype.move = function () {
  let randomX = Math.floor(Math.random() * (widthIdBlocks - 2)) + 1;
  let randomY = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomX, randomY);
  let ok = true;
  for (let x = 0; x < snake.segments.length; x++) {
    if (snake.segments[x].equal(this.position)) {
      ok = false;
    }
  }
  if (!ok) {
    this.move();
  }
};
Apple.prototype.draw = function () {
  this.position.drawCircle("red");
};

let snake = new Snake();

let apple = new Apple();

let intervalId = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  snake.move();
  drawScore();
  snake.draw();
  apple.draw();
  drawBorder();
}, 180);

let directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};
$("body").keydown((event) => {
  let nowDirection = directions[event.keyCode];
  if (nowDirection !== undefined) {
    snake.setDirection(nowDirection);
  }
});
