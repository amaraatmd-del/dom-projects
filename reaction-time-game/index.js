const reaction = document.getElementById("reaction");
const second = document.getElementById("second"); 
const third = document.getElementById("third");  
const titleEl = document.getElementById("title");
const lastEl = document.getElementById("last");
const bestEl = document.getElementById("best");
const subtitleEl = second.lastElementChild;   

let state = "idle"; 
let startTime = 0;
let timerId = null;
let best = null;

const colors = {
  idle: "bg-[#27272A]",
  waiting: "bg-[#B91C1C]",
  go: "bg-[#16A34A]",
  early: "bg-[#A16207]",
  result: "bg-[#27272A]",
};

const setState = (newState, title, subtitle) => {
  Object.values(colors).forEach((c) => second.classList.remove(c));
  state = newState;
  second.classList.add(colors[newState]);
  titleEl.textContent = title;
  subtitleEl.textContent = subtitle;
};

const startRound = () => {
  setState("waiting", "Wait for green…", "Don't click yet");
  const delay = 1500 + Math.random() * 3000;
  timerId = setTimeout(() => {
    startTime = performance.now();
    setState("go", "Click now!", "As fast as you can");
  }, delay);
};

const handleAction = () => {
  if (state === "idle" || state === "result" || state === "early") {
    startRound();
  } else if (state === "waiting") {
    clearTimeout(timerId);
    setState("early", "Too early", "Click to try again");
  } else if (state === "go") {
    const ms = Math.round(performance.now() - startTime);
    lastEl.textContent = ms + " ms";
    if (best === null || ms < best) {
      best = ms;
      bestEl.textContent = best + " ms";
    }
    setState("result", ms + " ms", "Click to go again");
  }
};

second.addEventListener("click", handleAction);

second.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    handleAction();
  }
});