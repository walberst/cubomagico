let box = document.querySelector(".box");

const color = [
  "#3db911",
  "#df980b",
  "#04a4f4",
  "#04f4a8",
  "#1932f3",
  "#bd0049",
];

const directions = ["front", "back", "left", "right", "top", "bottom"];

for (var i of directions) {
  let direction = document.createElement("div");
  box.appendChild(direction);
  direction.classList.add(i);
  direction.setAttribute("style", `--clr:${color[directions.indexOf(i)]}`);

  for (let j = 0; j < 9; j++) {
    let span = document.createElement("span");
    direction.appendChild(span);
  }

  direction
    .querySelector("span")
    .setAttribute("style", `--clr:${color[directions.indexOf(i)]}`);
}
