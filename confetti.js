const confettiCanvas = document.getElementById("confetti");
const ctx2 = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.05 + 0.02,
    });
  }
}

function drawConfetti() {
  ctx2.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let p of confettiParticles) {
    ctx2.beginPath();
    ctx2.lineWidth = p.r;
    ctx2.strokeStyle = p.color;
    ctx2.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx2.lineTo(p.x + p.tilt, p.y + p.tilt + p.d);
    ctx2.stroke();
  }
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  for (let p of confettiParticles) {
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  }
}

function triggerConfetti() {
  createConfetti();
  drawConfetti();
  setTimeout(() => {
    confettiParticles = [];
    ctx2.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 4000);
}

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
