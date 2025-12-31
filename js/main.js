fetch("data/info.json")
  .then((res) => res.json())
  .then((info) => {
    renderInfoLeft("info-left-1", info[0]);
    renderInfoRight("info-right-1", info[1]);
    renderInfoLeft("info-left-2", info[2]);
    renderInfoRight("info-right-2", info[3]);
  });

function renderInfoLeft(id, data) {
  document.getElementById(id).innerHTML = `
    <div class="info_left info_left_bg" style="background-image: url(${data.bk})">
      <h1 class="info_l_h">${data.h}</h1>
      <p class="info_l_p">${data.text}</p>
    </div>
  `;
}

function renderInfoRight(id, data) {
  document.getElementById(id).innerHTML = `
    <div class="info_right">
      <div
        class="info_right_bg"
        style="background-image: url(${data.bk})"
      >
        <div class="info_right_content">
          <h1 class="info_r_h">${data.h}</h1>
          <p class="info_r_p">${data.text}</p>
        </div>
      </div>
    </div>
  `;
}

document.querySelectorAll(".click-img").forEach((img) => {
  img.addEventListener("click", () => {
    img.classList.add("ripple-animation");
    setTimeout(() => img.classList.remove("ripple-animation"), 500);
  });
});

document.querySelectorAll(".g_grid").forEach((img) => {
  img.addEventListener("click", () => {
    img.classList.add("ripple-animation");
    setTimeout(() => img.classList.remove("ripple-animation"), 500);
  });
});

document.querySelectorAll(".grid-2x2 img").forEach((img) => {
  img.addEventListener("click", function () {
    document.querySelectorAll(".grid-2x2 img").forEach((i) => {
      i.classList.remove("clicked");
    });
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 500);
  });
});

function launchConfetti() {
  let container =
    document.getElementById("confettiContainer") ||
    document.querySelector(".confetti-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "confettiContainer";
    container.className = "confetti-container";
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(container);
  }

  const btn = document.getElementById("confettiBtn");

  if (!btn) {
    return;
  }
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#EF476F",
    "#FF9A76",
    "#A3DE83",
    "#FE5F55",
    "#9B5DE5",
    "#F15BB5",
    "#00BBF9",
  ];
  createConfettiSide("left");
  createConfettiSide("right");

  setTimeout(() => {
    btn.classList.remove("celebrating");
    btn.disabled = false;
    btn.textContent = "вот сюда!";
  }, 3000);

  function createConfettiSide(side) {
    const count = 40;
    const confettiSize = 12;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        const color = colors[Math.floor(Math.random() * colors.length)];

        const startLeft =
          side === "left" ? Math.random() * 30 + 5 : Math.random() * 30 + 65;

        confetti.style.cssText = `
          position: absolute;
          left: ${startLeft}%;
          top: 50px;
          width: ${confettiSize}px;
          height: ${confettiSize}px;
          background-color: ${color};
          border-radius: 50%;
          opacity: 0;
        `;

        const randomX = 100 + Math.random() * 200;
        const randomY = 100 + Math.random() * 200;
        const randomRotate = Math.random() * 360;

        confetti.style.setProperty("--random-x", randomX + "px");
        confetti.style.setProperty("--random-y", randomY + "px");
        confetti.style.setProperty("--random-rotate", randomRotate + "deg");

        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;

        confetti.style.animation =
          side === "left"
            ? `confettiLeft ${duration}s ease-out ${delay}s forwards`
            : `confettiRight ${duration}s ease-out ${delay}s forwards`;

        container.appendChild(confetti);
        setTimeout(() => {
          if (confetti.parentNode === container) {
            container.removeChild(confetti);
          }
        }, 3500);
      }, i * 20);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("confettiBtn");
  if (btn) {
    btn.addEventListener("click", launchConfetti);
  } else {
    console.error("Кнопка 'confettiBtn' не найдена в DOM!");
  }
});
