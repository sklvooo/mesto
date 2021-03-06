export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(`.${popup}`);
        this._escape = `Escape`;
        this._closePopup = this._closePopup.bind(this);
        this._closeBtn = this._popup.querySelector(`.popup__close`);
        this._onEscapePressHandler = this._onEscapePressHandler.bind(this);
        this._onOverlayClickHandler = this._onOverlayClickHandler.bind(this);
    }

    openPopup() {
        this._popup.classList.add(`popup_opened`);
        this._setEventListeners();
    }

    _closePopup() {
        this._removeEventListeners();
        this._popup.classList.remove(`popup_opened`);
    }

    _onEscapePressHandler(evt) {
        if (evt.key === this._escape) {
            this._closePopup();
        }
    }

    _onOverlayClickHandler(evt) {
        if (evt.target.classList.contains(`popup_opened`)) {
            this._closePopup();
        }
    };

    _setEventListeners() {
        this._closeBtn.addEventListener('click', this._closePopup);
        document.addEventListener(`keydown`, this._onEscapePressHandler);
        document.addEventListener(`click`, this._onOverlayClickHandler);
    }

    _removeEventListeners() {
        this._closeBtn.removeEventListener('click', this._closePopup);
        document.removeEventListener(`keydown`, this._onEscapePressHandler);
        document.removeEventListener(`click`, this._onOverlayClickHandler);
    }
}
