import { routes } from "./routes";
import { Router } from "./router";

const router = new Router("#root", routes);

export { routes, router, Router };

export {ButtonComponent} from "@in/ui";
export { MainView, LoginView, DashboardView } from "./view";
export { AppHeader, CookieFooter, Background } from "./component";
