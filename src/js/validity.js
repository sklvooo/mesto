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
         this._setListeners(this.form);
    };

    _setListeners(formItem) {
        const inputs = Array.from(formItem.querySelectorAll(this.inputSelector));
        const buttonElement = formItem.querySelector(this.submitButtonSelector);
        this._toggleButtonState(inputs, buttonElement);

        inputs.forEach((inputItem) => {
            inputItem.addEventListener(`input`, () => {
                this._isValid(formItem, inputItem);
                this._toggleButtonState(inputs, buttonElement);
            })
        })
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

    _isValid(formElement, inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement)
        }
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this.errorClass);
    };
}
