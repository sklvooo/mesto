import {initialCards, validityRules} from './data.js';
import {FormValidator} from './validity.js';
import '../pages/index.css';
import {PopupWithForm} from "./popupWithForm";
import {UserInfo} from "./userInfo";
import {Section} from "./section";
import {renderCard} from "./utils";

const addPhotoPopup = document.querySelector(`.add-card`);

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);

const elementsList = document.querySelector(`.elements__list`);

const profileNameInput = document.querySelector(`.profile-settings__input-name`);
const profileJobInput = document.querySelector(`.profile-settings__input-job`);

const addPhotoInputName = addPhotoPopup.querySelector(`.add-card__input-name`);
const addPhotoLink = addPhotoPopup.querySelector(`.add-card__input-link`);

const profilePopupForm = document.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = document.querySelector(`.add-card__form`);


const section = new Section(initialCards, renderCard, elementsList);
section.render();


const personInfo = new UserInfo('profile__name', 'profile__job');

const profilePopupFormSubmit = () => {
    personInfo.setUserInfo(profileNameInput.value, profileJobInput.value);
};

profilePopupShowBtn.addEventListener(`click`, function () {
    const popupName = new PopupWithForm('profile-settings', profilePopupFormSubmit);
    popupName.openPopup();
    profileNameInput.value = personInfo.getUserInfo().nameInfo;
    profileJobInput.value = personInfo.getUserInfo().job;
});

const addPhotoFormSubmit = () => {
    section.addItem({
        name: addPhotoInputName.value,
        link: addPhotoLink.value
    });
};

photoPopupShowBtn.addEventListener(`click`, function () {
    new PopupWithForm(`add-card`, addPhotoFormSubmit).openPopup();
});

const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
profileFormValidity.enableValidation();

const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);
newPhotoFormValidation.enableValidation();
