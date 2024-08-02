const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const centerDiv = document.getElementById("centerDiv");

const COLORS = [
  "#f0ab00",
  "#d52b1e",
  "#f0ab00",
  "#d52b1e",
  "#f0ab00",
  "#d52b1e",
  "#f0ab00",
  "#d52b1e",
];
const TEXT = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
  "Prize 7",
  "Prize 8",
];
const NUM_SECTIONS = COLORS.length;
const RADIUS = 350;
const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

const beat = new Audio("./spinn.mp3");

let angle = 0;
let isSpinning = false;
let spinSpeed = 0;
let targetAngle = 0;

function drawWheel() {
  const arcSize = (2 * Math.PI) / NUM_SECTIONS;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < NUM_SECTIONS; i++) {
    const startAngle = angle + i * arcSize;
    const endAngle = startAngle + arcSize;

    // Draw section
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.arc(CENTER_X, CENTER_Y, RADIUS, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = COLORS[i];
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw text
    const textAngle = startAngle + arcSize / 2;
    ctx.save();
    ctx.translate(
      CENTER_X + Math.cos(textAngle) * (RADIUS - 50),
      CENTER_Y + Math.sin(textAngle) * (RADIUS - 50)
    );
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(TEXT[i], -ctx.measureText(TEXT[i]).width / 2, 0);
    ctx.restore();
  }
}

function animateWheel() {
  //beat.play();
  if (isSpinning) {
    centerDiv.style.opacity = 0.75;
    angle += spinSpeed;
    if (spinSpeed > 0.001) {
      spinSpeed *= 0.995; // Gradually reduce speed
    } else {
      spinSpeed = 0;
      isSpinning = false;
      const selectedSegment =
        Math.floor(
          NUM_SECTIONS -
            ((angle % (2 * Math.PI)) / (2 * Math.PI)) * NUM_SECTIONS
        ) % NUM_SECTIONS;
      //beat.pause();
      centerDiv.style.opacity = 1;
      alert(`You won ${TEXT[selectedSegment]}!`);
    }
  }
  drawWheel();
  requestAnimationFrame(animateWheel);
}

spinButton.addEventListener("click", () => {
  if (!isSpinning) {
    isSpinning = true;
    spinSpeed = Math.random() * 0.3 + 0.2; // Set a random initial speed
  }
});

animateWheel();
drawWheel();
