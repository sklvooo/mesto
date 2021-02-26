import {initialCards, validityRules} from '../js/data.js';
import {FormValidator} from '../js/validity.js';
import './index.css';
import {PopupWithForm} from "../js/popupWithForm";
import {UserInfo} from "../js/userInfo";
import {Section} from "../js/section";
import {Card} from "../js/card";
import {PopupWithImage} from "../js/popupWithImage";

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);
const elementsList = document.querySelector(`.elements__list`);
const profileNameInput = document.querySelector(`.profile-settings__input-name`);
const profileJobInput = document.querySelector(`.profile-settings__input-job`);
const profilePopupForm = document.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = document.querySelector(`.add-card__form`);
const addPhotoNameInput = document.querySelector(`.add-card__input-name`);
const addPhotoLinkInput = document.querySelector(`.add-card__input-link`);


const personInfo = new UserInfo('profile__name', 'profile__job');
const bigPhotoPopup = new PopupWithImage(`show-image`);
const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);

profileFormValidity.enableValidation();
newPhotoFormValidation.enableValidation();


const renderCard = (card, position, flag = false) => {
    const newCard = new Card(card, `element`, bigPhotoPopup);
    flag ? position.append(newCard.getElement()) : position.prepend(newCard.getElement());
};

const section = new Section(initialCards, renderCard, elementsList);
section.render();

const profilePopupFormSubmit = (obj) => {
    personInfo.setUserInfo(obj.name, obj.link);
};

const popupName = new PopupWithForm('profile-settings', profilePopupFormSubmit);

profilePopupShowBtn.addEventListener(`click`, function () {
    popupName.openPopup();
    profileNameInput.value = personInfo.getUserInfo().nameInfo;
    profileJobInput.value = personInfo.getUserInfo().job;
    profileFormValidity.hideInputError(profileNameInput);
    profileFormValidity.hideInputError(profileJobInput);
    profilePopupForm.querySelector(`.popup__button`).classList.add(`popup__button_disabled`);
});

const addPhotoFormSubmit = (obj) => {
    section.addItem(obj);
};

const addPhotoForm = new PopupWithForm(`add-card`, addPhotoFormSubmit);

photoPopupShowBtn.addEventListener(`click`, function () {
    addPhotoForm.openPopup();
    newPhotoFormValidation.hideInputError(addPhotoNameInput);
    newPhotoFormValidation.hideInputError(addPhotoLinkInput);
    addPhotoPopupForm.reset();
    addPhotoPopupForm.querySelector(`.popup__button`).classList.add(`popup__button_disabled`);
});
