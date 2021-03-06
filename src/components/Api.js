export class Api {
    constructor(options) {
        this.url = options.url;
        this.header = options.header;
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.header
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.header
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editProfileInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.header,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.header,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addPhoto(photo) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify({
                name: photo.name,
                link: photo.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setLike(photo) {
        return fetch(`${this.url}/cards/likes/${photo}`, {
            method: 'PUT',
            headers: this.header,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteLike(photo) {
        return fetch(`${this.url}/cards/likes/${photo}`, {
            method: 'DELETE',
            headers: this.header,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(card) {
        return fetch(`${this.url}/cards/${card}`, {
            method: 'DELETE',
            headers: this.header,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}
