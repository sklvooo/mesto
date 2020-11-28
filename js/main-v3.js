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

const profilePopupCloseBtn = profilePopup.querySelector(`.profile-settings__close`);
const addPhotoCloseBtn = addPhotoPopup.querySelector(`.add-card__close`);
const photoPopupCloseBtn = photoPopup.querySelector(`.show-image__close`);

const profilePopupForm = profilePopup.querySelector(`.profile-settings__form`);
const addPhotoPopupForm = addPhotoPopup.querySelector(`.add-card__form`);

const createCardTemplate = ({name, link}) => {
    const newCard = template.cloneNode(true);
    newCard.querySelector(`.elements__image`).src = link;
    newCard.querySelector(`.elements__text`).textContent = name;
    return newCard
};

const renderCard = (card, position, flag = false) => {
    flag ? position.append(createCardTemplate(card)) : position.prepend(createCardTemplate(card));
};

initialCards.forEach((item) => renderCard(item, elementsList, true));

const controller = (evt) => {
    const btn = evt.target;
    const btnParent = btn.parentNode;
    switch (true) {
        case btn.classList.contains(`elements__remove-button`):
            btnParent.remove();
            break;
        case btn.classList.contains(`elements__image`):
            const link = btnParent.querySelector(`.elements__image`);
            const name = btnParent.querySelector(`.elements__text`);
            openPhotoPopupHandler(name, link);
            break;
        case btn.classList.contains(`elements__button`):
            btn.classList.toggle(`elements__button_liked`);
            break;
        default:
            return;
    }
};

elementsList.addEventListener(`click`, controller);

const openPopup = (popup) => {
    if (popup.classList.contains(`popup__hide`)) {
        popup.classList.remove(`popup__hide`)
    }
    popup.classList.add(`popup__opened`);
};

const closePopup = (popup) => {
    popup.classList.remove(`popup__opened`);
    popup.classList.add(`popup__hide`);
};

const onEscapePressProfilePopup = (evt) => {
    if (evt.key === ESCAPE) {
        closeProfilePopupHandler();
    }
};

const onOverlayClickProfilePopup = (evt) => {
    if (evt.target === profilePopup) {
        closeProfilePopupHandler();
    }
};

const profilePopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    closeProfilePopupHandler();
};

const openProfilePopupHandler = () => {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    profilePopupCloseBtn.addEventListener(`click`, closeProfilePopupHandler);
    profilePopupForm.addEventListener(`submit`, profilePopupFormSubmit);
    document.addEventListener(`keydown`, onEscapePressProfilePopup);
    document.addEventListener(`click`, onOverlayClickProfilePopup);
};

const closeProfilePopupHandler = () => {
    closePopup(profilePopup);
    profilePopupCloseBtn.removeEventListener(`click`, closeProfilePopupHandler);
    profilePopupForm.removeEventListener(`submit`, profilePopupFormSubmit);
    document.removeEventListener(`keydown`, onEscapePressProfilePopup);
    document.removeEventListener(`click`, onOverlayClickProfilePopup);
};

profilePopupShowBtn.addEventListener(`click`, openProfilePopupHandler);

const onEscapePressAddPhoto = (evt) => {
    if (evt.key === ESCAPE) {
        closeAddPhotoPopupHandler();
    }
};

const onOverlayClickAddPhoto = (evt) => {
    if (evt.target === addPhotoPopup) {
        closeAddPhotoPopupHandler();
    }
};

const addPhotoFormSubmit = (evt) => {
    evt.preventDefault();
    renderCard({
        name: addPhotoInputName.value,
        link: addPhotoLink.value
    }, elementsList);
    addPhotoPopupForm.reset();
    closeAddPhotoPopupHandler();
};


const openAddPhotoPopupHandler = () => {
    openPopup(addPhotoPopup);
    addPhotoCloseBtn.addEventListener(`click`, closeAddPhotoPopupHandler);
    addPhotoPopupForm.addEventListener(`submit`, addPhotoFormSubmit);
    document.addEventListener(`keydown`, onEscapePressAddPhoto);
    document.addEventListener(`click`, onOverlayClickAddPhoto);
};

const closeAddPhotoPopupHandler = () => {
    closePopup(addPhotoPopup);
    addPhotoCloseBtn.removeEventListener(`click`, closeAddPhotoPopupHandler);
    addPhotoPopupForm.removeEventListener(`submit`, addPhotoFormSubmit);
    document.removeEventListener(`keydown`, onEscapePressAddPhoto);
    document.removeEventListener(`click`, onOverlayClickAddPhoto);
};

photoPopupShowBtn.addEventListener(`click`, openAddPhotoPopupHandler);

const onEscapePressphotoPopup = (evt) => {
    if (evt.key === ESCAPE) {
        closePhotoPopupHandler();
    }
};

const onOverlayClickphotoPopup = (evt) => {
    if (evt.target === addPhotoPopup) {
        closePhotoPopupHandler();
    }
};

const bigPhoto = (name, link) => {
    const text = photoPopup.querySelector(`.show-image__text`);
    const img = photoPopup.querySelector(`.show-image__img`);
    text.textContent = name.textContent;
    img.src = link.src;
    img.alt = `Фото ${text.textContent}`
};

const openPhotoPopupHandler = (name, link) => {
    openPopup(photoPopup);
    bigPhoto(name, link);
    photoPopupCloseBtn.addEventListener(`click`, closePhotoPopupHandler);
    document.addEventListener(`keydown`, onEscapePressphotoPopup);
    document.addEventListener(`click`, onOverlayClickphotoPopup);
};

const closePhotoPopupHandler = () => {
    closePopup(photoPopup);
    photoPopupCloseBtn.removeEventListener(`click`, closeAddPhotoPopupHandler);
    document.removeEventListener(`keydown`, onEscapePressphotoPopup);
    document.removeEventListener(`click`, onOverlayClickphotoPopup);
};
