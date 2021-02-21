import {initialCards, validityRules} from './data.js';
import {Card} from './card.js';
import {FormValidator} from './validity.js';
import {PopupWithImage} from "./popupWithImage";
import '../pages/index.css';
import {PopupWithForm} from "./popupWithForm";
import {UserInfo} from "./userInfo";

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


const renderCard = (card, position, flag = false) => {
    const newCard = new Card(card, `element`, new PopupWithImage(`show-image`));
    flag ? position.append(newCard.getElement()) : position.prepend(newCard.getElement());
};

initialCards.forEach((item) => renderCard(item, elementsList, true));


const personInfo = new UserInfo('profile__name', 'profile__job');

const profilePopupFormSubmit = () => {
    personInfo.setUserInfo(profileNameInput.value, profileJobInput.value);
};

profilePopupShowBtn.addEventListener(`click`, function () {
    new PopupWithForm('profile-settings', profilePopupFormSubmit).openPopup();
    profileNameInput.value = personInfo.getUserInfo().nameInfo;
    profileJobInput.value = personInfo.getUserInfo().job;
});

const addPhotoFormSubmit = () => {
    renderCard({
        name: addPhotoInputName.value,
        link: addPhotoLink.value
    }, elementsList);
};

photoPopupShowBtn.addEventListener(`click`, function () {
    new PopupWithForm(`add-card`, addPhotoFormSubmit).openPopup();
});

const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
profileFormValidity.enableValidation();

const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);
newPhotoFormValidation.enableValidation();
