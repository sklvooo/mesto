export class FormValidator {
    constructor(obj, form) {
        this.form = form;
        this.inputSelector = obj.inputSelector;
        this.submitButtonSelector = obj.submitButtonSelector;
        this.inactiveButtonClass = obj.inactiveButtonClass;
        this.inputErrorClass = obj.inputErrorClass;
        this.errorClass = obj.errorClass;
    }

     enableValidation() {
         this.form.addEventListener(`submit`, (evt) => evt.preventDefault());
         this._setListeners();
    };

    _setListeners() {
        const inputs = Array.from(this.form.querySelectorAll(this.inputSelector));
        const buttonElement = this.form.querySelector(this.submitButtonSelector);
        this._toggleButtonState(inputs, buttonElement);

        inputs.forEach((inputItem) => {
            inputItem.addEventListener(`input`, () => {
                this._isValid(inputItem);
                this._toggleButtonState(inputs, buttonElement);
            })
        });

        this.form.addEventListener('reset', () => {
            inputs.forEach((inputElement) => {
                this.hideInputError(inputElement);
                this._toggleButtonState(inputs, buttonElement);
            })
        });
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement)
        }
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    };

    hideInputError(inputElement) {
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this.errorClass);
    };
}
