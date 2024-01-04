import { Routes } from "./routes";
export class App {
  private static routes: string[] = Routes.getRoutes();
  private static route: string = Routes.getRoute();

  public static get(routeClient: string): boolean {
    if (App.route === routeClient) {
      return true;
    }
    return false;
  }
}
