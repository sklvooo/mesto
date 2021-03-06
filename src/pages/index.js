import {apiOption, validityRules} from '../components/data.js';
import {FormValidator} from '../components/FormValidator.js';
import './index.css';
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";
import {Card} from "../components/Card";
import {PopupWithImage} from "../components/PopupWithImage";
import {Api} from "../components/Api";
import {DeletePopup} from "../components/DeletePopup";

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);
const elementsList = document.querySelector(`.elements__list`);
const profileNameInput = document.querySelector(`.profile-settings__input-name`);
const profileJobInput = document.querySelector(`.profile-settings__input-job`);
const profilePopupForm = document.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = document.querySelector(`.add-card__form`);
const avatarPopupForm = document.querySelector(`.change-photo`);
const setAvatarBtn = document.querySelector(`.profile__photo-btn`);

const api = new Api(apiOption);
const personInfo = new UserInfo('profile__name', 'profile__job', 'profile__photo');
const bigPhotoPopup = new PopupWithImage(`show-image`);
const profileFormValidity = new FormValidator(validityRules, profilePopupForm);
const newPhotoFormValidation = new FormValidator(validityRules, addPhotoPopupForm);
const avatarValidation = new FormValidator(validityRules, avatarPopupForm);
let userID;

const deleteCard = (id, elem) => {
    api.deleteCard(id)
        .then(() => {
            elem.remove();
        })
        .catch((err) => {
            console.log(err);
        });
};

const deletePopup = new DeletePopup('delete-card', deleteCard);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
        personInfo.setUserInfo(userInfo.name, userInfo.about);
        personInfo.setUserAvatar(userInfo.avatar);
        userID = userInfo._id;
        section.render(cards);
    })
    .catch((err) => {
        console.log(err);
    });

profileFormValidity.enableValidation();
newPhotoFormValidation.enableValidation();
avatarValidation.enableValidation();

const setLike = (id, elem) => {
    api.setLike(id)
        .then((res) => {
            elem.querySelector(`.elements__like-counter`).textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteLike = (id, elem) => {
    api.deleteLike(id)
        .then((res) => {
            elem.querySelector(`.elements__like-counter`).textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
};

const cardCallbacks = [
    bigPhotoPopup,
    deletePopup,
    setLike,
    deleteLike
];

const renderCard = (card, position, flag = false) => {
    const newCard = new Card(card, `element`, cardCallbacks, userID);
    const elem = newCard.getElement();
    flag ? position.append(elem) : position.prepend(elem);
    if (userID !== card.owner._id) {
        elem.querySelector('.elements__remove-button').remove();
    }
};

const section = new Section(renderCard, elementsList);

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
