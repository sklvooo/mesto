import {Popup} from "./popup";

export class PopupWithForm extends Popup {
    constructor(popup, formSubmit) {
        super(popup);
        this.formSubmit = formSubmit;
        this.popupForm = this._popup.querySelector('.popup__form');
        this._formSubmitHandler = this._formSubmitHandler.bind(this)
    }

    _closePopup() {
        super._closePopup();
        this.popupForm.reset();
    }

    _setEventListeners() {
        super._setEventListeners();
        this.popupForm.addEventListener('submit', this._formSubmitHandler);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this.popupForm.removeEventListener('submit', this._formSubmitHandler);
    }

    _formSubmitHandler(evt) {
        evt.preventDefault();
        this.formSubmit(this._getInputValues());
        this._popup.querySelector(`.popup__button`).classList.add(`popup__button_disabled`);
        this._closePopup();
    }

    _getInputValues() {
        this._inputList = this.popupForm.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
}
