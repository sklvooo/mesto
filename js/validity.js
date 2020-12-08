const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, obj) => {
    const {inactiveButtonClass} = obj;
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const {inputErrorClass, errorClass} = obj;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
    const {inputErrorClass, errorClass} = obj;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

const isValid = (formElement, inputElement, obj) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj)
    }
};

const setListeners = (formItem, obj) => {
    const {inputSelector, submitButtonSelector} = obj;
    const inputs = Array.from(formItem.querySelectorAll(inputSelector));
    const buttonElement = formItem.querySelector(submitButtonSelector);
    toggleButtonState(inputs, buttonElement, obj);

    inputs.forEach((inputItem) => {
        inputItem.addEventListener(`input`, () => {
            isValid(formItem, inputItem, obj);
            toggleButtonState(inputs, buttonElement, obj);
        })
    })
};

const enableValidation = (obj) => {
    const {formSelector} = obj;

    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((formItem) => {
        formItem.addEventListener(`submit`, (evt) => evt.preventDefault());
        setListeners(formItem, obj);
    })
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: `popup__input-error_active`
});
