const cardTemplate = document.querySelector('#card-template').content;

const buttonEditProfile = document.querySelector('.profile__button-edit')

const profilePopup = document.querySelector('.popup_type_edit-profile')
const cardPopup = document.querySelector('.popup_type_add-card')
const imagePopup = document.querySelector('.popup_type_big-image')
const popupElements = document.querySelectorAll('.popup')

const buttonCloseProfile = profilePopup.querySelector('.popup__button-close')
const buttonCloseCard = cardPopup.querySelector('.popup__button-close')
const buttonCloseImage = imagePopup.querySelector('.popup__button-close')

const buttonAddCard = document.querySelector('.profile__button-add')

const titleElement = document.querySelector('.profile__title')
const subtitleElement = document.querySelector('.profile__subtitle')
const nameFieldElement = profilePopup.querySelector('.popup__input_name_firstname')
const descriptionFieldElement = profilePopup.querySelector('.popup__input_name_description')

const formElementProfile = profilePopup.querySelector('.popup__form')
const formElementCard = cardPopup.querySelector('.popup__form_place_add')
const cardsItemsElement = document.querySelector('.cards__items')
const nameAddFieldElement = cardPopup.querySelector('.popup__input_name_place')
const linkFieldElement = cardPopup.querySelector('.popup__input_name_link')

const getCardByEvent = evt => evt.currentTarget.closest('.card');

const buttonSubmitNewCard = formElementCard.querySelector('.popup__button-submit')

function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keydown', handlerEsc);
  document.addEventListener('click', handleOverlay);
};

function openProfilePopup() {
  nameFieldElement.value = titleElement.textContent;
  descriptionFieldElement.value = subtitleElement.textContent;
  openPopup(profilePopup);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', handlerEsc);
  document.removeEventListener('click', handleOverlay);
};

function handlerEsc(evt) {
  if (evt.key === 'Escape') {
    popupElements.forEach(closePopup);
  };
};

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    popupElements.forEach(closePopup);
  };
}

function editFormProfile(event) {
  event.preventDefault()
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = descriptionFieldElement.value;
  closePopup(profilePopup);
};

function addFormCard(evt) {
  evt.preventDefault()
  const cardNew = {
    name: nameAddFieldElement.value,
    link: linkFieldElement.value
  };
  renderCard(cardNew);
  formElementCard.reset();
  closePopup(cardPopup);
  buttonSubmitNewCard.classList.add('popup__button-submit_disabled');
  buttonSubmitNewCard.setAttribute('disabled', true);
};


buttonEditProfile.addEventListener('click', () => openProfilePopup(profilePopup));
buttonCloseProfile.addEventListener('click', () => closePopup(profilePopup));
buttonCloseCard.addEventListener('click', () => closePopup(cardPopup));
buttonCloseImage.addEventListener('click', () => closePopup(imagePopup));
buttonAddCard.addEventListener('click', () => openPopup(cardPopup));
formElementProfile.addEventListener('submit', editFormProfile);
formElementCard.addEventListener('submit', addFormCard);

function handleLikeButton(evt) {
  evt.target.classList.toggle('button_is-active');
};

const imagePopupCard = document.querySelector('.popup__big-image')
const imagePopupTitle = document.querySelector('.popup__image-title')

function renderCard(element) {
  const cardElement = createCard(element);
  cardsItemsElement.prepend(cardElement);
};

function createCard(element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const bigImage = cardElement.querySelector('.card__image');
  bigImage.addEventListener('click', () => openCard(element));

  bigImage.src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  bigImage.alt = element.name;

  cardElement.querySelector('.card__button-like').addEventListener('click', handleLikeButton);

  cardElement.querySelector('.card__button-delete').addEventListener('click', evt => {
    const card = getCardByEvent(evt);
    card.remove();
  });
  return cardElement;
}

initialCards.forEach(renderCard);

function openCard(element) {
  imagePopupCard.src = element.link;
  imagePopupTitle.textContent = element.name;
  imagePopupCard.alt = element.name;
  openPopup(imagePopup);
};
