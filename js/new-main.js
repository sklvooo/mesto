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

const profileSettingsBtn = document.querySelector(`.profile__add-button`);
const profileSettingsPopup = document.querySelector(`.profile-settings`);
const addNewPhotoPopupBtn = document.querySelector(`.profile__add-photo`);
const addNewPhotoPopup = document.querySelector(`.add-card`);
const bigPicPopup = document.querySelector(`.show-image`);
const elementsList = document.querySelector(`.elements__list`);

class Popup {
    constructor (popup) {
        this.popup = popup;
        this.closeBtn = popup.querySelector(`.popup__close`);
        this.escape = `Escape`;
    }

    handleEvent(event) {
        this.openPopup();
    }

    openPopup () {
        if (this.popup.classList.contains(`popup__hide`)) {
            this.popup.classList.remove(`popup__hide`)
        }
        this.popup.classList.add(`popup__opened`);
        document.addEventListener(`keydown`, this.onEscapePress.bind(this));
        this.closeBtn.addEventListener(`click`, this.closePopup.bind(this));
        document.addEventListener(`click`, this.overlayClick.bind(this));
    }

    closePopup () {
        this.popup.classList.remove(`popup__opened`);
        this.popup.classList.add(`popup__hide`);
        document.removeEventListener(`keydown`, this.onEscapePress.bind(this));
        this.closeBtn.removeEventListener(`click`, this.closePopup.bind(this));
        document.removeEventListener(`click`, this.overlayClick.bind(this));
    }

    onEscapePress (evt) {
        if (evt.key === this.escape) {
            this.closePopup();
        }
    }

    formSubmit (evt) {
        evt.preventDefault();
        this.closePopup();
    }

    overlayClick = (evt) => {
        if (evt.target === this.popup) {
            this.closePopup();
        }
    }
}

class ProfilePopup extends Popup {
    constructor (popup) {
        super(popup);
        this.profileNameInput = popup.querySelector(`.profile-settings__input_name`);
        this.profileJobInput = popup.querySelector(`.profile-settings__input_job`);
        this.profileName = document.querySelector(`.profile__name`);
        this.profileJob = document.querySelector(`.profile__job`);
        this.form = popup.querySelector(`.popup__form`);
    }

    openPopup () {
       super.openPopup();
       this.profileNameInput.value = this.profileName.textContent;
       this.profileJobInput.value = this.profileJob.textContent;
       this.form.addEventListener(`submit`, this.formSubmit.bind(this));
    }

    closePopup () {
        super.closePopup();
        this.profileName.textContent = this.profileNameInput.value;
        this.profileJob.textContent = this.profileJobInput.value;
        this.form.removeEventListener(`submit`, this.formSubmit.bind(this));
    }

}

const profilePopup = new ProfilePopup(profileSettingsPopup);
profileSettingsBtn.addEventListener(`click`, profilePopup);

class AddPhotoPopup extends Popup {
    constructor (popup) {
        super(popup);
        this.inputPlaceName = popup.querySelector(`.add-card__input-name`);
        this.inputPlaceLink = popup.querySelector(`.add-card__input-link`);
        this.form = popup.querySelector(`.popup__form`);
    }

    openPopup () {
        super.openPopup();
        this.form.addEventListener(`submit`, this.formSubmit.bind(this));
    }

    closePopup () {
        super.closePopup();
        this.form.removeEventListener(`submit`, this.formSubmit.bind(this));
    }

    formSubmit(evt) {
        new RenderCard({
                     name: this.inputPlaceName.value,
                     link: this.inputPlaceLink.value
                }).render(elementsList, false);
        super.formSubmit(evt);
    }
}

const addPhotoPopup = new AddPhotoPopup(addNewPhotoPopup);
addNewPhotoPopupBtn.addEventListener(`click`, addPhotoPopup);

class RenderCard {
    constructor ({name, link}) {
        this.name = name;
        this.link = link;
        this.template = document.querySelector(`#card`).content;
    }

    createTemplate () {
        const newCard = this.template.cloneNode(true);
        newCard.querySelector(`.elements__image`).src = this.link;
        newCard.querySelector(`.elements__text`).textContent = this.name;
        return newCard;
    }

    render (position, flag) {
        flag ? position.append(this.createTemplate()) : position.prepend(this.createTemplate());
    }

}

initialCards.forEach((item) => new RenderCard(item).render(elementsList, true));

class PhotoPopup extends Popup {
    constructor (popup) {
        super(popup);
        this.image = popup.querySelector(`.show-image__img`);
        this.text = popup.querySelector(`.show-image__text`);
    }

    openPopup (name, link) {
        super.openPopup();
        this.bigPhoto(name, link)
    }

    bigPhoto (name, link) {
        this.image.src = link.src;
        this.text.textContent = name.textContent;
    }
}

const Photo = new PhotoPopup(bigPicPopup);

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
            Photo.openPopup(name, link);
            break;
        case btn.classList.contains(`elements__button`):
            btn.classList.toggle(`elements__button_liked`);
            break;
        default:
            return;
    }
};

elementsList.addEventListener(`click`, controller);
