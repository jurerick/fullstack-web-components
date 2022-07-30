import { Component, attachShadow, html, css, Listen } from "@in/common";
import { COOKIES, CookieService } from "./../../service/cookies";
import { buttonStyles } from "@in/ui";
import resolve from "es6-template-strings";

const cookieService = new CookieService();

export const styles = css`
    :host {
        display: flex;
        justify-content: space-between;
        height: 120px;
        padding-left: var(--margin-lg);
        padding-right: var(--margin-lg);
        border-top: var(--border-default);
        align-items: center;
    }
    .button-container {
        align-self: right;
        display: flex;
        height: 40px;
    }
    button {
        margin-left: var(--margin-sm);
    }
    @media (max-width: 720px) {
        :host {
            flex-direction: column;
            margin-bottom: var(--margin-lg);
        }
    }
`;

export const shadowTemplate = html`
    <p class="message">
        We use cookies to personalize content and ads, to provide social media
        features and to analyse our traffic.
    </p>
    <div class="button-container">
        <button is="in-button" class="in-button secondary">Deny</button>
        <button is="in-button" class="in-button primary">Allow</button>
    </div>
`;

export const template = () => `
    <cookie-footer>
        <template shadowroot="open">
            <style>
                ${resolve(styles)}
                ${resolve(buttonStyles)}
            </style>

            ${resolve(shadowTemplate)}
        </template>
    </cookie-footer>
`;

@Component({
    selector: "cookie-footer",
    style: styles,
    template: shadowTemplate
})
export class CookieFooter extends HTMLElement {

    constructor () {
        super();
        attachShadow(this);
    }

    updateCookiePermission (allow: COOKIES.DECLINE | COOKIES.ACCEPT) {
        cookieService.givePermission({
            permission: allow
        }).then((cookies) => {
            if(cookies.permission === COOKIES.ACCEPT) {
                this.setAttribute("hidden", "true");
            }
            else {
                this.removeAttribute("hidden");
            }
        });
    }

    @Listen("click", ".secondary")
    onDenyClick() {
        this.updateCookiePermission(COOKIES.DECLINE);
    }

    @Listen("click", ".primary")
    onAllowClick() {
        this.updateCookiePermission(COOKIES.ACCEPT);
    }
}