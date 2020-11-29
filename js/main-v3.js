const ESCAPE = `Escape`;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profilePopup = document.querySelector(`.profile-settings`);
const photoPopup = document.querySelector(`.show-image`);
const addPhotoPopup = document.querySelector(`.add-card`);

const profilePopupShowBtn = document.querySelector(`.profile__add-button`);
const photoPopupShowBtn = document.querySelector(`.profile__add-photo`);

const elementsList = document.querySelector(`.elements__list`);

const template = document.querySelector(`#card`).content;

const profileNameInput = profilePopup.querySelector(`.profile-settings__input-name`);
const profileJobInput = profilePopup.querySelector(`.profile-settings__input-job`);
const profileName = document.querySelector(`.profile__name`);
const profileJob = document.querySelector(`.profile__job`);

const addPhotoInputName = addPhotoPopup.querySelector(`.add-card__input-name`);
const addPhotoLink = addPhotoPopup.querySelector(`.add-card__input-link`);

const profilePopupForm = profilePopup.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = addPhotoPopup.querySelector(`.add-card__form`);

let activePopup;

const createCardTemplate = ({name, link}) => {
    const newCard = template.cloneNode(true);
    const cardItem = newCard.querySelector(`.elements__list-item`);
    const cardRemoveBtn = cardItem.querySelector(`.elements__remove-button`);
    const cardImg = cardItem.querySelector(`.elements__image`);
    const likeBtn = cardItem.querySelector(`.elements__button`);
    const cardText = cardItem.querySelector(`.elements__text`);
    cardText.textContent = name;
    cardImg.src = link;
    cardRemoveBtn.addEventListener(`click`, function () {
        cardItem.remove();
    });
    cardImg.addEventListener(`click`, function () {
        openPhotoPopupHandler(cardText.textContent, cardImg.src);
    });
    likeBtn.addEventListener(`click`,function () {
        likeBtn.classList.toggle(`elements__button_liked`);
    });
    return newCard
};

const renderCard = (card, position, flag = false) => {
    flag ? position.append(createCardTemplate(card)) : position.prepend(createCardTemplate(card));
};

initialCards.forEach((item) => renderCard(item, elementsList, true));

const openPopup = (popup) => {
    popup.classList.add(`popup__opened`);
    activePopup = document.querySelector(`.popup__opened`);
    const popupCloseBtn = activePopup.querySelector(`.popup__close`);
    popupCloseBtn.addEventListener(`click`, function () {
        closePopup(activePopup);
    }, {once: true});
    document.addEventListener(`keydown`, onEscapePress);
    document.addEventListener(`click`, onOverlayClick);
};

const closePopup = (popup) => {
    popup.classList.remove(`popup__opened`);
    document.removeEventListener(`keydown`, onEscapePress);
    document.removeEventListener(`click`, onOverlayClick);
};

const onEscapePress = (evt) => {
    if (evt.key === ESCAPE) {
        closePopup(activePopup);
    }
};

const onOverlayClick = (evt) => {
    if (evt.target === activePopup) {
        closePopup(activePopup);
    }
};

const profilePopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
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
    closePopup(addPhotoPopup);
};

photoPopupShowBtn.addEventListener(`click`, function () {
    openPopup(addPhotoPopup);
    addPhotoPopupForm.addEventListener(`submit`, addPhotoFormSubmit, {once: true});
});

const bigPhoto = (name, link) => {
    const text = photoPopup.querySelector(`.show-image__text`);
    const img = photoPopup.querySelector(`.show-image__img`);
    text.textContent = name;
    img.src = link;
    img.alt = `Фото ${text}`
};

const openPhotoPopupHandler = (name, link) => {
    openPopup(photoPopup);
    bigPhoto(name, link);
};
