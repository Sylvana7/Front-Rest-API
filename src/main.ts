import { getCookie, setCookie } from "typescript-cookie";
import { ListPokemon } from "./ts/controllers/pokemonList";
import { htmlHome } from "./html/pokemonInnerHtml";
import { DisplayIcon } from "./icon";
import "./scss/style.scss";
import { FilterPokemon } from "./ts/services/filter";
import { App } from "./ts/routes/routes";
import { PokemonPage } from "./ts/controllers/pokemonPage";
import { GenerateHtml } from "./ts/controllers/generateHtml";

export const hostname: string = window.location.origin;
export const secureCookie: boolean = false;

const app: HTMLDivElement | null = document.querySelector("#app");

if (!getCookie("limit")) {
  setCookie("limit", 20, { expires: 365, secure: secureCookie });
}
if (!getCookie("display")) {
  setCookie("display", "block", { expires: 365, secure: secureCookie });
}

new GenerateHtml().logo();
new GenerateHtml().nav();
new GenerateHtml().search();
new GenerateHtml().filter();

let result: any = "";

console.log(window.location.pathname);
console.log(window.location.origin);
console.log(window.location.hash);
console.log(window.location.href);

switch (true) {
  case App.routes("icon"): {
    const classe = new DisplayIcon();
    result = classe.displayIcon();
    break;
  }

  case App.routes("filter"): {
    const pagin = new FilterPokemon();
    result = pagin.filterPokemon();
    break;
  }
  case App.routes("pokemon"): {
    const pagin = new PokemonPage(App.getValue("pokemon"));
    result = await pagin.page();
    break;
  }
  case App.routes("get"): {
    const url = new URL(window.location.href);
    const name: string | null =
      url.searchParams.get("form__search--pokemon") || "";
    window.location.href = hostname + "/search/" + name;

    break;
  }
  case App.routes("search"): {
    const name: string = App.getValue("search");
    if (name) {
      const pagin = new ListPokemon(name);
      result = await pagin.getListPokemon();
    }
    break;
  }
  case App.routes("page"): {
    const pagin = new ListPokemon();
    result = await pagin.getListPokemon();
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

if (App.routes("search")) {
  const name: string | null = App.getValue("search");
  if (name) {
    const pagin = new ListPokemon(name);
    pagin.loading();
  }
} else if (App.routes("page") || App.routes("")) {
  new ListPokemon().loading();
} else if (App.routes("pokemon")) {
  setTimeout(() => {
    document.querySelector(".stat")?.classList.add("active");
  }, 1000);
}
