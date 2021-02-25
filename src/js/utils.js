import {Card} from "./card";
import {PopupWithImage} from "./popupWithImage";

export const renderCard = (card, position, flag = false) => {
    const newCard = new Card(card, `element`, new PopupWithImage(`show-image`));
    flag ? position.append(newCard.getElement()) : position.prepend(newCard.getElement());
};
