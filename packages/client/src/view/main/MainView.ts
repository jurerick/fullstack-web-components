import { Component, attachShadow, html, css } from "@in/common";
import { COOKIES, CookieService } from "./../../service/cookies";
import { SESSION, SessionService } from "./../../service/session";
import resolve from "es6-template-strings";
import { AppHeader, template as HeaderTemplate } from "./../../component/header/AppHeader";
import { CookieFooter, template as FooterTemplate } from "./../../component/footer/CookieFooter";
import { Background } from "./../../component/background/Background";

const sessionService = new SessionService();

const contentTemplate = html`
    <div 
        class="section" 
        is="in-bg"
        background="/style/asset/timon-studler-BIk2ANMmNz4-unsplash.jpg"
    >
        <div class="blurb half right">
            <h2>Your Last Contact List</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod eo
            liquidius faciet, si perspexerit rerum inter eas verborumne sit
            controversia.
            </p>
            <a href="/dashboard" class="cta dashboard-link" hidden>View Contacts</a>
        </div>
        </div>
        <div 
        class="section light"
        is="in-bg"
        background="/style/asset/valiant-made-zBkVp3E2CnE-unsplash.jpg"
        >
        <div class="blurb">
            <h2>Turn Group Chats Into Live Events</h2>
            <p>
            Indicant pueri, in quibus ut in speculis natura cernitur. Itaque ad
            tempus ad Pisonem omnes. Quis hoc dicit? Philosophi autem in suis
            lectulis plerumque moriuntur. Videmus in quodam volucrium genere non
            nulla indicia pietatis, cognitionem, memoriam, in multis etiam
            desideria videmus. Quid sequatur, quid repugnet, vident. Atqui
            pugnantibus et contrariis studiis consiliisque semper utens nihil
            quieti videre, nihil tranquilli potest.
            </p>
        </div>
    </div>
`;

const shadowTemplate = html`
    <app-header>Header</app-header>
    <div id="content-root">
        ${contentTemplate}
    </div>
    <cookie-footer></cookie-footer>
`;

const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }
    #content-root {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }
    [hidden] {
        display: none;
    }
    a:link,
    a:visited {
        font-family: var(--font-default);
        font-weight: var(--font-weight-default);
        font-size: var(--font-body-md);
        text-decoration: none;
        color: var(--color-black);
    }
    .cta:after {
        display: inline-block;
        margin-left: 4px;
        content: '\\25BA';
    }
    .blurb {
        text-align: justify;
    }
    .half {
        width: 50%;
    }
    .right {
        float: right;
    }
    .light {
        color: var(--color-white);
    }
    [is='in-bg'] {
        width: calc(100% - (var(--margin-lg) * 2));
        min-height: 480px;
        padding: var(--margin-lg);
    }
    [is='in-bg']:last-child {
        padding-bottom: 120px;
    }
    @media (max-width: 480px) {
        .half {
            width: 100%;
        }
        .right {
            float: left;
        }
    }
`;

const cookieService = new CookieService();  

@Component({
    selector: "main-view",
    style: styles,
    template: shadowTemplate
})
export class MainView extends HTMLElement {

    constructor () {
        super();
        attachShadow(this);
    }

    get $dashboardLink() {
        return this.shadowRoot.querySelector(".dashboard-link");
    }

    get $cookieFooter() {
        return this.shadowRoot.querySelector("cookie-footer");
    }

    connectedCallback() {
        cookieService.getPermission().then((cookies) => {
            if(cookies.permission == COOKIES.ACCEPT) {
                this.$cookieFooter.setAttribute("hidden", "true");
            } else {
                this.$cookieFooter.removeAttribute("hidden");
            }
        });

        sessionService.getSession().then((res) => {
            if(res.session === SESSION.OPEN) {
                this.$dashboardLink.removeAttribute("hidden");
            }
        })
    }
}
export const template = () => `
    <main-view>
        <template shadowroot="open">
            <style>
                ${resolve(styles)}
            </style>
            ${resolve(HeaderTemplate())}
            <div id="content-root">
                ${contentTemplate}
            </div>

            ${resolve(FooterTemplate())}
        </template>
    </main-view>
`;

export { ButtonComponent } from "@in/ui";

export { AppHeader, CookieFooter, Background };