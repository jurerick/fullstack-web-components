export enum SESSION {
    OPEN,
    CLOSED
}

export type SessionResponse = {
    session: SESSION.OPEN | SESSION.CLOSED;
}

export class SessionService {
    private path = "/api/session";

    constructor() {

    }

    async getSession(): Promise<SessionResponse> {
        return fetch(this.path, {
            method: "GET",
        }).then((res) => {
            return this.processSession(res.status);
        });
    }

    processSession(status: number): SessionResponse {
        return {
            session: status === 200 ? SESSION.OPEN: SESSION.CLOSED 
        };
    }

    
}