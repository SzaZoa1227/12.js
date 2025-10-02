    const form = document.getElementById('submit');
    const email = document.getElementById('email');
    const pw = document.getElementById('password');
    const pw2 = document.getElementById('password2');
    const emailHelp = document.getElementById('emailHelp');
    const pwHelp = document.getElementById('pwHelp');
    const pw2Help = document.getElementById('pw2Help');
    const formMessage = document.getElementById('formMessage');

    function isValidEmail(email) 
    {
      let charsAfterDot = 0;
      charsAfterDot = email.length - email.lastIndexOf('.') - 1;
      if (!email.includes('@') || !email.includes('.') || charsAfterDot === 0){
        emailHelp.textContent = 'Kérlek adj meg egy érvényes e-mail címet.';
        return false;
      }
      return true
    }

    function clearErrors() {
      emailHelp.textContent = '';
      pwHelp.textContent = '';
      pw2Help.textContent = '';
      formMessage.textContent = '';
    }
    form.addEventListener('click', () => {
      clearErrors();
      let ok = true;

      ok = isValidEmail(email.value);
      
      if (pw.value !== pw2.value) {
        pw2Help.textContent = 'A két jelszó nem egyezik.';
        ok = false;
      }
      console.log(ok);
      if (ok) {formMessage.textContent = 'Sikeres regisztráció (demo).'; console.log("Mukodok")}
      

    });