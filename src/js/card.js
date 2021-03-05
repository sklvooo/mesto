export class Card {
    constructor(card, template, callbacks, user) {
        const [handleCardClick, handleDeleteClick, setLikeHandler, deleteLikeHandler] = callbacks;
        this.template = template;
        this.name = card.name;
        this.link = card.link;
        this.handleCardClick = handleCardClick;
        this.id = card._id;
        this.handleDeleteClick = handleDeleteClick;
        this.setLikeHandler = setLikeHandler;
        this.deleteLikeHandler = deleteLikeHandler;
        this.likes = card.likes;
        this.user = user;
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
        this._element.querySelector(`.elements__like-counter`).textContent = this.likes.length;
        const likes = this.likes.map(item => item._id);
        if (likes.includes(this.user)) {
            this._element.querySelector(`.elements__button`).classList.add(`elements__button_liked`);
        }
        this._setEventListeners();
        return this._element
    }

    _likeBtnClickHandler() {
        const likeBtn = this._element.querySelector(`.elements__button`);
        if (likeBtn.classList.contains(`elements__button_liked`)) {
            this.deleteLikeHandler(this.id);
        } else {
            this.setLikeHandler(this.id);
        }
        likeBtn.classList.toggle(`elements__button_liked`);
    }

    _removeBtnClickHandler() {
        this.handleDeleteClick.openPopup(this.id);
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
        this.handleCardClick.openPopup(this.name, this.link)
    }
}
