import { getCookie, setCookie } from "typescript-cookie";
import { ListPokemon } from "./ts/controllers/pokemonList";
import { htmlHome } from "./html/pokemonInnerHtml";
import { DisplayIcon } from "./icon";
import { App } from "./ts/routes/routes";
import { PokemonPage } from "./ts/controllers/pokemonPage";
import { GenerateHtml } from "./ts/controllers/generateHtml";
import { toggleActive } from "./ts/services/functions";
import "./scss/style.scss";

export const hostname: string = window.location.origin;
export const secureCookie: boolean = false;

const app: HTMLDivElement | null = document.querySelector("#app");

if (!getCookie("limit")) {
  setCookie("limit", 20, { expires: 365, secure: secureCookie });
}
if (!getCookie("display")) {
  setCookie("display", "block", { expires: 365, secure: secureCookie });
}
export const arrayElemFilter: string[] = [
  "pokemon-habitat",
  "pokemon-color",
  "type",
  "ability",
];

new GenerateHtml().logo();
new GenerateHtml().nav();
new GenerateHtml().search();
new GenerateHtml().filter();

let result: any = "";

switch (true) {
  case App.routes("icons"): {
    const classe = new DisplayIcon();
    result = classe.displayIcon();
    break;
  }

  case App.routes("getFilter"): {
    const name: string | null = App.transformUrlToString() || "";
    window.location.href = hostname + "/filter/true/" + name;
    break;
  }

  case App.routes("filter"): {
    const pagin = new ListPokemon({ filter: true });
    result = await pagin.getListPokemon();
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
      const pagin = new ListPokemon({ post: name });
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
    const pagin = new ListPokemon({ post: name });
    pagin.loading();
  }
} else if (App.routes("filter")) {
  new ListPokemon({ filter: true }).loading();
} else if (App.routes("page") || App.routes("")) {
  new ListPokemon().loading();
} else if (App.routes("pokemon")) {
  setTimeout(() => {
    document.querySelector(".stat")?.classList.add("active");
  }, 1000);
}

const navOptionsA = document.querySelector("#nav__options a");

navOptionsA?.addEventListener("click", () => {
  toggleActive();
});
