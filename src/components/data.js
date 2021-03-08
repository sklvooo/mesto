const validityRules = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: `popup__input-error_active`
};

const apiOption = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-20',
    header: {
        authorization: '5f03bf04-a3c4-47d6-9cb8-5a48c2f0123b',
        'Content-Type': 'application/json'
    }
};

export {apiOption, validityRules}
