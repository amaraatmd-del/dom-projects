const counter = document.getElementById("counter");
const loadingBar = document.getElementById("loadingBar");
const messageEl = document.getElementById("message");
let startTime = null;
const LOADING_DURATION_MS = 5000;
const messages = [
  "Preparing your space","Bringing everything together","Adding the finishing touches","All set. Welcome in!",
];
const renderProgress = (percentage) => {
  const rounded = Math.floor(percentage);
  let currentMessage;
  if (rounded >= 100) currentMessage = 3;
  else if (rounded >= 80) currentMessage = 2;
  else if (rounded >= 35) currentMessage = 1;
  else currentMessage = 0;
  counter.textContent = rounded;
  loadingBar.style.width = `${rounded}%`;
  messageEl.textContent = messages[currentMessage];
};
const updateProgress = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const percentage = Math.min(
    ((timestamp - startTime) / LOADING_DURATION_MS) * 100,100);
  renderProgress(percentage);
  if (percentage < 100) {
requestAnimationFrame(updateProgress);
  }
};
requestAnimationFrame(updateProgress);
