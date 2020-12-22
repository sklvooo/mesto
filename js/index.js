import {initialCards} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './validity.js';

const ESCAPE = `Escape`;

const profilePopup = document.querySelector(`.profile-settings`);
const addPhotoPopup = document.querySelector(`.add-card`);

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);

const elementsList = document.querySelector(`.elements__list`);

const profileNameInput = profilePopup.querySelector(`.profile-settings__input-name`);
const profileJobInput = profilePopup.querySelector(`.profile-settings__input-job`);
const profileName = document.querySelector(`.profile__name`);
const profileJob = document.querySelector(`.profile__job`);

const addPhotoInputName = addPhotoPopup.querySelector(`.add-card__input-name`);
const addPhotoLink = addPhotoPopup.querySelector(`.add-card__input-link`);

const profilePopupForm = profilePopup.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = addPhotoPopup.querySelector(`.add-card__form`);

const popupCloseBtns = Array.from(document.querySelectorAll(`.popup__close`));

const validityRules = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: `popup__input-error_active`
};

const renderCard = (card, position, flag = false) => {
    const newCard = new Card(card, `element`);
    flag ? position.append(newCard.getElement()) : position.prepend(newCard.getElement());
};

initialCards.forEach((item) => renderCard(item, elementsList, true));

const openPopup = (popup) => {
    popup.classList.add(`popup_opened`);
    document.addEventListener(`keydown`, onEscapePress);
    document.addEventListener(`click`, onOverlayClick);
};

const onClosePopupClick = () => {
    const activePopup = document.querySelector(`.popup_opened`);
    closePopup(activePopup);
};

popupCloseBtns.forEach((btn) => {
    btn.addEventListener(`click`, onClosePopupClick);
});

const closePopup = (popup) => {
    popup.classList.remove(`popup_opened`);
    document.removeEventListener(`keydown`, onEscapePress);
    document.removeEventListener(`click`, onOverlayClick);
};

const onEscapePress = (evt) => {
    if (evt.key === ESCAPE) {
        const activePopup = document.querySelector(`.popup_opened`);
        closePopup(activePopup);
    }
};

const onOverlayClick = (evt) => {
    if (evt.target.classList.contains(`popup_opened`)) {
        const activePopup = document.querySelector(`.popup_opened`);
        closePopup(activePopup);
    }
};

const profilePopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    const PopupFormSave = profilePopupForm.querySelector(`.popup__button`);
    PopupFormSave.classList.add(`popup__button_disabled`);
    closePopup(profilePopup);
};

profilePopupShowBtn.addEventListener(`click`, function () {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    profilePopupForm.addEventListener(`submit`, profilePopupFormSubmit, {once: true});
});

const addPhotoFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
        name: addPhotoInputName.value,
        link: addPhotoLink.value
    }, elementsList);
    addPhotoPopupForm.reset();
    const addPhotoPopupFormSave = addPhotoPopupForm.querySelector(`.popup__button`);
    addPhotoPopupFormSave.classList.add(`popup__button_disabled`);
    closePopup(addPhotoPopup);
};

photoPopupShowBtn.addEventListener(`click`, function () {
    openPopup(addPhotoPopup);
    addPhotoPopupForm.addEventListener(`submit`, addPhotoFormSubmit, {once: true});
});

const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
profileFormValidity.enableValidation();

const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);
newPhotoFormValidation.enableValidation();
