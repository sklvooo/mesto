export class UserInfo {
    constructor(nameInfo, job, avatar) {
        this.nameInfo = document.querySelector(`.${nameInfo}`);
        this.job = document.querySelector(`.${job}`);
        this.avatar = document.querySelector(`.${avatar}`);
    }

    getUserInfo() {
        return {
            nameInfo: this.nameInfo.textContent,
            job: this.job.textContent
        }
    }

    setUserInfo(name, job) {
        this.nameInfo.textContent = name;
        this.job.textContent = job;
    }

    setUserAvatar(avatar) {
        this.avatar.src = avatar;
    }
}
