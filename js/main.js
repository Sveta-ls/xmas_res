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

function launchConfetti() {
  const container =
    document.getElementById("confettiContainer") ||
    document.querySelector(".confetti-container");

  if (!container) {
    const newContainer = document.createElement("div");
    newContainer.id = "confettiContainer";
    newContainer.className = "confetti-container";
    newContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(newContainer);
  }

  const btn = document.getElementById("confettiBtn");
  if (!btn) return;

  // Анимация кнопки
  btn.classList.add("celebrating");
  btn.disabled = true;
  btn.textContent = "🎉 Ура! 🎉";

  // Цвета
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#EF476F",
  ];

  // Создаем конфетти
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Одинаковый размер и форма
        const size = 12; // одинаковый размер

        confetti.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${
            side === 0 ? Math.random() * 40 + 5 : Math.random() * 40 + 55
          }%;
          top: 50px;
          z-index: 9999;
          animation: ${side === 0 ? "confettiLeft" : "confettiRight"} ${
          1.5 + Math.random() * 1.5
        }s ease-out ${Math.random() * 0.5}s forwards;
        `;

        document.body.appendChild(confetti);

        // Удаляем через 3 секунды
        setTimeout(() => confetti.remove(), 3000);
      }, i * 15 + side * 300);
    }
  }

  // Сбрасываем кнопку
  setTimeout(() => {
    btn.classList.remove("celebrating");
    btn.disabled = false;
    btn.textContent = "вот сюда!";
  }, 3000);
}

// Вешаем обработчик
document
  .getElementById("confettiBtn")
  ?.addEventListener("click", launchConfetti);
