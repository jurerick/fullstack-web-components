import { installWindowOnGlobal } from "@lit-labs/ssr/lib/dom-shim.js";

const attributes = new WeakMap();

const attributesForElement = (element) => {

    let attrs = attributes.get(element);
    if(!attrs) {
        attributes.set(
            element, 
            (attrs = new Map())
        );
    }

    return attrs;
}

class Element {};

class HTMLElement extends Element {

    get attributes() {

        const attribArray = Array.from(attributesForElement(this));

        return attribArray.map(([name, value]) => ({
            name,
            value,
          }));
    }

    setAttribute(name, value) {
        attributesForElement(this).set(name, value);
    }

    removeAttribute(name) {
        attributesForElement(this).delete(name);
    }

    hasAttribute(name) {
        return attributesForElement(this).has(name);
    }

    attachShadow() {
        return {
            host: this
        }
    }

    getAttribute(name) {
        const value = attributesForElement(this).get(name);
        return value === undefined? null: value;
    }
}

class HTMLButtonElement extends HTMLElement {}

class HTMLTableElement extends HTMLElement {}

class HTMLTableCellElement extends HTMLElement {}

class HTMLTableRowElement extends HTMLElement {}

class HTMLDivElement extends HTMLElement {}

const installShimGlobal = () => {
    installWindowOnGlobal({
        HTMLButtonElement,
        HTMLTableElement,
        HTMLTableCellElement,
        HTMLTableRowElement,
        HTMLDivElement
    });
};
installShimGlobal();

export { installShimGlobal };