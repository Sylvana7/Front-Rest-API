import { getCookie, setCookie } from "typescript-cookie";
import { App } from "./ts/routes/app";
import { ListPokemon } from "./ts/controllers/pokemonList";
import { SearchPokemon } from "./ts/controllers/pokemonSearch";
import { htmlHome } from "./html/pokemonInnerHtml";
import { DisplayIcon } from "./icon";
import "./scss/style.scss";
import { Routes } from "./ts/routes/routes";

export const hostname: string = window.location.origin;
const app = document.querySelector("#app");
export const secureCookie: boolean = false;

if (!getCookie("limit")) {
  setCookie("limit", 20, { expires: 365, secure: secureCookie });
}
if (!getCookie("display")) {
  setCookie("display", "block", { expires: 365, secure: secureCookie });
}

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
  case App.get("get"): {
    const url = new URL(window.location.href);
    const name: string | null = url.searchParams.get("pokemon") || "";
    console.log("get");
    // const redirect = (url: string, asLink = true) =>
    //   asLink ? (window.location.href = url) : window.location.replace(url);
    // redirect(hostname + "/search/" + name, false);
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

if (result && result.innerHTML) {
  app!.appendChild(result);
} else {
  app!.innerHTML = htmlHome(result);
}
