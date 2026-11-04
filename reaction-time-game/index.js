const panel = document.getElementById("second");
const iconEl = document.getElementById("icon");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const lastEl = document.getElementById("last");
const bestEl = document.getElementById("best");

const icons = {
  target: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis preview-icon"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  go: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle preview-icon"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  early: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2 preview-icon"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>`,
};

const states = {
  idle: { classes: "bg-[#27272A] text-[#F4F4F5]", icon: icons.target },
  waiting: { classes: "bg-[#5E0808] text-white", icon: icons.clock },
  go: { classes: "bg-[#D9F99D] text-[#09090B]", icon: icons.go },
  early: { classes: "bg-[#27272A] text-white", icon: icons.early },
  result: { classes: "bg-[#27272A] text-white", icon: icons.target },
};

let state = "idle";
let startTime = 0;
let timerId = null;
let best = null;

const setState = (newState, title, subtitle) => {
  Object.values(states).forEach((s) => panel.classList.remove(...s.classes.split(" ")));
  state = newState;
  panel.classList.add(...states[newState].classes.split(" "));
  iconEl.innerHTML = states[newState].icon;
  titleEl.textContent = title;
  subtitleEl.textContent = subtitle;
};
const startRound = () => {
  setState("waiting", "Wait for green…", "Not yet.Stay ready.");
  const delay = 1500 + Math.random() * 3000;
  timerId = setTimeout(() => {
    startTime = performance.now();
    setState("go", "Click now!", "Go, go, go!");
  }, delay);
};
const handleAction = () => {
  if (state === "idle" || state === "result" || state === "early") {
    startRound();
  } else if (state === "waiting") {
    clearTimeout(timerId);
    setState("early", "Too Soon", "Click to try again");
  } else if (state === "go") {
    const ms = Math.round(performance.now() - startTime);

    lastEl.textContent = `${ms} ms`;
    if (best === null || ms < best) {
      best = ms;
      bestEl.textContent = `${best} ms`;
    }
    setState("result", `${ms} ms`, "Click to go again");
  }
};
panel.addEventListener("click", handleAction);