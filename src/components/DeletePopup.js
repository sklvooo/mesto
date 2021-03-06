import {Popup} from "./Popup";

export class DeletePopup extends Popup {
    constructor(popup, cb, card) {
        super(popup);
        this.cb = cb;
        this.btn = this._popup.querySelector(`.popup__button`);
        this.card = card;
        this._deletePopupHandler = this._deletePopupHandler.bind(this)
    }

    openPopup() {
        super.openPopup();
        this.btn.addEventListener(`click`, this._deletePopupHandler);
    }

    _deletePopupHandler() {
        this.cb(this.card._id);
        this._closePopup();
    }

    _closePopup() {
        this.btn.removeEventListener(`click`, this._deletePopupHandler);
        super._closePopup();
    }
}
