import { Pagination } from "../services/paginations";
import { App, Routes } from "../routes/routes";
import { hostname } from "../../main";

export class PaginationPokemon {
  private pagination?: HTMLDivElement;
  private currentPage: number;

  constructor(public readonly maxPokemon: number) {
    this.currentPage = Number(App.getValue("page"));
  }

  public async getPaginationPokemon(): Promise<HTMLDivElement> {
    this.pagination = new Pagination({
      url: this.getUrl(),
      numberElements: this.maxPokemon,
      currentPage: this.currentPage,
    }).getDisplay("pokemon__pagination");
    return await this.pagination;
  }

  private getUrl(): string {
    let routes: boolean = App.routes("page");
    let newRoute: string = "";

    if (routes) {
      newRoute = App.joinSegments(App.getReplace("page", "$num"));
    } else {
      let join: string = App.joinSegments(Routes.getRoutes());
      newRoute = join ? join + "/" : "";
      newRoute += "page/$num";
    }
    newRoute = newRoute.replaceAll("//", "/");
    return hostname + "/" + newRoute;
  }
}
