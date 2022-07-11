const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const form = document.querySelector(settings.formSelector)
const formInput = form.querySelector(settings.inputSelector)
const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage, settingsElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsElement.errorClass);
};

const hideInputError = (formElement, inputElement, settingsElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsElement.inputErrorClass);
  errorElement.classList.remove(settingsElement.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingsElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsElement);
  } else {
    hideInputError(formElement, inputElement, settingsElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, settingsElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsElement.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsElement.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

function setEventListeners(formElement, settingsElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsElement.inputSelector));
  const buttonElement = formElement.querySelector(settingsElement.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsElement);
      toggleButtonState(inputList, buttonElement, settingsElement);
    });
  });
};

function enableValidation(settingsElement) {
  const formList = Array.from(document.querySelectorAll(settingsElement.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settingsElement);
  })
};
enableValidation(settings);
