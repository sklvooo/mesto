const enableValidation = (obj) => {
    const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = obj;

    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
        }
    };

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(errorClass);
    };

    const isValid = (formElement, inputElement) => {
        if(!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement)
        }
    };

    const setListeners = (formItem) => {
        const inputs = Array.from(formItem.querySelectorAll(inputSelector));
        const buttonElement = formItem.querySelector(submitButtonSelector);
        toggleButtonState(inputs, buttonElement);

        inputs.forEach((inputItem) => {
            inputItem.addEventListener(`input`, () => {
                isValid(formItem, inputItem);
                toggleButtonState(inputs, buttonElement);
            })
        })
    };

    const formValidation = () => {
        const forms = Array.from(document.querySelectorAll(formSelector));

        forms.forEach((formItem) => {
            formItem.addEventListener(`submit`, (evt) => evt.preventDefault());
            setListeners(formItem);
        })
    };
    formValidation();
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: `popup__input-error_active`
});
