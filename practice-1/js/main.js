//Кнопка вызова формы
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
})

document.addEventListener('keydown', function(event) {
 if (event.key === "Escape") {
   closeOverlay()
   closeModal(modal)
 }
});
//Кнопка закрывает форму
const modalClose = document.querySelector('#modalClose');

modalClose.addEventListener('click', function() {
  closeOverlay()
  closeModal(modal)
})
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
    dropdownBtn.style.border = "1px solid #D6DADE";
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
const form = document.querySelector('#form')
let modalInputs = document.querySelectorAll(".modal__input")

let result = false;

function resultFalse(idInput) {
  idInput.style.border = "1px solid #D90000";
  result = false;
}

function resultTrrue(idInput) {
  idInput.style.border = "1px solid #D6DADE";
  result = true;
}

function validation(idInput) {
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  if (idInput === name) {
   if (idInput.value.length < 2) {
     resultFalse(idInput)
   } else {
     resultTrrue(idInput)
   }
  } else if (idInput === email) {
   if (/^[^s@]+@[^s@]+\.[^s@]+$/.test(idInput.value)) {
     resultTrrue(idInput)
   } else {
     resultFalse(idInput)
   }
  } else if (idInput === tel) {
   if (!regex.test(idInput.value)) {
    resultFalse(idInput)
   } else {
    resultTrrue(idInput)
   }
  }
  return result;
}

function allValid () {
  pointsValid.forEach (function(point) {
    validation(point)
  })

  if (dropdownBtn.innerHTML == "") {
    dropdownBtn.style.border = "1px solid #D90000";
    result = false;
  } else {
    dropdownBtn.style.border = "1px solid #D6DADE";
    result = true;
  }

  if (labelImg.style.backgroundImage) {
    labelLogo.classList.remove('modal__label-error')
    result = true;
  } else {
    labelLogo.classList.add('modal__label-error')
    result = false;
  }
  return result
}

let pointsValid = [name, email, tel]


submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  allValid ();
  if (result === false) {
    form.scrollIntoView();
    pointsValid.forEach (function(point) {
      point.addEventListener('input', function() {
        let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (point === name) {
         if (point.value.length < 2) {
          point.style.border = "1px solid #D90000";
         } else {
          point.style.border = "1px solid #D6DADE";
         }
        } else if (point === email) {
         if (/^[^s@]+@[^s@]+\.[^s@]+$/.test(point.value)) {
           point.style.border = "1px solid #D6DADE";
         } else {
          point.style.border = "1px solid #D90000";
         }
        } else if (point === tel) {
         if (!regex.test(point.value)) {
          point.style.border = "1px solid #D90000";
         } else {
          point.style.border = "1px solid #D6DADE";
         }
        }
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
  dropdownBtn.style.border = "1px solid #D6DADE";
  modalInputs.forEach(function(input) {
    input.value = "";
  })
  result = false
}

const reset = document.querySelector("#reset");

reset.addEventListener('click', function() {
  cleanForm()
})





