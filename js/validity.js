const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
};

const isValid = (formElement, inputElement, obj) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj)
    }
};

const setListeners = (formItem, obj) => {
    const inputs = Array.from(formItem.querySelectorAll(obj.inputSelector));
    const buttonElement = formItem.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputs, buttonElement, obj);

    inputs.forEach((inputItem) => {
        inputItem.addEventListener(`input`, () => {
            isValid(formItem, inputItem, obj);
            toggleButtonState(inputs, buttonElement, obj);
        })
    })
};

const enableValidation = (obj) => {

    const forms = Array.from(document.querySelectorAll(obj.formSelector));

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
