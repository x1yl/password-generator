const includeLetters = document.getElementById("include-letters");
const includeNumbers = document.getElementById("include-numbers");
const includePunctuation = document.getElementById("include-punctuation");
const mixedCase = document.getElementById("mixed-case");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const passwordDisplay = document.getElementById("password");
const passwordStrength = document.getElementById("password-strength");
const copyButton = document.getElementById("copy");
const reloadButton = document.getElementById("reload");

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
let characterSet = "";
lengthSlider.value = 20;

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
  generatePassword();
});

function generatePassword() {
  characterSet = "";
  if (includeLetters.checked) {
    characterSet += letters;
    if (mixedCase.checked) {
      characterSet += letters.toUpperCase();
    }
  }
  if (includeNumbers.checked) {
    characterSet += numbers;
  }
  if (includePunctuation.checked) {
    characterSet += punctuation;
  }

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }

  passwordDisplay.value = password;
  if (passwordDisplay.value.length <= 20) {
    passwordDisplay.style.width = 'auto';
  } else {
    passwordDisplay.style.width = ((passwordDisplay.value.length + 1) * 1.1) + 'ch';
} 
    updatePasswordStrength(password.length);
}

function updatePasswordStrength(length) {
  if (length <= 5) {
    passwordStrength.textContent = "Bad Password";
    passwordStrength.className = "text-red-500";
  } else if (length <= 10) {
    passwordStrength.textContent = "Weak Password";
    passwordStrength.className = "text-orange-500";
  } else {
    passwordStrength.textContent = "Strong Password";
    passwordStrength.className = "text-green-500";
  }
}

copyButton.addEventListener("click", () => {
  passwordDisplay.select();
  document.execCommand("copy");
  alert("Password copied to clipboard");
});

reloadButton.addEventListener("click", () => {
  generatePassword();
});

includeLetters.addEventListener("change", generatePassword);
includeNumbers.addEventListener("change", generatePassword);
includePunctuation.addEventListener("change", generatePassword);
mixedCase.addEventListener("change", generatePassword);

generatePassword();
