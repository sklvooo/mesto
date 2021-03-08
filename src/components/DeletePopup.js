import {Popup} from "./Popup";

export class DeletePopup extends Popup {
    constructor(popup, cb) {
        super(popup);
        this.cb = cb;
        this.btn = this._popup.querySelector(`.popup__button`);
        this._deletePopupHandler = this._deletePopupHandler.bind(this)
    }

    openPopup() {
        super.openPopup();
        this.btn.addEventListener(`click`, this._deletePopupHandler);
    }

    updateData(id, elem) {
       this.id = id;
       this.elem = elem
    }

    _deletePopupHandler() {
        this.cb(this.id, this.elem);
        this._closePopup();
    }

    _closePopup() {
        this.btn.removeEventListener(`click`, this._deletePopupHandler);
        super._closePopup();
    }
}
