const markers = document.getElementById("markers");
const numbers = document.getElementById("numbers");

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

for (let i = 0; i < 60; i++) {
  const marker = document.createElement("div");
  marker.className = "absolute inset-0";
  marker.style.transform = `rotate(${i * 6}deg)`;

  const tick = document.createElement("span");
  const tickType = i % 5 === 0 ? "w-0.5 h-3 bg-gray-600" : "w-px h-1.5 bg-gray-400";
  tick.className = `absolute left-1/2 top-0 -translate-x-1/2 ${tickType}`;

  marker.appendChild(tick);
  markers.appendChild(marker);
}

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("span");
  const angle = (i - 3) * (Math.PI / 6);
  number.textContent = i;
  number.className = "absolute -translate-x-1/2 -translate-y-1/2";

  number.style.left = `${50 + 40 * Math.cos(angle)}%`;
  number.style.top = `${50 + 40 * Math.sin(angle)}%`;
  numbers.appendChild(number);
}

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  hour.style.transform = `rotate(${hours * 30}deg)`;
  minute.style.transform = `rotate(${minutes * 6}deg)`;
  second.style.transform = `rotate(${seconds * 6}deg)`;

  requestAnimationFrame(updateClock);
}

updateClock();