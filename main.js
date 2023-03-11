let animElements = document.querySelectorAll('.anim');
let delay = 0.2;

animElements.forEach(element => {
  gsap.from(element, {
    opacity: 0,
    y: 20,
    ease: "power1.out",
    duration: 0.4,
    delay: delay,
  });
  delay += 0.2;
});

let animSvg = document.querySelector('.anim-svg');
new Vivus(
  animSvg,
  {
    duration: 200,
  }
);

let email = document.querySelector(`input[type = "email"]`);
email.addEventListener('blur', () => {
  email.classList.add('blur');
});

help = document.querySelector('.form__help');
password = document.querySelector('#password');
password.addEventListener('blur', () => {
  password.classList.add('blur');
  help.classList.remove('focus');
});
password.addEventListener('focus', () => {
  help.classList.add('focus');
});

confPassword = document.querySelector('#cpassword');
confPassword.addEventListener('blur', () => {
  if (confPassword.value != password.value) {
    confPassword.setCustomValidity('Password must be the same!');
    confPassword.classList.add('blur');
  } else {
    confPassword.setCustomValidity('');
    confPassword.classList.remove('blur');
  }
});

let form = document.querySelector('.form');
let formBtn = document.querySelector('.form__btn');
let formDec = document.querySelector('.form__dec');
let formRegistered = document.querySelector('.form__registered');

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let data = {
    fname: document.querySelector(`input[name=fname]`).value,
    lname: document.querySelector(`input[name=lname]`).value,
    nationality: document.querySelector(`select[name=nationality]`).value,
    email: document.querySelector(`input[name=email]`).value,
    bdateDay: document.querySelector(`select[name=b-date]`).value,
    bdateMonth: document.querySelector(`select[name=b-month]`).value,
    bdateYear: document.querySelector(`select[name=b-year]`).value,
    gender: document.querySelector(`input[name=gender]:checked`).value,
    password: document.querySelector(`input[name=password]`).value,
  };
  if (form.checkValidity()) {
    sendData(data);
  } else {
    gsap.to(formBtn, { x: "10", duration: 0.1, yoyo: true, repeat: 3 });
  }
});

let sendData = async (data) => {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    let result = await response.json();
    console.log("you registered!");
    console.log(result);
    form.reset();
    email.classList.remove('blur');
    password.classList.remove('blur');
    formRegistered.classList.add('visible');
  }
}