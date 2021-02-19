export class Card {
    constructor(card, template, handleCardClick) {
        this.template = template;
        this.name = card.name;
        this.link = card.link;
        this.handleCardClick = handleCardClick;
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
        this._element.querySelector(`.elements__image`).alt = this.name;
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
        this.handleCardClick._openPopup(this.name, this.link)
    }
}
