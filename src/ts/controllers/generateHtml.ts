// import { Types } from "typescript-cookie";
import { hostname } from "../../main";
import { DocumentCreate } from "../services/createElements";
import { FetchPokemon, JSONObject } from "../services/fetch";
// import { JSONObject, ability, type } from "../services/fetch";
// import { types } from "util";

export class GenerateHtml {
  public logo() {
    const logoElement = document.querySelector("#logo");
    if (logoElement) {
      logoElement.innerHTML = `<a href="${hostname}"><img src="/src/img/poklogo.png"></a>`;
    }
  }
  public nav() {
    document.querySelector("nav")?.appendChild(new DocumentCreate().ul());
    const UL = document.querySelector("nav ul");
    console.log("nav");

    if (UL) {
      console.log("UL");
      let link = new DocumentCreate().ahref({
        url: hostname,
      });
      let ico = new DocumentCreate({
        className: "icon icon_collection",
      }).span();
      link.appendChild(ico);
      link.innerHTML += "Home";
      let LI = new DocumentCreate().li();
      LI.appendChild(link);
      UL.appendChild(LI);
    }
  }
  public search() {
    const form: HTMLDivElement | null = document.querySelector("#formSearch");
    const formSearch: HTMLFormElement = new DocumentCreate({
      className: "pokemon__search",
    }).form({ method: "GET", action: `${hostname}/get/` });

    formSearch.appendChild(
      new DocumentCreate().input({
        type: "search",
        placeholder: "Search...",
        name: "form__search--pokemon",
        required: true,
      })
    );

    formSearch.appendChild(
      new DocumentCreate().button({
        type: `submit`,
        texte: `<i class="fa fa-search"></i>`,
      })
    );
    form?.appendChild(formSearch);
  }
  public filter() {
    const form: HTMLDivElement | null = document.querySelector("#formSearch");
    const formFilter: HTMLFormElement = new DocumentCreate({
      className: "pokemon__filter",
    }).form({ method: "GET", action: `${hostname}/getFilter/` });

    const arrayOfOptions = ["pokemon-color", "ability", "type"];
    arrayOfOptions.forEach(async (arrayText) => {
      const selectElement = document.createElement("select");
      selectElement.setAttribute(
        "name",
        arrayText.replace("pokemon-color", "color")
      );
      const url = `https://pokeapi.co/api/v2/${arrayText}`;
      const fetch: JSONObject = await new FetchPokemon(url).list();
      const optionElement = document.createElement("option");
      optionElement.value = "0";
      optionElement.text = `--${arrayText.replace("pokemon-color", "color")}--`;
      selectElement.appendChild(optionElement);
      fetch.results.forEach(async (optionText) => {
        const optionElement = document.createElement("option");
        optionElement.value = optionText.name;
        optionElement.text = optionText.name;
        selectElement.appendChild(optionElement);
      });
      formFilter?.appendChild(selectElement);
    });

    formFilter.appendChild(
      new DocumentCreate().button({
        type: `submit`,
        texte: `<i class="fa fa-search"></i>`,
      })
    );

    form?.appendChild(formFilter);
  }
}
