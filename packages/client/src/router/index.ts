export interface Route {
    path: string;
    tag: string;
    title?: string;
    template?: any;
    component: string;
}

export class Router {
    rootElement: Element;
    routes: Array<Route>;

    constructor (root: string, routes: Array<Route>) {
        if(document.querySelector(root) === null) {
            console.error(`[Router] Root element ${root} does not exist.`);
        }

        if(!routes) {
            console.error(`[Router] initialized without any routes.`);
        }

        this.rootElement = document.querySelector(root);

        this.routes = routes;

        this.init();
    }

    init () {
        this.navigate(window.location.pathname);
    }

    navigate(path: string) {
        const route = this.matchRoute(path);
        if(!route) {
            console.error(`[Router] Route '${path}' does not exist.`);
            return;
        }

        this.resolve(route);
    }

    matchRoute(path: string) {
        return this.routes.find((route) => route.path === path);
    }

    resolve(route: Route) {
        const component: HTMLElement = document.createElement(route.tag);
        if(route.title) {
            document.title = route.title;
        }
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(component);
    }
}