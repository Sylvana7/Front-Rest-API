import { Pagination } from "../services/paginations";
import { Routes } from "../routes/routes";
import { hostname } from "../../main";

export class PaginationPokemon {
  private pagination: any;
  private currentPage: number;

  constructor(public readonly maxPokemon: number) {
    this.currentPage = Routes.getNumPage();
  }

  public async getPaginationPokemon(): Promise<HTMLDivElement> {
    this.pagination = new Pagination({
      url: this.getUrl(),
      numberElements: this.maxPokemon,
      currentPage: this.currentPage,
    });
    return await this.pagination.getDisplay("pokemon__pagination");
  }

  private getUrl(): string {
    return `${hostname}/page/$num`;
  }
}
