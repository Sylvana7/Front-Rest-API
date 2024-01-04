import { Pagination } from "../services/paginations";
import { fetchPokemon } from "../services/fetch";
import { Routes } from "./routes";
import { getCookie } from "typescript-cookie";
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

export class ListPokemon {
  private fetchPokemon: any;
  private currentPage: number;
  private navigation: string;

  constructor() {
    this.currentPage = Routes.getNumPage();
    this.navigation = "";
  }

  public async getListPokemon(): Promise<string> {
    return await this.init();
  }

  private async init(): Promise<string> {
    const limit: number = Number(getCookie("limit"));
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * limit + 1;

    this.fetchPokemon = await fetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: any = this.fetchPokemon.results;
    this.navigation = await pagination.getPaginationPokemon();

    let html: string = `<div class='title'><h2>Pokemon list</h2></div>`;
    html += this.navigation;
    html += "<div class='pokemon__list'>";

    for (let array of pokemon) {
      const name = array.name;
      const url = array.url;
      const infoPokemon: any = await fetchPokemon(url);

      const urlSVG: string =
        infoPokemon.sprites.other.dream_world.front_default;
      const urlImg: string =
        urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;
      const idPokemon: string =
        "#" + infoPokemon.id.toString().padStart(5, "0");

      html += `
          <a href='${hostname}/pokemon/${infoPokemon.id.toString()}'>
            <div>
                <h3>${name}</h3>
                <img src=${urlImg}>
                <span>${idPokemon}</span>
            </div>
          </a>
        `;
    }
    html += "</div>";

    html += this.navigation;
    return html;
  }
}
