const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

let selectedFamilies = ["red", "amber", "emerald", "sky", "violet", "pink"];

const hslToHex = (hue, saturation, light) => {
  const l = light / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;
    const value = l - amplitude * Math.max(-1, Math.min(position - 3, 9 - position, 1));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

const generateColorPalette = (familyNames) => {
  const palette = {};

  familyNames.forEach((familyName) => {
    const family = families.find((item) => item.name === familyName);
    palette[family.name] = {};

    shades.forEach((shade, index) => {
      palette[family.name][shade] = hslToHex(
        family.hue,
        family.saturation,
        lightness[index]
      );
    });
  });

  return palette;
};

const showStatus = (text) => {
  document.getElementById("status").textContent = text;
};


const createShadeItem = (shade, hex) => {
  const item = document.createElement("div");
  item.className = "cursor-pointer text-center";
  item.dataset.hex = hex;
  item.innerHTML = `
    <div class="h-[48px] w-full rounded-[10px]" style="background-color:${hex}"></div>
    <div class="mt-3 text-[14px]">${shade}</div>
    <div class="mt-1 text-[10px] text-[#A1A1AA]">${hex}</div>
  `;
  return item;
};
const fillRemainingShades = () => {
  document.querySelectorAll("[data-family]").forEach((row) => {
    const familyName = row.dataset.family;
    const familyShades = generateColorPalette([familyName])[familyName];

    shades.slice(1).forEach((shade) => {
      row.appendChild(createShadeItem(shade, familyShades[shade]));
    });
  });
};

const renderColors = () => {
  const palette = generateColorPalette(selectedFamilies);
  const colorContainer = document.getElementById("color-container");
  colorContainer.innerHTML = "";

  Object.keys(palette).forEach((family) => {
    const familyDiv = document.createElement("div");

    const familyTitle = document.createElement("div");
    familyTitle.className = "text-[16px] font-medium capitalize";
    familyTitle.textContent = family;

    const row = document.createElement("div");
    row.className = "mt-4 grid grid-cols-10 gap-[9px]";

    Object.keys(palette[family]).forEach((shade) => {
      row.appendChild(createShadeItem(shade, palette[family][shade]));
    });

    familyDiv.append(familyTitle, row);
    colorContainer.appendChild(familyDiv);
  });
};

const shufflePalettes = () => {
  selectedFamilies = [...families]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((family) => family.name);

  renderColors();
  showStatus("Palettes shuffled.");
};

document.getElementById("color-container").addEventListener("click", (event) => {
  const item = event.target.closest("[data-hex]");
  if (!item) return;

  navigator.clipboard.writeText(item.dataset.hex);
  showStatus(`${item.dataset.hex} copied`);
});
document.getElementById("shuffleBtn").addEventListener("click", shufflePalettes);
fillRemainingShades();