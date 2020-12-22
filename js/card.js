const photoPopup = document.querySelector(`.show-image`);

class Popup {
    constructor(popup) {
        this.escape = `Escape`;
        this.popup = popup;
    }

    openPopup() {
        this.popup.classList.add(`popup_opened`);
        document.addEventListener(`keydown`, this._onEscapePress);
        document.addEventListener(`click`, this._onOverlayClick);
    };

    closePopup() {
        this.popup.classList.remove(`popup_opened`);
        document.removeEventListener(`keydown`, this._onEscapePress);
        document.removeEventListener(`click`, this._onOverlayClick);
    };

    _onEscapePress = (evt) => {
        if (evt.key === this.escape) {
            this.closePopup();
        }
    };

    _onOverlayClick = (evt) => {
        if (evt.target.classList.contains(`popup_opened`)) {
            this.closePopup();
        }
    };
}

export class Card {
    constructor(card, template) {
        this.template = template;
        this.name = card.name;
        this.link = card.link;
        this.popup = new Popup(photoPopup)
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
        this._element.querySelector(`.elements__button`).addEventListener(`click`, this._likeBtnClickHandler.bind(this));
        this._element.querySelector(`.elements__remove-button`).addEventListener(`click`, this._removeBtnClickHandler.bind(this));
        this._element.querySelector(`.elements__image`).addEventListener(`click`, this._openPhotoPopupHandler.bind(this));

        return this._element
    }

    _likeBtnClickHandler() {
        this._element.querySelector(`.elements__button`).classList.toggle(`elements__button_liked`);
    }

    _removeBtnClickHandler() {
        this._element.remove();
    }

    _openPhotoPopupHandler() {
        const text = photoPopup.querySelector(`.show-image__text`);
        const img = photoPopup.querySelector(`.show-image__img`);
        text.textContent = this.name;
        img.src = this.link;
        img.alt = `Фото ${text}`;
        this.popup.openPopup();
    }
}
