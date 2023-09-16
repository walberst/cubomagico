// Select the container element
const box = document.querySelector(".box");

const directions = ["front", "back", "left", "right", "top", "bottom"];

var movementsPoints = 0;

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

    const configs = buttonConfig[j];
    for (var config of configs) {
      span.appendChild(
        buttonsRotateBlock(directionName, config.side, config.column)
      );
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

function getPositionsCube() {
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

  return cube;
}

// Function to rotate blocks
function rotateBlock(face, side, verticality, column) {
  const direction = verticality === "vertical" ? "v" : "h";

  const cube = getPositionsCube();

  const movements = {
    vertical: {
      front: {
        up: ["front", "bottom", "back", "top"],
        down: ["front", "top", "back", "bottom"],
      },
      back: {
        up: ["back", "top", "front", "bottom"],
        down: ["back", "bottom", "top", "front"],
      },
      left: {
        up: ["left", "bottom", "right", "top"],
        down: ["left", "top", "bottom", "right"],
      },
      right: {
        up: ["right", "bottom", "left", "top"],
        down: ["right", "top", "bottom", "left"],
      },
      top: {
        up: ["top", "back", "bottom", "front"],
        down: ["top", "front", "bottom", "back"],
      },
      bottom: {
        up: ["bottom", "front", "top", "back"],
        down: ["bottom", "back", "top", "front"],
      },
    },
    horizontal: {
      front: {
        left: ["front", "right", "back", "left"],
        right: ["front", "left", "back", "right"],
      },
      back: {
        left: ["back", "right", "front", "left"],
        right: ["back", "left", "front", "right"],
      },
      left: {
        left: ["left", "front", "right", "back"],
        right: ["left", "back", "right", "front"],
      },
      right: {
        left: ["right", "back", "left", "front"],
        right: ["right", "front", "left", "back"],
      },
      top: {
        left: ["top", "right", "bottom", "left"],
        right: ["top", "left", "bottom", "right"],
      },
      bottom: {
        left: ["bottom", "right", "bottom", "left"],
        right: ["bottom", "left", "bottom", "right"],
      },
    },
  };

  const temp = cube[face][`${direction}${column}`].map((sub) => sub.className);
  const facesOrder = movements[verticality][face][side];

  facesOrder.forEach((currentFace, i) => {
    const nextFace = facesOrder[(i + 1) % facesOrder.length];
    cube[currentFace][`${direction}${column}`].forEach((sub, j) => {
      sub.className = cube[nextFace][`${direction}${column}`][0].className;
      if (currentFace === facesOrder[facesOrder.length - 1]) {
        sub.className = temp[j];
      }
    });
  });
}

// Function to make buttons to rotate blocks
function buttonsRotateBlock(face, side, column) {
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
    rotateBlock(face, side, direction, column);
    scoreboard();
  });

  button.classList.add("rotate_block");
  icon.classList.add("fas", `fa-arrow-${side}`);

  return button;
}

function scoreboard() {
  movementsPoints++;
  document.getElementById("movements").innerHTML = movementsPoints;

  let fullSides = 0;
  fullSides +=
    document.querySelectorAll(".front span.cube_front").length === 9 ? 1 : 0;
  fullSides +=
    document.querySelectorAll(".bottom span.cube_bottom").length === 9 ? 1 : 0;
  fullSides +=
    document.querySelectorAll(".back span.cube_back").length === 9 ? 1 : 0;
  fullSides +=
    document.querySelectorAll(".top span.cube_top").length === 9 ? 1 : 0;
  fullSides +=
    document.querySelectorAll(".left span.cube_left").length === 9 ? 1 : 0;
  fullSides +=
    document.querySelectorAll(".right span.cube_right").length === 9 ? 1 : 0;
  document.getElementById("fullSides").innerHTML = `${fullSides} / 6`;
}
