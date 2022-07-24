type InternalCookiePermission = {
    permission: boolean;
}

export enum COOKIES {
    ACCEPT,
    DECLINE
}

export type CookiePermission = {
    permission: COOKIES.ACCEPT | COOKIES.DECLINE
}

export class CookieService {
    
    private path= "/api/cookies";

    constructor () {}

    async givePermission (cookies: CookiePermission): Promise<CookiePermission> {        
        const allow = cookies.permission === COOKIES.ACCEPT? true: false;

        return fetch(this.path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({permission: allow})
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            } else {
                return {
                    permission: false
                }
            }
        })
        .then((res: InternalCookiePermission) => this.processPermission(res));
    }

    async getPermission (): Promise<CookiePermission> {
        return fetch(this.path, {
            method: "GET",
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            } else {
                return {
                    permission: false
                };
            }
        })
        .then((res: InternalCookiePermission) => this.processPermission(res));
    }

    processPermission (model: InternalCookiePermission): CookiePermission {
        return {
            permission: model.permission === true
                ? COOKIES.ACCEPT
                : COOKIES.DECLINE
        };
    }
}