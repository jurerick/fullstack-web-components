import { attachShadow, Component, html, css } from "@in/common";

@Component({
    selector: "in-card",
    style: css`:host {
            display: block;
            background: var(--color-white);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow);
            width: 320px;
            overflow: hidden;
        }
        ::slotted(*) {
            padding-left: var(--padding-lg);
            padding-right: var(--padding-lg);
        }
        ::slotted(a:link), ::slotted(a:visited){
            display: block;
        }
        ::slotted(:last-child) {
            padding-bottom: var(--margin-lg);
        }
        ::slotted(img) {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
        ::slotted(h4){
            font-size: var(--font-headline-sm) !important;
        }`,
    template: html`<header>
            <slot name='header'></slot>
        </header>
        <section>
            <slot name='content'></slot>
        </section>
        <footer>
            <slot name='footer'></slot>
        </footer>`
})
export class CardComponent extends HTMLElement {

    constructor() {
        super();
        attachShadow(this);
    }
}
