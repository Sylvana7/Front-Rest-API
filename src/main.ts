import { getCookie, setCookie } from "typescript-cookie";
import { App } from "./ts/routes/app";
import { ListPokemon } from "./ts/routes/pokemonList";
import { htmlHome } from "./html/pokemonList";
import { DisplayIcon } from "./icon";
import "./scss/style.scss";

export const hostname: string = "http://" + window.location.hostname + ":5173";
const app = document.querySelector<HTMLDivElement>("#app");
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
  default: {
    const pagin = new ListPokemon();
    result = await pagin.getListPokemon();
    break;
  }
}
app!.innerHTML = htmlHome(result);
