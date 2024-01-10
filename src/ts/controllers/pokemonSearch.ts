import { FetchPokemon, JSONObject } from "../services/fetch";
import { hostname } from "../../main";
import { displayPokemon } from "../services/pokemonsDisplay";
import { DocumentCreate } from "../services/createElements";

export class SearchPokemon {
  private fetchPokemon: JSONObject = { count: 0, results: [] };
  private search: JSONObject = { count: 0, results: [] };

  constructor(public readonly post: string) {}

  private async number(): Promise<number> {
    this.fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1`
    ).list();
    return Number(this.fetchPokemon.count);
  }

  private async commun() {
    this.fetchPokemon = await new FetchPokemon(
      `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=${await this.number()}`
    ).list();
    let regexPost: string = this.post;
    regexPost = regexPost.startsWith("*")
      ? regexPost.replace(/[^*]/, "")
      : "^" + regexPost;
    regexPost = regexPost.endsWith("*")
      ? regexPost.replace(/[*$]/, "")
      : regexPost + "$";

    const regex = new RegExp(regexPost);
    console.log(regex);

    let i = 0;
    for (const line of this.fetchPokemon.results) {
      if (line.name.match(regex)) {
        i++;
        this.search.results.push(line);
      }
    }
    this.search.count = i;
  }

  public async getSearchPokemon(): Promise<InnerHTML> {
    await this.commun();
    const htmlDisplay: HTMLDivElement = new DocumentCreate().div();

    // Append title and pagination to the main HTML display
    htmlDisplay.appendChild(
      new DocumentCreate().titleDisplay("Pokemon Search")
    );

    const listDisplay: HTMLDivElement = new DocumentCreate({
      className: "pokemon__list",
    }).div();

    let i = 0;
    for (let array of this.search.results) {
      i++;
      const name: string = array.name;
      listDisplay.appendChild(displayPokemon(i.toString(), name));
    }
    htmlDisplay.appendChild(listDisplay);
    return htmlDisplay;
  }

  // Asynchronous method for loading additional information for each Pokemon
  public async loading(): Promise<void> {
    await this.commun();
    // Retrieve the limit value from the cookie
    let i = 0;
    for (let array of this.search.results) {
      i++;
      const url = array.url;
      const infoPokemon: any = await new FetchPokemon(url).list();
      const idPoke: string = infoPokemon.id.toString();

      // Update the href attribute of the anchor element for Pokemon details
      const app_a: HTMLLinkElement | null = document.querySelector(`#__${i}`);
      if (app_a) {
        app_a.href = `${hostname}/pokemon/${idPoke}`;
      }

      // Update the source attribute of the image element for Pokemon sprite
      const app_img: HTMLImageElement | null = document.querySelector(
        `#__${i} div div img`
      );

      if (app_img) {
        const urlSVG: string =
          infoPokemon.sprites.other.dream_world.front_default;

        const urlImg: string =
          urlSVG != undefined ? urlSVG : `${hostname}/src/img/no_photo.png`;

        app_img.src = urlImg;
      }

      // Update the inner HTML of the span element for Pokemon ID
      const app_span: HTMLSpanElement | null = document.querySelector(
        `#__${i} div span`
      );

      if (app_span) {
        const idPokemon: string = "#" + idPoke.padStart(5, "0");
        app_span.innerHTML = idPokemon;
      }
    }
  }
}
