const editNameBtn = document.querySelector(`.profile__add-button`);
const popUp = document.querySelector(`.popup`);
const closeEditBtn = document.querySelector(`.popup__close`);
const nameValue = document.querySelector(`.profile__name`);
const jobValue = document.querySelector(`.profile__job`);
const nameInput = document.querySelector(`.popup__input_name_name`);
const jobInput = document.querySelector(`.popup__input_name_job`);
const popupForm = document.querySelector(`.popup__form`);

const openPopup = () => {
    popUp.classList.add(`popup_opened`);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
};

const closePopup = () => {
    popUp.classList.remove(`popup_opened`);
    nameInput.value = ``;
    jobInput.value = ``;
};

const savePopup = (evt) => {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closePopup();
};


editNameBtn.addEventListener(`click`, openPopup);
closeEditBtn.addEventListener(`click`, closePopup);
popupForm.addEventListener(`submit`, savePopup);
