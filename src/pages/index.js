import {validityRules} from '../js/data.js';
import {FormValidator} from '../js/validity.js';
import './index.css';
import {PopupWithForm} from "../js/popupWithForm";
import {UserInfo} from "../js/userInfo";
import {Section} from "../js/section";
import {Card} from "../js/card";
import {PopupWithImage} from "../js/popupWithImage";
import {Api} from "../js/api";
import {DeletePopup} from "../js/deletePopup";

const apiOption = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-20',
    header: {
        authorization: '5f03bf04-a3c4-47d6-9cb8-5a48c2f0123b',
        'Content-Type': 'application/json'
    }
};

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);
const elementsList = document.querySelector(`.elements__list`);
const profileNameInput = document.querySelector(`.profile-settings__input-name`);
const profileJobInput = document.querySelector(`.profile-settings__input-job`);
const profilePopupForm = document.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = document.querySelector(`.add-card__form`);
const addPhotoNameInput = document.querySelector(`.add-card__input-name`);
const addPhotoLinkInput = document.querySelector(`.add-card__input-link`);
const setAvatarBtn = document.querySelector(`.profile__photo-btn`);

const api = new Api(apiOption);
const personInfo = new UserInfo('profile__name', 'profile__job', 'profile__photo');
const bigPhotoPopup = new PopupWithImage(`show-image`);
const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);
let userID;

profileFormValidity.enableValidation();
newPhotoFormValidation.enableValidation();


const renderCard = (card, position, flag = false) => {

    const setLike = (id) => {
        api.setLike(id)
            .then((res) => {
                elem.querySelector(`.elements__like-counter`).textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteLike = (id) => {
        api.deleteLike(id)
            .then((res) => {
                elem.querySelector(`.elements__like-counter`).textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCard = (id) => {
        api.deleteCard(id)
            .then(() => {
                elem.remove();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePopup = new DeletePopup('delete-card', deleteCard);
    const cardCallbacks = [
        bigPhotoPopup,
        deletePopup,
        setLike,
        deleteLike
    ];

    const newCard = new Card(card, `element`, cardCallbacks, userID);
    const elem = newCard.getElement();
    flag ? position.append(elem) : position.prepend(elem);
    if (userID !== card.owner._id) {
        elem.querySelector('.elements__remove-button').remove();
    }
};

const section = new Section(renderCard, elementsList);


api.getUserInfo()
    .then((res) => {
        personInfo.setUserInfo(res.name, res.about);
        personInfo.setUserAvatar(res.avatar);
        userID = res._id;
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((res) => {
        section.render(res);
    })
    .catch((err) => {
        console.log(err);
    });

const profilePopupFormSubmit = (obj) => {
    api.editProfileInfo(obj.name, obj.link)
        .then((res) => {
            personInfo.setUserInfo(res.name, res.about);
        })
        .catch((err) => {
            console.log(err);
        });
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
    api.addPhoto(obj)
        .then((res) => {
            section.addItem(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

const addPhotoForm = new PopupWithForm(`add-card`, addPhotoFormSubmit);

photoPopupShowBtn.addEventListener(`click`, function () {
    addPhotoForm.openPopup();
    newPhotoFormValidation.hideInputError(addPhotoNameInput);
    newPhotoFormValidation.hideInputError(addPhotoLinkInput);
    addPhotoPopupForm.reset();
    addPhotoPopupForm.querySelector(`.popup__button`).classList.add(`popup__button_disabled`);
});

const avatarFormSubmitHandler = (obj) => {
    api.editAvatar(obj.link)
        .then((res) => {
            personInfo.setUserAvatar(res.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
};

const avatarForm = new PopupWithForm(`change-photo`, avatarFormSubmitHandler);

setAvatarBtn.addEventListener('click', function () {
    avatarForm.openPopup();
});
