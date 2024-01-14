// Importing necessary modules and services
import {
  FetchPokemon,
  JSONObject,
  JSONpokemon,
  JSONspecies,
  arrayDefault,
} from "../services/fetch";
import { App, Routes, Segment } from "../routes/routes";
import { getCookie } from "typescript-cookie";
import { arrayElemFilter, hostname } from "../../main";
import { PaginationPokemon } from "./pokemonPagination";
import { displayPokemon } from "../services/pokemonsDisplay";
import { DocumentCreate } from "../services/createElements";

// Definition of the ListPokemon class
export class ListPokemon {
  // Private member variables for storing fetched Pokemon data and current page number
  private fetchPokemon: JSONObject = { count: 0, results: [] };

  // Retrieve the limit value from the cookie
  private limit: number = Number(getCookie("limit"));

  public readonly post: string;
  public readonly filter: boolean;
  public readonly currentPage: number;

  // Constructor for initializing the class instance
  constructor(public readonly form?: { post?: string } | { filter?: boolean }) {
    const { post = "", filter = false } =
      (form as {
        post?: string;
        filter?: boolean;
      }) || {};
    this.post = post;
    this.filter = filter;
    console.log("post  : ");
    console.log(this.post);
    console.log("filter");
    console.log(this.filter);
    // Get the current page number from the Routes class
    this.currentPage =
      Number(App.getValue("page")) <= 0 ? 1 : Number(App.getValue("page"));
  }

  private async communList(): Promise<void> {
    console.log("list");

    // Calculate the offset based on the current page and limit
    const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    const offset = paginPage * this.limit;

    // Construct the URL for fetching Pokemon data
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.limit}`;

    // Fetch Pokemon data using the FetchPokemon class
    this.fetchPokemon = await new FetchPokemon(url).list();
  }

  private async communSearch() {
    console.log("search");
    const fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=${await this.number(
        "pokemon"
      )}`
    ).list();
    let regexPost: string = this.post;

    regexPost = regexPost.startsWith("*")
      ? regexPost.substring(1)
      : "^" + regexPost;

    regexPost = regexPost.endsWith("*")
      ? regexPost.substring(0, regexPost.length - 1)
      : regexPost + "$";

    const regex = new RegExp(regexPost);

    // const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    // const offset = paginPage * this.limit;

    this.fetchPokemon.results = [];
    let i = 0;
    for (const line of fetchPokemon.results) {
      if (line.name.match(regex)) {
        i++;
        this.fetchPokemon.results.push(line);
      }
    }

    // Utilisation de la méthode slice pour extraire la sous-liste
    this.fetchPokemon.results = this.fetchPokemon.results.slice(
      this.currentPage * this.limit - this.limit,
      this.currentPage * this.limit
    );
    this.fetchPokemon.count = i;
  }

  private async communFilter() {
    console.log("filter");
    const fetchPokemon: JSONObject = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=${await this.number(
        "pokemon"
      )}`
    ).list();
    const arrayPoke: arrayDefault[][] = [];
    // const namePokemon: string[] = fetchPokemon.results.map((obj) => obj.name);
    arrayPoke.push(fetchPokemon.results);
    // const arrayRoutes: string[] = ["pokemon-species", "pokemon", "pokemon"];
    // const paginPage = this.currentPage > 0 ? this.currentPage - 1 : 0;
    // const offset = paginPage * this.limit;
    const pathname: Segment[] = Routes.getRoutes();

    await Promise.all(
      pathname.map(async (line: Segment) => {
        const routes: string = line.type;
        const value: string = line.value;

        if (routes !== "filter" && value !== "0") {
          const position: number = arrayElemFilter.indexOf(routes);

          if (position !== -1) {
            const apiUrl = `https://pokeapi.co/api/v2/${routes}/${value}`;
            const fetch: arrayDefault[] = await new FetchPokemon(apiUrl).type();
            arrayPoke.push(fetch);
          } else {
            console.error(`Type '${routes}' not found in arrayElem.`);
          }
        }
      })
    );

    const arrayFilter: arrayDefault[] = this.getCommonElements(arrayPoke);
    this.fetchPokemon.count = arrayFilter.length;

    this.fetchPokemon.results = arrayFilter.slice(
      this.currentPage * this.limit - this.limit,
      this.currentPage * this.limit
    );
  }

  private getCommonElements(arrays: arrayDefault[][]): arrayDefault[] {
    if (arrays.length === 0) {
      return [];
    }

    // Utiliser le premier tableau comme base
    const commonElements = arrays[0].filter((element) =>
      arrays.every((array) => array.some((obj) => obj.name === element.name))
    );

    return commonElements;
  }

  private async number(element: string): Promise<number> {
    this.fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/${element}/?offset=1&limit=1`
    ).list();
    return Number(this.fetchPokemon.count);
  }

  // Asynchronous method to fetch and display the list of Pokemon
  public async getListPokemon(): Promise<InnerHTML> {
    if (this.post != "") {
      await this.communSearch();
    } else if (this.filter) {
      await this.communFilter();
    } else {
      await this.communList();
    }
    // Create a PaginationPokemon instance to handle pagination
    const pagination = new PaginationPokemon(this.fetchPokemon.count);
    const pokemon: arrayDefault[] = this.fetchPokemon.results;

    // Create HTML elements for displaying the Pokemon list and pagination
    const navigation: HTMLDivElement = await pagination.getPaginationPokemon();
    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();

    // Append title and pagination to the main HTML display
    htmlDisplay.appendChild(new DocumentCreate().titleDisplay("Pokemon list"));
    htmlDisplay.appendChild(navigation);

    // Create a container for the Pokemon list
    const listDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__list",
    }).div();

    // Iterate over the fetched Pokemon and display them
    let i: number = 0;
    for (let array of pokemon) {
      i++;
      const name = array.name;
      listDisplay.appendChild(displayPokemon(i.toString(), name));
    }

    // Append the Pokemon list to the main HTML display
    htmlDisplay.appendChild(listDisplay);

    // Append pagination again for the bottom part of the list
    const navigation2: HTMLDivElement = await pagination.getPaginationPokemon();
    htmlDisplay.appendChild(navigation2);

    // Return the complete HTML display
    return htmlDisplay;
  }

  // Asynchronous method for loading additional information for each Pokemon
  public async loading(): Promise<void> {
    if (this.post != "") {
      await this.communSearch();
    } else if (this.filter) {
      await this.communFilter();
    } else {
      await this.communList();
    }
    const pokemon: arrayDefault[] = this.fetchPokemon.results;

    // Iterate over the fetched Pokemon to load additional information
    let i: number = 0;
    const id: number[] = [];
    for (let array of pokemon) {
      i++;
      const url = array.url;
      const infoPokemon: JSONpokemon = await new FetchPokemon(url).info();
      const idPoke: number = infoPokemon.id ? infoPokemon.id : 0;
      this.loadingSpecies(idPoke, i);
      // Update the href attribute of the anchor element for Pokemon details
      const app_a: HTMLLinkElement | null = document.querySelector(`#__${i}`);
      if (app_a) {
        app_a.href = `${hostname}/pokemon/${idPoke}#identity`;
      }

      // Update the source attribute of the image element for Pokemon sprite
      const app_img: HTMLImageElement | null = document.querySelector(
        `#__${i} div div img`
      );

      if (app_img) {
        let urlSVG: string | undefined =
          infoPokemon.sprites?.other.dream_world.front_default;
        let urlImg: string = "";

        if (app_img) {
          if (urlSVG != undefined) {
            urlImg = urlSVG;
          } else {
            urlSVG = infoPokemon.sprites!.front_default || undefined;
            urlImg =
              urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;
          }
        }
        app_img.src = urlImg;
        if (urlSVG != undefined) id.push(idPoke);
      }

      // Update the inner HTML of the span element for Pokemon ID
      const app_span: HTMLSpanElement | null = document.querySelector(
        `#__${i} div span`
      );

      if (app_span) {
        const idPokemon: string = "#" + idPoke.toString().padStart(5, "0");
        app_span.innerHTML = idPokemon;
      }
    }
  }

  public async loadingSpecies(id: number, i: number): Promise<void> {
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/`;
    const speciesPokemon: JSONspecies = await new FetchPokemon(
      urlSpecies + id
    ).infoSpecies();
    const app_color: HTMLSpanElement | null = document.querySelector(
      `#__${i} div`
    );

    if (app_color) {
      const color: string = speciesPokemon.color
        ? speciesPokemon.color.name
        : "";
      if (color) app_color.classList.add(color);
    }
  }
}
