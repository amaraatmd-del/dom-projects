const generatePasswordButton = document.getElementById("generatePassword");
const passwordLengthRangeInput = document.getElementById("passwordLengthRangeInput");
const passwordLengthOutput = document.getElementById("passwordLengthOutput");
const message = document.getElementById("message");
const copyGeneratedPassword = document.getElementById("copyGeneratedPassword");
const showGeneratedPassword = document.getElementById("showGeneratedPassword");

const characters =
  "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
let password = ""; 
const addRandomChar = () => {
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;
  do {
    crypto.getRandomValues(random);
  } while (random[0] >= limit);
  password += characters[random[0] % characters.length];
};
const generatePassword = () => {
  password = ""; 
  const length = Number(passwordLengthRangeInput.value);
  for (let i = 0; i < length; i++) {
    addRandomChar();
  }
  showGeneratedPassword.value = password;
  message.textContent = defaultMessage;
};
const generatePasswordFromRange = () => {
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
  generatePassword();
};
const copyGenerated = () => {
  navigator.clipboard.writeText(showGeneratedPassword.value);
  copyGeneratedPassword.textContent = "Copied";
  message.textContent = "Password copied to clipboard";
  setTimeout(() => {
    copyGeneratedPassword.textContent = "Copy";
    message.textContent = defaultMessage;
  }, 1500);
};
generatePasswordButton.addEventListener("click", generatePassword);
passwordLengthRangeInput.addEventListener("input", generatePasswordFromRange);
copyGeneratedPassword.addEventListener("click", copyGenerated);

generatePasswordFromRange();