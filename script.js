const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 5 + 5;
  this.speedY = Math.random() * 1 + 0.5;
  this.alpha = 1;
}

Heart.prototype.update = function () {
  this.y -= this.speedY;
  this.alpha -= 0.005;
};

Heart.prototype.draw = function () {
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = "pink";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(this.x + 2, this.y - 3, this.x + 6, this.y + 2, this.x, this.y + 6);
  ctx.bezierCurveTo(this.x - 6, this.y + 2, this.x - 2, this.y - 3, this.x, this.y);
  ctx.fill();
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.1) {
    hearts.push(new Heart(Math.random() * canvas.width, canvas.height));
  }
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

animate();
