//Кнопка вызова формы
const form = document.querySelector('#form');
const btnLog = document.querySelector('#btnLog');
const overlay = document.querySelector(".overlay");
const modal = document.querySelector('#modal')

function openOverlay() {
 overlay.style.visibility = "visible";
 overlay.style.bottom = "0";
}

function openModal(modal) {
 modal.style.visibility = "visible";
 modal.style.top = "50%";
 modal.style.zIndex = "1000";
 document.body.classList.add("stop-scroll");
}

function closeModal(modal) {
 cleanForm()
 modal.style.visibility = "hidden";
 modal.style.top = "-100%";
 modal.style.zIndex = "-1000";
 document.body.classList.remove("stop-scroll");
}

function closeOverlay() {
 overlay.style.visibility = "hidden";
 overlay.style.bottom = "-100%";
}

btnLog.addEventListener('click', function() {
 openOverlay()
 openModal(modal)
 format(tel);
})

document.addEventListener('keydown', function(event) {
 if (event.key === "Escape") {
  form.scrollIntoView();
   closeOverlay()
   closeModal(modal)
 }
});
//Кнопка закрывает форму
const modalClose = document.querySelector('#modalClose');

modalClose.addEventListener('click', function() {
  form.scrollIntoView();
  closeOverlay()
  closeModal(modal)
})

document.addEventListener('click', function(event) {
  if (!modal.contains(event.target) && !btnLog.contains(event.target)) {
    form.scrollIntoView();
    closeOverlay()
    closeModal(modal)
  }
});
//селект
const dropdownBtn = document.querySelector('#dropdown');
const dropdownList = document.querySelector('#dropdownList');
const dropdownInput = document.querySelector('#dropdownInput');
let dropdownItem = document.querySelectorAll('.dropdown__item');

dropdownBtn.addEventListener('click', function () {
  dropdownBtn.classList.toggle('modal__dropdown-active')
  dropdownList.classList.toggle('dropdown__list-activ')
});

dropdownItem.forEach(function (listItem) {
  listItem.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownBtn.innerHTML = this.innerHTML;
    dropdownBtn.classList.remove('modal__input-error');
    dropdownInput.value = this.dataset.value;
    dropdownBtn.classList.remove('modal__dropdown-active')
    dropdownList.classList.remove('dropdown__list-activ')
  })
})

document.addEventListener('click', function(e) {
  if (e.target !== dropdownBtn) {
    dropdownBtn.classList.remove('modal__dropdown-active')
    dropdownList.classList.remove('dropdown__list-activ')
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === "Tab") {
    dropdownBtn.classList.remove('modal__dropdown-active')
    dropdownList.classList.remove('dropdown__list-activ')

  }
 });
 //добавляем лого
const logo = document.querySelector("#logo");
const labelImg = document.querySelector("#labelImg");
const labelLogo = document.querySelector("#labelLogo");
const drlLogo = document.querySelector("#drlLogo");

logo.addEventListener("change", function () {
  if (this.files[0]) {
    let file = this.files[0];
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/png"];

    if (validExtensions.includes(fileType)) {
      var fr = new FileReader();

      fr.addEventListener("load", function () {
        labelImg.style.backgroundImage = "url(" + fr.result + ")";
        labelLogo.classList.add('modal__label-hidden')
        labelLogo.classList.remove('modal__label-error')
      }, false);

      fr.readAsDataURL(file);
    } else {
      labelLogo.classList.add('modal__label-error')
    }
  }
});

drlLogo.addEventListener('click', function() {
  if (labelImg.style.backgroundImage) { 
    labelImg.style.backgroundImage = "";
    labelLogo.classList.remove('modal__label-hidden')
    labelLogo.classList.remove('modal__label-error')
  }
});
//вадлидация для обязательных полей
const name = document.querySelector("#name");
const tel = document.querySelector("#tel");
const email = document.querySelector("#email");
const submitBtn = document.querySelector("#submit");
let modalInputs = document.querySelectorAll(".modal__input");

let result = false;
let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
let regexEmail = /^[^s@]+@[^s@]+\.[^s@]+$/;

function allValid () {
  if (name.value.length < 2 ||
    !regexEmail.test(email.value) ||
    !regex.test(tel.value) ||
    dropdownBtn.innerHTML == "" ||
    !labelImg.style.backgroundImage) {
    result = false
  } else {
    result = true
  }
  return result
}

let pointsValid = [name, email, tel, dropdownBtn, labelImg];

function addStyleInput (input) {
  if (input === name) {
    if (input.value.length < 2) {
     input.classList.add('modal__input-error')
    } else {
      input.classList.remove('modal__input-error')
    }
   } else if (input === email) {
    if (regexEmail.test(input.value)) {
      input.classList.remove('modal__input-error')
    } else {
     input.classList.add('modal__input-error')
    }
   } else if (input === tel) {
    if (!regex.test(input.value)) {
     input.classList.add('modal__input-error')
    } else {
     input.classList.remove('modal__input-error')
    }
   }
}

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  allValid ();
  if (result === false) {
    form.scrollIntoView();
    pointsValid.forEach (function(point) {
      addStyleInput(point);
      if (point === dropdownBtn) {
        if (dropdownBtn.innerHTML === "") {
          dropdownBtn.classList.add('modal__input-error')
        } else {
          dropdownBtn.classList.remove('modal__input-error')
        }
       } else if (point === labelImg) {
        if (labelImg.style.backgroundImage) {
          labelLogo.classList.remove('modal__label-error')
        } else {
          labelLogo.classList.add('modal__label-error')
        }
       }
      point.addEventListener('input', function() {
        addStyleInput(point);
      })
    })
  } else if (result === true) {
    alert("Форма успешно отправлена")
    cleanForm()
    closeOverlay()
    closeModal(modal)
  }
})

function cleanForm() {
  name.value = "";
  email.value = "";
  tel.value = "";
  labelImg.style.backgroundImage = "";
  labelLogo.classList.remove('modal__label-hidden')
  labelLogo.classList.remove('modal__label-error')
  dropdownBtn.innerHTML = "";
  name.classList.remove('modal__input-error')
  email.classList.remove('modal__input-error')
  tel.classList.remove('modal__input-error')
  dropdownBtn.classList.remove('modal__input-error')
  modalInputs.forEach(function(input) {
    input.value = "";
  })
  form.scrollIntoView();
  result = false
  format(tel);
}

const reset = document.querySelector("#reset");

reset.addEventListener('click', function() {
  closeOverlay()
  closeModal(modal)
  cleanForm()
  format(tel);
})
//маска на телефон
function doFormat(value, pattern, mask) {
  const strippedValue = value.replace(/[^0-9]/g, "");
  const chars = strippedValue.split('');

  let count = 0;
  let formatted = '';

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (chars[count]) {
      if (/\*/.test(char)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += char;
      }
    } else if (mask) {
      const splittedMask = mask.split('');
      if (splittedMask[i]) {
        formatted += splittedMask[i];
      }
    }
  }
  return formatted;
}

function format(elem) {
  const val = doFormat(elem.value, elem.getAttribute('data-format'));
  elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));

  if (elem.createTextRange) {
    let range = elem.createTextRange();
    range.move('character', val.length);
    range.select();
  } else if (elem.selectionStart) {
    elem.setSelectionRange(val.length, val.length);
  }
}

tel.addEventListener('keyup', function() {
  format(tel);
});

tel.addEventListener('keydown', function() {
  format(tel);
});

format(tel);