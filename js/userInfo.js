export class UserInfo {
    constructor(nameInfo, job) {
        this.nameInfo = document.querySelector(`.${nameInfo}`);
        this.job = document.querySelector(`.${job}`);
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
}
