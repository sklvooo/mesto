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

// УПРАВЛЕНИЕ ПОПАПОМ СО СМЕНОЙ ИМЕНИ

const changeNameBtn = document.querySelector(`.profile__add-button`);
const changeNamePopup = document.querySelector(`.popup_name`);
const closeChangeNamePopupBtn = changeNamePopup.querySelector(`.popup__close_name`);
const changeNamePopupForm = changeNamePopup.querySelector(`.popup__form_name`);
const changeNamePopupNameInput = changeNamePopup.querySelector(`.name-input`);
const changeNamePopupJobInput = changeNamePopup.querySelector(`.job-input`);
const profileName = document.querySelector(`.profile__name`);
const profileJob = document.querySelector(`.profile__job`);

// Функция открытия попапа
const openChangeNamePopup = () => {
    changeNamePopup.classList.add(`popup_opened`);
    changeNamePopup.animate([
        {opacity: 0},
        {opacity: 1}
    ], 500);
    changeNamePopupNameInput.value = profileName.textContent;
    changeNamePopupJobInput.value = profileJob.textContent;
};

// Функция закртия попапа
const closeChangeNamePopup = () => {
    changeNamePopup.animate([
        {opacity: 1},
        {opacity: 0}
    ], 1000);
    setTimeout(() => changeNamePopup.classList.remove(`popup_opened`), 500);
    profileName.textContent = changeNamePopupNameInput.value;
    profileJob.textContent = changeNamePopupJobInput.value;
};

// Обработчик скрытие попапа и удаление обработчиков закрытия
const closeChangeNamePopupHandler = () => {
    closeChangeNamePopup();
    closeChangeNamePopupBtn.removeEventListener(`click`, onCloseChangeNamePopupBtnClick);
    document.removeEventListener(`keydown`, changeNamePopupEscPress);
    document.removeEventListener(`click`, changeNamePopupClick);
    changeNamePopupForm.removeEventListener(`submit`, changeNamePopupFormSubmit)
};

// Обработчик показа попапа и установка обработчиков на закртие
const openChangeNamePopupHandler = () => {
    openChangeNamePopup();
    closeChangeNamePopupBtn.addEventListener(`click`, onCloseChangeNamePopupBtnClick);
    document.addEventListener(`keydown`, changeNamePopupEscPress);
    document.addEventListener(`click`, changeNamePopupClick);
    changeNamePopupForm.addEventListener(`submit`, changeNamePopupFormSubmit)
};

// Функция закртия крестиком
const onCloseChangeNamePopupBtnClick = () => {
    closeChangeNamePopupHandler();
};

// Закрытие по Escape
const changeNamePopupEscPress = (evt) => {
    if (evt.key === ESCAPE) {
        closeChangeNamePopupHandler();
    }
};

// Закрытие при клике на свободную область
const changeNamePopupClick = (evt) => {
    if (evt.target === changeNamePopup) {
        closeChangeNamePopupHandler();
    }
};

// Обработчик отправки формы
const changeNamePopupFormSubmit = (evt) => {
    evt.preventDefault();
    closeChangeNamePopupHandler();
};

changeNameBtn.addEventListener(`click`, openChangeNamePopupHandler);

// УПРАВЛЕНИЕ ПОПАПОМ С ДОБАВЛЕНИЕМ ФОТО

const addPhotoBtn = document.querySelector(`.profile__add-photo`);
const addPhotoPopup = document.querySelector(`.popup_place`);
const addPhotoPopupCloseBtn = addPhotoPopup.querySelector(`.popup__close_place`);
const addPhotoPopupForm = addPhotoPopup.querySelector(`.popup__form_place`);

// Функция отрытие попапа
const openAddPhotoPopup = () => {
    addPhotoPopup.animate([
        {opacity: 0},
        {opacity: 1}
    ], 500);
    addPhotoPopup.classList.add(`popup_opened`);
};

// Функция закртия попапа
const closeAddPhotoPopup = () => {
    addPhotoPopup.animate([
        {opacity: 1},
        {opacity: 0}
    ], 1000);
    setTimeout(() => addPhotoPopup.classList.remove(`popup_opened`), 500);
};

// Функция закртия крестиком
const onAddPhotoPopupCloseBtnClick = () => {
    closeAddPhotoPopupHandler();
};

// Функция отправки формы
const addPhotoPopupFormSubmit = (evt) => {
    evt.preventDefault();
    addCard();
    clearCards();
    renderCards();
    closeAddPhotoPopupHandler();
};

// Функция закрытия по Escape
const addPhotoPopupEscPress = (evt) => {
    if (evt.key === ESCAPE) {
        closeAddPhotoPopupHandler();
    }
};

// Функция при клике на свободную область
const addPhotoPopupClick = (evt) => {
    if (evt.target === addPhotoPopup) {
        closeAddPhotoPopupHandler();
    }
};

// Добавляем обработчик открытия и обработчки закртия
const openAddPhotoPopupHandler = () => {
    openAddPhotoPopup();
    addPhotoPopupCloseBtn.addEventListener(`click`, onAddPhotoPopupCloseBtnClick);
    document.addEventListener(`keydown`, addPhotoPopupEscPress);
    document.addEventListener(`click`, addPhotoPopupClick);
    addPhotoPopupForm.addEventListener(`submit`, addPhotoPopupFormSubmit);
};

// Обработчик закртия попапа и удаление обоработчиков закртия
const closeAddPhotoPopupHandler = () => {
    closeAddPhotoPopup();
    addPhotoPopupCloseBtn.removeEventListener(`click`, onAddPhotoPopupCloseBtnClick);
    document.removeEventListener(`keydown`, addPhotoPopupEscPress);
    document.removeEventListener(`click`, addPhotoPopupClick);
    addPhotoPopupForm.removeEventListener(`submit`, addPhotoPopupFormSubmit);
};

addPhotoBtn.addEventListener(`click`, openAddPhotoPopupHandler);

// ОТРИСОВКА КАРТОЧЕК

const cardTemplate = document.querySelector(`#card`).content;
const elementsList = document.querySelector(`.elements__list`);
const fragment = document.createDocumentFragment();

// Формирование карты
const createCard = ({name, link}) => {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector(`.elements__image`).src = link;
    newCard.querySelector(`.elements__text`).textContent = name;
    fragment.append(newCard);
};

// Формирование массива карт
const createCards = (array) => {
    array.forEach((item) => createCard(item));
};

// Отрисовка карточек
const renderCards = () => {
    createCards(initialCards);
    elementsList.append(fragment);
};

renderCards();

// УПРАВЛЕНИЕ ОТОБРАЖЕНИЕ

// Управление обрабочиками на картах
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
            renderBigPicture(name, link);
            break;
        case btn.classList.contains(`elements__button`):
            btn.classList.toggle(`elements__button_liked`);
            break;
        default:
            return;
    }
};

elementsList.addEventListener(`click`, controller);

// Очистка списка карт

const clearCards = () => {
    elementsList.innerHTML = ``;
};

// ДОБАВЛЕНИЕ НОВОЙ КАРТИНКИ

const inputPlaceName = document.querySelector(`.popup__place-name`);
const inputPlaceLink = document.querySelector(`.popup__place-link`);

const addCard = () => {
    initialCards.unshift(
        {
            name: inputPlaceName.value,
            link: inputPlaceLink.value
        }
    )
};

// ОТРИСОВКА БОЛЬШОЙ КАРТИНКИ

const main = document.querySelector(`main`);
const bigPictureTemplate = document.querySelector(`#big-picture`).content;

const renderBigPicture = (name, link) => {
    const fragment = document.createDocumentFragment();
    const newBigPicture = bigPictureTemplate.cloneNode(true);

    newBigPicture.querySelector(`.big-image__img`).src = link.src;
    newBigPicture.querySelector(`.big-image__img`).alt = `Фото ${name.textContent}`;
    newBigPicture.querySelector(`.big-image__text`).textContent = name.textContent;

    fragment.append(newBigPicture);
    main.append(fragment);

    const bigPictureCloseBtn = document.querySelector(`.big-picture__close-btn`);
    const bigPicture = document.querySelector(`.big-picture`);

    const closeBigPicture = () => {
        bigPicture.remove();
        document.removeEventListener(`keydown`, bigPictureEscPress);
        document.removeEventListener(`click`, bigPictureClick);
    };

    bigPictureCloseBtn.addEventListener(`click`, closeBigPicture);

    const bigPictureEscPress = (evt) => {
        if (evt.key === ESCAPE) {
            closeBigPicture();
        }
    };
    const bigPictureClick = (evt) => {
        if (evt.target === bigPicture) {
            closeBigPicture();
        }
    };
    document.addEventListener(`keydown`, bigPictureEscPress);
    document.addEventListener(`click`, bigPictureClick);
};


