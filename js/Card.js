const ESCAPE = `Escape`;
const photoPopup = document.querySelector(`.show-image`);

const openPopup = (popup) => {
    popup.classList.add(`popup_opened`);
    document.addEventListener(`keydown`, onEscapePress);
    document.addEventListener(`click`, onOverlayClick);
};

const closePopup = (popup) => {
    popup.classList.remove(`popup_opened`);
    document.removeEventListener(`keydown`, onEscapePress);
    document.removeEventListener(`click`, onOverlayClick);
};

const onEscapePress = (evt) => {
    if (evt.key === ESCAPE) {
        const activePopup = document.querySelector(`.popup_opened`);
        closePopup(activePopup);
    }
};

const onOverlayClick = (evt) => {
    if (evt.target.classList.contains(`popup_opened`)) {
        const activePopup = document.querySelector(`.popup_opened`);
        closePopup(activePopup);
    }
};

export class Card {
    constructor(card, template) {
        this.template = template;
        this.name = card.name;
        this.link = card.link;
    }

    _getTemplate() {
        return document.querySelector(`#${this.template}`)
            .content
            .querySelector('.elements__list-item')
            .cloneNode(true);
    }

    getElement() {
        this._element = this._getTemplate();

        this._element.querySelector(`.elements__image`).src = this.link;
        this._element.querySelector(`.elements__text`).textContent = this.name;
        this._setEventListeners();

        return this._element
    }

    _likeBtnClickHandler() {
        this._element.querySelector(`.elements__button`).classList.toggle(`elements__button_liked`);
    }

    _removeBtnClickHandler() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(`.elements__remove-button`).addEventListener(`click`, () => {
            this._removeBtnClickHandler()
        });

        this._element.querySelector(`.elements__button`).addEventListener(`click`, () => {
            this._likeBtnClickHandler()
        });

        this._element.querySelector(`.elements__image`).addEventListener(`click`, () => {
            this._openPhotoPopupHandler()
        });
    }

    _openPhotoPopupHandler() {
        const text = photoPopup.querySelector(`.show-image__text`);
        const img = photoPopup.querySelector(`.show-image__img`);
        text.textContent = this.name;
        img.src = this.link;
        img.alt = `Фото ${text}`;
        openPopup(photoPopup);
    }
}
