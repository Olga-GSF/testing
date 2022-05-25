const editButton = document.querySelector('.profile__button-edit')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__button-close')
const titleElement = document.querySelector('.profile__title')
const subtitleElement = document.querySelector('.profile__subtitle')
const nameFieldElement = document.querySelector('.popup__input_name_firstname')
const descriptionFieldElement = document.querySelector('.popup__input_name_description')
const formElement = document.querySelector('.popup__form')
/*const likedElement = document.querySelector('.button_type_like')*/

function openPopup(popup) {
  popup.classList.add('popup_is-open')
  nameFieldElement.value = titleElement.textContent;
  descriptionFieldElement.value = subtitleElement.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_is-open')
}

function formEdit(event) {
  event.preventDefault()
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = descriptionFieldElement.value;
  closePopup(popup)
}

/*function liked(likedElement) {
  likedElement.classList.add('botton_type_active')
}*/

editButton.addEventListener('click', () => openPopup(popup))

closePopupButton.addEventListener('click', () => closePopup(popup))

formElement.addEventListener('submit', formEdit)

/*likedElement.addEventListener('click', function () {
  likedElement.style = 'background-image: url(../../../images/UnionHeartLike.svg)';
})*/