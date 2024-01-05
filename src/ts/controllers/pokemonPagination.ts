import { Pagination } from "../services/paginations";
import { Routes } from "../routes/routes";
import { hostname } from "../../main";

export class PaginationPokemon {
  private pagination: any;
  private currentPage: number;

  constructor(public readonly maxPokemon: number) {
    this.currentPage = Routes.getNumPage();
  }
  public async getPaginationPokemon(): Promise<string> {
    return await this.init();
  }
  private async init(): Promise<string> {
    this.pagination = new Pagination(this.maxPokemon, this.currentPage);
    return await this.pagination.getDisplay(
      this.firstPage(),
      this.previousPage(),
      this.numPage(),
      this.nextPage(),
      this.lastPage()
    );
  }

  private firstPage(): string {
    return `<a href='${hostname}/page/1' class='$classNav' title='first page'><span class='icon double icon_arrow_sm_left'></span><span class='icon icon_arrow_sm_left'></span></a>`;
  }
  private previousPage(): string {
    return `<a href='${hostname}/page/$num' class='$classNav' title='previous page'><span class='icon icon_arrow_sm_left'></span></a>`;
  }
  private numPage(): string {
    return `<a href='${hostname}/page/$num' class='$classNav'>$num</a>`;
  }
  private nextPage(): string {
    return `<a href='${hostname}/page/$num' class='$classNav' title='next page'><span class='icon icon_arrow_sm_right'></span></a>`;
  }
  private lastPage(): string {
    return `<a href='${hostname}/page/$num' class='$classNav' title='last page'><span class='icon double icon_arrow_sm_right'></span><span class='icon icon_arrow_sm_right'></span></a>`;
  }
}
