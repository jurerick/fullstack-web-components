import { SESSION } from "./session";

export type LoginRequest = {
    username: string;
    password: string;
}

export type InternalLoginResponse = {
    status: number;
}

export type LoginResponse = {
    session: SESSION.OPEN | SESSION.CLOSED
}

export class LoginService {
    private path = "/api/auth";

    constructor() {}

    async login(request: LoginRequest) {

        return fetch(this.path, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return this.processLoginResponse(res);
        });
    }

    processLoginResponse(res: InternalLoginResponse): LoginResponse {
        return {
            session: res.status === 200? SESSION.OPEN: SESSION.CLOSED
        }
    }
}

