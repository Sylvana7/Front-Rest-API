import { getCookie, setCookie } from "typescript-cookie";
import { App } from "./ts/routes/app";
import { ListPokemon } from "./ts/controllers/pokemonList";
import { SearchPokemon } from "./ts/controllers/pokemonSearch";
import { htmlHome } from "./html/pokemonInnerHtml";
import { DisplayIcon } from "./icon";
import "./scss/style.scss";
import { FilterPokemon } from "./ts/services/filter";
import { Routes } from "./ts/routes/routes";
import { PokemonPage } from "./ts/controllers/pokemonPage";
import { DocumentCreate } from "./ts/services/createElements";

export const hostname: string = window.location.origin;
const app: HTMLDivElement | null = document.querySelector("#app");
const divForm: HTMLDivElement | null = document.querySelector("#formSearch");
export const secureCookie: boolean = false;

if (!getCookie("limit")) {
  setCookie("limit", 20, { expires: 365, secure: secureCookie });
}
if (!getCookie("display")) {
  setCookie("display", "block", { expires: 365, secure: secureCookie });
}

const form: HTMLFormElement = new DocumentCreate({
  className: "pokemon__search",
}).form({ method: "GET", action: `${hostname}/get/` });

form.appendChild(
  new DocumentCreate().input({
    placeholder: "Search...",
    name: "form__search--pokemon",
    required: true,
  })
);

form.appendChild(
  new DocumentCreate().button({
    type: `submit`,
    texte: `<i class="fa fa-search"></i>`,
  })
);

divForm!.appendChild(form);

let result: any = "";

switch (true) {
  case App.get("icon"): {
    const classe = new DisplayIcon();
    result = classe.displayIcon();
    break;
  }
  case App.get("page"): {
    const pagin = new ListPokemon();
    result = await pagin.getListPokemon();
    break;
  }
  case App.get("filter"): {
    const pagin = new FilterPokemon();
    result = pagin.filterPokemon();
    break;
  }
  case App.get("pokemon"): {
    const pagin = new PokemonPage(Routes.getNumPage());
    result = await pagin.page();
    break;
  }
  case App.get("get"): {
    const url = new URL(window.location.href);
    const name: string | null =
      url.searchParams.get("form__search--pokemon") || "";
    window.location.href = hostname + "/search/" + name;

    break;
  }
  case App.get("search"): {
    const name: string = Routes.getSearch();
    const pagin = new SearchPokemon(name);
    result = await pagin.getSearchPokemon();
    // console.log(result);
    break;
  }
  default: {
    const pagin = new ListPokemon();
    result = await pagin.getListPokemon();
    break;
  }
}

app!.innerHTML = "";
if (result && result.innerHTML) {
  app!.appendChild(result);
} else {
  app!.innerHTML = htmlHome(result);
}

if (App.get("page") || App.get("")) {
  await new ListPokemon().loading();
}
if (App.get("search")) {
  const name: string = Routes.getSearch();
  const pagin = new SearchPokemon(name);
  await pagin.loading();
}
