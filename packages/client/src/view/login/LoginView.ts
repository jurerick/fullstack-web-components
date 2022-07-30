import { Component, attachShadow, html, css, Listen } from "@in/common";
import { LoginRequest, LoginService } from "./../../service/login";
import { SESSION } from "./../../service/session";
import { LocationService } from "./../../service/location";
import { AppHeader, template as HeaderTemplate } from "./../../component/header/AppHeader";
import resolve from "es6-template-strings";

const loginService = new LoginService();
const locationService = new LocationService();

const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }
    #content-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        min-width: 320px;
    }
    h4 {
        font-family: var(--font-default);
        font-weight: var(--font-weight-default);
        font-size: var(--font-headline-line-height-sm);
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-top: var(--margin-lg);
        margin-bottom: var(--margin-lg);
    }
    fieldset {
        border: 0 none;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-block-start: 0em;
        padding-inline-start: 0em;
        padding-inline-end: 0em;
        padding-block-end: 0em;
    }
    legend {
        visibility: hidden;
        height: 0px;
    }
    label {
        display: block;
        font-family: var(--font-default);
        font-size: var(--font-body-sm);
        margin-top: var(--margin-sm);
        margin-bottom: var(--margin-sm);
    }
    button {
        margin-top: var(--margin-md);
    }
`;

const contentTemplate = html`
    <in-card style="max-width: 320px">
        <h4 slot="header">Login</h4>

        <form name="foo"
            slot="content"
        >
            <fieldset>
                <legend>Login Form</legend>
                <label for="username">Username</label>
                <in-textinput name="username"
                    id="username"
                    type="text"
                    required
                    min-length="5"
                    class="form-control"
                ></in-textinput>

                <label for="password">Password</label>
                <in-textinput name="password"
                    id="password"
                    type="password"
                    required
                    min-length="5"
                    class="form-control"
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                ></in-textinput>

                <button class="primary submit form-button" is="in-button" type="submit">
                    Submit
                </button>
            </fieldset>
        </form>
    </in-card>
`;

const shadowTemplate = html`
    <app-header></app-header>
    <div id="content-root">
        ${contentTemplate}
    </div>
`;

@Component({
    selector: "login-view",
    style: styles,
    template: shadowTemplate
})
export class LoginView extends HTMLElement {

    validators = {
        username: {
            validations: [
                {
                    flag: { valueMissing: true },
                    condition: (input) => {
                        if(input.required && input.value.length <= 0) {
                            return true;
                        }
                        return false;
                    },
                    message: "Error: Required, please enter username."
                },
                {
                    flag: { tooShort: true },
                    condition: (input) => {
                        if(input.minLength && input.value.length < input.minLength) {
                            return true;
                        }
                        return false;
                    },
                    message: "Error: Minimum length not met, please supply a value with at least 5 characters." 
                }
            ]
        },
        password: {
            validations: [
                {
                    flag: { valueMissing: true },
                    condition: (input) => {
                        if(input.required && input.value.length <= 0) {
                            return true;
                        }
                        return false;
                    },
                    message: "Error: Required, please enter password."
                },
                {
                    flag: { tooShort: true },
                    condition: (input) => {
                        if(input.minLength && input.value.length < input.minLength) {
                            return true;
                        }
                        return false;
                    },
                    message: "Error: Minimum length not met, please supply a value with at least 5 characters." 
                },
                {
                    flag: { patternMismatch: true },
                    message: "Error: Please use at least one uppercase, special character, and number",
                    condition: (input) => {
                        //if(input.pattern && input.value.match(new RegExp(input.pattern)) === null){
                            //return true;
                        //}
                        return false;
                    }
                }
            ]
        }
    }

    constructor() {
        super();
        attachShadow(this);
    }

    @Listen("click", ".form-button")
    onButtonClick (ev) {
        ev.preventDefault();
        this.onValidate();
    }

    connectedCallback () {
        for(let prop in this.validators) {
            const input: any = this.shadowRoot.querySelector(`[name="${prop}"]`);
            input.$validator = this.validators[prop];
        }
    }

    @Listen('validate')
    onValidate (): void {

        const validations = [];
        for(let prop in this.validators) {
            validations.push(
                (this.shadowRoot.querySelector(`[name="${prop}"]`) as any)
                    .validity
                    .valid
            );
        }
        if(validations.filter((val) => val === false).length){
            console.warn("INVALID");
        }
        else {
            console.log("VALID");
            this.onSubmit();
        }
    }

    @Listen("submit")
    onSubmit(): void {
        const request = {
            username: "",
            password: ""
        } as LoginRequest;

        Array.from(this.shadowRoot.querySelectorAll(".form-control")).forEach((control:any) => {
            request[control.id] = control.value;
        });

        loginService.login(request).then((res) => {
            if(res.session === SESSION.OPEN) {
                locationService.navigate("dashboard");
            }
        });
    }
}


export const template = () => `
    <login-view>
        <template shadowroot="open">
            <style>
                ${resolve(styles)}
            </style>

            ${resolve(HeaderTemplate())}
            <div id="content-root">
                ${contentTemplate}
            </div>
        </template>
    </login-view>
`;

export { ButtonComponent, CardComponent, TextInputComponent } from "@in/ui";
export { AppHeader }