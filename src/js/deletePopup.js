import {Popup} from "./popup";

export class DeletePopup extends Popup {
    constructor(popup, cb) {
        super(popup);
        this.cb = cb;
        this.btn = this._popup.querySelector(`.popup__button`);
    }

    openPopup(id) {
        super.openPopup();
        this.btn.addEventListener(`click`, () => {
            this.cb(id);
            this._closePopup()
        });
    }

    _closePopup() {
        super._closePopup();
    }
}
