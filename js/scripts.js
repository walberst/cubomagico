// Select the container element
const box = document.querySelector(".box");

const directions = ["front", "back", "left", "right", "top", "bottom"];

// Create direction elements and append them to the container
function createDirection(directionName) {
  const direction = document.createElement("div");
  direction.classList.add(directionName);

  const buttonConfig = [
    [
      { side: "left", x: 0, y: 0, column: 1 },
      { side: "up", x: 0, y: 0, column: 1 },
    ],

    [{ side: "up", x: 0, y: 0, column: 2 }],

    [
      { side: "up", x: 0, y: 0, column: 3 },
      { side: "right", x: 0, y: 0, column: 1 },
    ],

    [{ side: "left", x: 0, y: 0, column: 2 }],

    [{ side: "", x: 0, y: 0 }],

    [{ side: "right", x: 0, y: 0, column: 2 }],

    [
      { side: "left", x: 0, y: 0, column: 3 },
      { side: "down", x: 0, y: 0, column: 3 },
    ],

    [{ side: "down", x: 0, y: 0, column: 3 }],

    [
      { side: "down", x: 0, y: 0, column: 3 },
      { side: "right", x: 0, y: 0, column: 3 },
    ],
  ];

  for (let j = 0; j < 9; j++) {
    const span = document.createElement("span");
    direction.appendChild(span);

    span.classList.add(`cube_${directionName}`);

    span.classList.add("x" + j);

    const configs = buttonConfig[j];
    for (var config of configs) {
      span.appendChild(buttonsRotateBlock(config.side, config.column));
    }
  }

  return direction;
}

directions.forEach((directionName) => {
  const directionElement = createDirection(directionName);
  box.appendChild(directionElement);
});

let posX = -100;
let posY = -330;
rotateCube(-100, -300);

// Define rotation buttons
const buttonsRotateConfig = [
  { id: "rotate_up", deltaX: 0, deltaY: 50 },
  { id: "rotate_down", deltaX: 0, deltaY: -50 },
  { id: "rotate_left", deltaX: -50, deltaY: 0 },
  { id: "rotate_right", deltaX: 50, deltaY: 0 },
];

// Function to handle button clicks
function handleRotationClick(deltaX, deltaY) {
  posX += deltaX;
  posY += deltaY;
  rotateCube(posX, posY);
}

// Add click event listeners to the rotation buttons
buttonsRotateConfig.forEach((config) => {
  const button = document.getElementById(config.id);
  button.addEventListener("click", () =>
    handleRotationClick(config.deltaX, config.deltaY)
  );
});

// Function to rotate the cube
function rotateCube(x, y) {
  const Xvalue = Math.floor(x / 2 + 100);
  const Yvalue = Math.floor(y / 2 + 100);
  box.style.transform = `rotateX(${Yvalue}deg) rotateY(${Xvalue}deg)`;
}

// Function to rotate blocks
function rotateBlock(side, direction, column) {
  direction = direction === "vertical" ? "v" : "h";

  const faces = ["front", "back", "left", "right", "top", "bottom"];

  const cube = {};

  for (const face of faces) {
    cube[face] = {
      v1: [],
      v2: [],
      v3: [],
      h1: [],
      h2: [],
      h3: [],
    };
    const spans = document.querySelectorAll(`.${face} span`);
    for (let i = 0; i < 3; i++) {
      cube[face].h1.push(spans[i]);
      cube[face].h2.push(spans[i + 3]);
      cube[face].h3.push(spans[i + 6]);
      cube[face].v1.push(spans[i * 3]);
      cube[face].v2.push(spans[i * 3 + 1]);
      cube[face].v3.push(spans[i * 3 + 2]);
    }
  }

  if (direction === "v" && side === "up") {
    const temp = cube["front"][`${direction}${column}`];
    const facesOrder = ["front", "bottom", "back", "top"];
    for (let i = 0; i < facesOrder.length; i++) {
      const currentFace = facesOrder[i];
      const nextFace = facesOrder[(i + 1) % facesOrder.length];
      for (var sub of cube[currentFace][`${direction}${column}`]) {
        sub.className = cube[nextFace][`${direction}${column}`][0].className;
        if (currentFace === "top") {
          sub.className = temp[0].className;
        }
      }
    }
  }
}

// Function to make buttons to rotate blocks
function buttonsRotateBlock(side, column) {
  if (side === "") {
    let img = document.createElement("img");
    img.src = "img/logo.jpg";
    return img;
  }
  const button = document.createElement("button");
  const icon = document.createElement("i");

  button.appendChild(icon);

  button.addEventListener("click", () => {
    let direction = "vertical";
    if (side === "left" || side === "right") {
      direction = "horizontal";
    }
    rotateBlock(side, direction, column);
  });

  button.classList.add("rotate_block");
  icon.classList.add("fas", `fa-arrow-${side}`);

  return button;
}
