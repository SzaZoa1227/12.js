const btn = document.getElementById("submit");
const email = document.getElementById("email");
const pw = document.getElementById("password");
const pw2 = document.getElementById("password2");
const emailHelp = document.getElementById("emailHelp");
const pwHelp = document.getElementById("pwHelp");
const pw2Help = document.getElementById("pw2Help");
const message = document.getElementById("message");

function isValidEmail(email) {
  let charsAfterDot = email.length - email.lastIndexOf(".") - 1;
  let charsAfterAt = email.length - email.lastIndexOf("@") - 2;
  if (
    !email.includes("@") ||
    !email.includes(".") ||
    charsAfterDot < 2 ||
    charsAfterDot > 3 ||
    charsAfterDot === charsAfterAt
  ) {
    emailHelp.textContent = "Kérlek adj meg egy érvényes e-mail címet.";
    return false;
  }

  console.log(charsAfterDot, charsAfterAt);
  return true;
}

function isValidPw(pw1, pw2) {
  if (pw.value !== pw2.value) {
    pw2Help.textContent = "A két jelszó nem egyezik.";
    ok = false;
    return false;
  } else if (pw.value === "") {
    pw2Help.textContent = "Adj meg egy jelszót.";
    return false;
  }
}

function clearErrors() {
  emailHelp.textContent = "";
  pwHelp.textContent = "";
  pw2Help.textContent = "";
  message.textContent = "";
}
btn.addEventListener("click", () => {
  clearErrors();
  if (isValidEmail(email.value) && isValidPw(pw.value, pw2.value)) {
    message.textContent = "Sikeres regisztráció. (demo)";
    console.log("Mukodok");
  }
});
