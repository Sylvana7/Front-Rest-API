export class Routes {
  private static route: string[] = window.location.pathname.split("/");

  constructor() {}

  public static getRoutes(): string[] {
    return Routes.route;
  }

  public static getRoute(): string {
    return Routes.route[1];
  }

  public static getNumPage(): number {
    return Number(Routes.route[2]) > 0 ? Number(Routes.route[2]) : 1;
  }
  public static getSearch(): string {
    return Routes.route[2];
  }
}
