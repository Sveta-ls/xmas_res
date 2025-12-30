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
  // Ищем контейнер - проверяем оба варианта
  let container =
    document.getElementById("confettiContainer") ||
    document.querySelector(".confetti-container");

  // Если контейнера нет - создаем
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
    console.log("Контейнер для конфетти создан!");
  }

  const btn = document.getElementById("confettiBtn");

  if (!btn) {
    console.error("Кнопка с id='confettiBtn' не найдена!");
    return;
  }

  // Добавляем анимацию к кнопке
  btn.classList.add("celebrating");
  btn.disabled = true;
  btn.textContent = "🎉 Ура! 🎉";

  // Цвета для конфетти
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

  // Запускаем конфетти с обеих сторон
  createConfettiSide("left");
  createConfettiSide("right");

  // Через 3 секунды сбрасываем
  setTimeout(() => {
    btn.classList.remove("celebrating");
    btn.disabled = false;
    btn.textContent = "вот сюда!";
  }, 3000);

  function createConfettiSide(side) {
    const count = 40;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        // Случайные свойства
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 8 + Math.random() * 12;
        const isRound = Math.random() > 0.5;

        // Позиционирование
        const startLeft =
          side === "left" ? Math.random() * 30 + 5 : Math.random() * 30 + 65;

        // Стили
        confetti.style.left = startLeft + "%";
        confetti.style.top = "50px";
        confetti.style.backgroundColor = color;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";
        confetti.style.borderRadius = isRound ? "50%" : "3px";

        // Случайные параметры
        const randomX = 100 + Math.random() * 200;
        const randomY = 100 + Math.random() * 200;
        const randomRotate = Math.random() * 360;

        // Устанавливаем CSS переменные
        confetti.style.setProperty("--random-x", randomX + "px");
        confetti.style.setProperty("--random-y", randomY + "px");
        confetti.style.setProperty("--random-rotate", randomRotate + "deg");

        // Анимация
        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;

        confetti.style.animation =
          side === "left"
            ? `confettiLeft ${duration}s ease-out ${delay}s forwards`
            : `confettiRight ${duration}s ease-out ${delay}s forwards`;

        container.appendChild(confetti);

        // Удаляем через 3.5 секунды
        setTimeout(() => {
          if (confetti.parentNode === container) {
            container.removeChild(confetti);
          }
        }, 3500);
      }, i * 20);
    }
  }
}

// Добавляем обработчик на кнопку
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("confettiBtn");
  if (btn) {
    btn.addEventListener("click", launchConfetti);
    console.log("Кнопка конфетти готова!");
  } else {
    console.error("Кнопка 'confettiBtn' не найдена в DOM!");
  }
});
