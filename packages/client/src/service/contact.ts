import { ColumnData } from "@in/ui";

export type Contact = {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    street: string;
    city: string;
    region: string;
    postalCode: string;
};

export type ContactResponse = {
    columnData: ColumnData;
    rowData: Array<Contact>
}

export class ContactService {
    private channel: BroadcastChannel;
    private channelName: string;
    private path = "api/contacts";

    constructor (channelName: string) {
        this.channelName = channelName;
        this.channel = new BroadcastChannel(this.channelName);
    }

    async getContacts (): Promise<ContactResponse> {
        return fetch(this.path, {
            method: "GET"
        }).then((res) => {
            if(res.status === 200) {
                return res.json();
            }else {
                return {
                    columnData: [],
                    rowData: []
                };
            }
        }).then((res: ContactResponse) => {
            return this.processContacts(res);
        });
    }

    processContacts(model: ContactResponse): ContactResponse {
        this.channel.postMessage({
            type: "data",
            detail: model
        });
        return model;
    }

    async modifyContacts (rows: Array<Contact>) {
        return fetch(this.path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rows)
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            } else {
                return {
                    columnData: [],
                    rowData: []
                };
            }
        })
        .then((res: ContactResponse) => {
            return this.processContacts(res);
        });
    }
}