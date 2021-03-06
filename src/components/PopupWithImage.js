import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this.text = this._popup.querySelector(`.show-image__text`);
        this.img = this._popup.querySelector(`.show-image__img`);
    }
    openPopup(name, link) {
        this.text.textContent = name;
        this.img.src = link;
        this.img.alt = `Фото ${this.text}`;
        super.openPopup();
    }
}
