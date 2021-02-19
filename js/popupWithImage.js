import {Popup} from "./popup";

export class PopupWithImage extends Popup {
    openPopup(name, link) {
        const text = this._popup.querySelector(`.show-image__text`);
        const img = this._popup.querySelector(`.show-image__img`);
        text.textContent = name;
        img.src = link;
        img.alt = `Фото ${text}`;
        super.openPopup();
    }
}
