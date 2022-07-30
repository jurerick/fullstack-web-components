import { Route } from "./router";
import { template as dashboardTemplate } from "./view/dashboard/DashboardView";
import { template as loginTemplate } from "./view/login/LoginView";
import { template as mainTemplate } from "./view/main/MainView";

export const routes: Array<Route> = [
    {
        path: "/",
        tag: "main-view",
        title: "In",
        template: mainTemplate,
        component: "main"
    },
    {
        path: "/login",
        tag: "login-view",
        title: "Login",
        template: loginTemplate,
        component: "login"
    },
    {
        path: "/dashboard",
        tag: "dashboard-view",
        title: "Contact Dashboard",
        template: dashboardTemplate,
        component: "dashboard"
    }
];

