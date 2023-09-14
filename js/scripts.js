// Select the container element
const box = document.querySelector(".box");

// Define colors and directions
const colors = [
  "#4169E1",
  "#32CD32",
  "#FF4500",
  "#FFD700",
  "#8A2BE2",
  "#FFB6C1",
];
const directions = ["front", "back", "left", "right", "top", "bottom"];

// Function to create a direction element
function createDirection(directionName, color) {
  const direction = document.createElement("div");
  direction.classList.add(directionName);
  direction.style.setProperty("--clr", color);

  for (let j = 0; j < 9; j++) {
    const span = document.createElement("span");
    direction.appendChild(span);

    if (directionName === "top" && j === 4) {
      span.textContent = "AW";
      span.classList.add("nameLetters");
    }
  }

  return direction;
}

// Create direction elements and append them to the container
directions.forEach((directionName, index) => {
  const colorIndex = index % colors.length;
  const directionElement = createDirection(directionName, colors[colorIndex]);
  box.appendChild(directionElement);
});

let isKeyDown = false;
let posX = -100;
let posY = -330;
rotateCube(-100, -330);

// Define rotation buttons
const buttonTop = document.getElementById("rotate_up");
const buttonBottom = document.getElementById("rotate_down");
const buttonLeft = document.getElementById("rotate_left");
const buttonRight = document.getElementById("rotate_right");

// Function to handle button clicks
function handleRotationClick(deltaX, deltaY) {
  posX += deltaX;
  posY += deltaY;
  rotateCube(posX, posY);
}

// Add click event listeners to the rotation buttons
buttonTop.addEventListener("click", () => handleRotationClick(0, 50));
buttonBottom.addEventListener("click", () => handleRotationClick(0, -50));
buttonLeft.addEventListener("click", () => handleRotationClick(-50, 0));
buttonRight.addEventListener("click", () => handleRotationClick(50, 0));

// Function to rotate the cube
function rotateCube(x, y) {
  const Xvalue = Math.floor(x / 2 + 100);
  const Yvalue = Math.floor(y / 2 + 100);
  box.style.transform = `rotateX(${Yvalue}deg) rotateY(${Xvalue}deg)`;
}
