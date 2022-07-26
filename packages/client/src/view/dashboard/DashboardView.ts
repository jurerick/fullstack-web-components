import { Component, attachShadow, html, css } from "@in/common";
import { ContactService } from "./../../service/contact";

const contactService = new ContactService("dashboard-channel");

const styles = css`
    #content-root {
        display: block;
        margin: 0;
        padding: var(--padding-xl);
        width: 100%;
    }
    h1 {
        font-family: var(--font-default);
        font-weight: var(--font-weight-default);
        font-size: var(--font-headline-line-height-sm);
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-top: var(--margin-lg);
        margin-bottom: calc(var(--margin-lg) * 2);
    }
    in-tablecard {
        display: block;
        width: calc(100% - var(--padding-xl) * 2);
    }
`;

const shadowTemplate = html`
    <app-header></app-header>
    <div id="content-root">
        <h1>Contacts</h1>
        <in-tablecard channel="dashboard-channel"></in-tablecard>
    </div>
`;

@Component({
    selector: "dashboard-view",
    style: styles,
    template: shadowTemplate
})
export class DashboardView extends HTMLElement {

    channelName: string = "dashboard-channel";

    constructor() {
        super();
        attachShadow(this);

        contactService.getContacts().then((res) => {
            if(res.columnData.length && res.rowData.length) {
                this.onTableData();
            }
        });
    }

    onTableData () {
        const channel = new BroadcastChannel(this.channelName);
        channel.onmessage = (ev) => {
            if(ev.data.type === "change") {
                contactService.modifyContacts(ev.data.detail);
            }
        }
    }
}