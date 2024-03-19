const heightRange = document.getElementById("height-range");
const heightRangeValueBox = document.getElementById("height-value");
const widthRange = document.getElementById("width-range");
const widthRangeValueBox = document.getElementById("width-value");
const submitGrid = document.getElementById("submit-grid");
const clearGrid = document.getElementById("clear-grid");
const colorInput = document.getElementById("color-input");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const container = document.querySelector(".container");

let erase = false;
let paint = false;

submitGrid.addEventListener("click", function () {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < heightRange.value; i++) {
    const row = document.createElement("div");
    row.classList.add("gridRow");
    for (let j = 0; j < widthRange.value; j++) {
      count += 1;
      const cell = document.createElement("div");
      cell.classList.add("gridCol");
      cell.setAttribute("id", `gridCell${count}`);
      row.appendChild(cell);

      // mousedown | touchstart
      cell.addEventListener("mousedown", function (e) {
        paint = true;
        if (erase === false) {
          cell.style.backgroundColor = colorInput.value;
        } else if (erase === true) {
          cell.style.backgroundColor = "transparent";
        }
      });
      cell.addEventListener("touchstart", function (e) {
        paint = true;
        if (erase === false) {
          cell.style.backgroundColor = colorInput.value;
        } else if (erase === true) {
          cell.style.backgroundColor = "transparent";
        }
      });

      // mousemove | touchmove
      cell.addEventListener("mousemove", function (e) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const allcells = document.querySelectorAll(`.gridCol`);

        allcells.forEach(function (cell) {
          if (cell == element) {
            if (paint === true && erase === false) {
              console.log("working");
              element.style.backgroundColor = colorInput.value;
            } else if (paint == true && erase == true) {
              element.style.backgroundColor = "transparent";
            }
          }
        });
      });

      cell.addEventListener("touchmove", function (e) {
        const element = document.elementFromPoint(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
        const allcells = document.querySelectorAll(`.gridCol`);

        allcells.forEach(function (cell) {
          if (cell == element) {
            if (paint === true && erase === false) {
              console.log("working");
              element.style.backgroundColor = colorInput.value;
            } else if (paint === true && erase === true) {
              element.style.backgroundColor = "transparent";
            }
          }
        });
      });

      // mouse down | touchend
      cell.addEventListener("mouseup", function () {
        paint = false;
      });
      cell.addEventListener("touchend", function () {
        paint = false;
      });
    }
    container.appendChild(row);
  }
});

heightRange.addEventListener("input", function () {
  console.log(heightRange.value);
  heightRangeValueBox.textContent =
    heightRange.value < 9 ? `0${heightRange.value}` : heightRange.value;
});

widthRange.addEventListener("input", function () {
  console.log(widthRange.value);
  widthRangeValueBox.textContent =
    widthRange.value < 9 ? `0${widthRange.value}` : widthRange.value;
});

clearGrid.addEventListener("click", function () {
  container.innerHTML = "";
  erase = false;
  paint = false;
});

eraseBtn.addEventListener("click", function () {
  erase = true;
});

paintBtn.addEventListener("click", function () {
  erase = false;
});

window.onload = () => {
  widthRange.value = 0;
  heightRange.value = 0;

  widthRangeValueBox.textContent = "0";
  heightRangeValueBox.textContent = "0";
};
