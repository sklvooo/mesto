const ENTER = `Enter`;
const ESCAPE = `Escape`;

const editNameBtn = document.querySelector(`.profile__add-button`);
const popUp = document.querySelector(`.popup`);
const closeEditBtn = document.querySelector(`.popup__close`);
const nameValue = document.querySelector(`.profile__name`);
const jobValue = document.querySelector(`.profile__job`);
const nameInput = document.querySelector(`.popup__name`);
const jobInput = document.querySelector(`.popup__job`);
const popUpSubmit = document.querySelector(`.popup__button`);

const openPopup = () => {
    popUp.classList.add(`popup_opened`);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
    editNameBtn.removeEventListener(`click`, openPopup);
    closeEditBtn.addEventListener(`click`, closePopup);
    popUpSubmit.addEventListener(`click`, savePopup);
    document.addEventListener(`keydown`, onEscPress);
    document.removeEventListener(`keydown`, onOpenPopupEnterPress);
    closeEditBtn.addEventListener(`keydown`, onClosePopupEnterPress);
    popUpSubmit.addEventListener(`keydown`, onSavePopupEnterPress);
};

const closePopup = () => {
    popUp.classList.remove(`popup_opened`);
    editNameBtn.addEventListener(`click`, openPopup);
    nameInput.value = ``;
    jobInput.value = ``;
    closeEditBtn.removeEventListener(`click`, closePopup);
    popUpSubmit.removeEventListener(`click`, savePopup);
    document.removeEventListener(`keydown`, onEscPress);
    document.addEventListener(`keydown`, onOpenPopupEnterPress);
    closeEditBtn.removeEventListener(`keydown`, onClosePopupEnterPress);
    popUpSubmit.removeEventListener(`keydown`, onSavePopupEnterPress);
};

const savePopup = (evt) => {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeEditBtn.removeEventListener(`click`, closePopup);
    popUpSubmit.removeEventListener(`click`, savePopup);
    editNameBtn.addEventListener(`click`, openPopup);
    popUp.classList.remove(`popup_opened`);
    document.addEventListener(`keydown`, onOpenPopupEnterPress);
    closeEditBtn.removeEventListener(`keydown`, onClosePopupEnterPress);
    popUpSubmit.addEventListener(`keydown`, onSavePopupEnterPress);
};

const onEscPress = (evt) => {
    if (evt.key === ESCAPE) {
        evt.preventDefault();
        closePopup()
    }
};

const onOpenPopupEnterPress = (evt) => {
    if (evt.key === ENTER) {
        evt.preventDefault();
        openPopup()
    }
};

const onClosePopupEnterPress = (evt) => {
    if (evt.key === ENTER) {
        evt.preventDefault();
        closePopup()
    }
};

const onSavePopupEnterPress = (evt) => {
    if (evt.key === ENTER) {
        evt.preventDefault();
        savePopup(evt)
    }
};

editNameBtn.addEventListener(`click`, openPopup);
document.addEventListener(`keydown`, onOpenPopupEnterPress);
