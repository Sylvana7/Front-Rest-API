import { getCookie, setCookie } from "typescript-cookie";
import { ListPokemon } from "./ts/controllers/pokemonList";
import { htmlHome } from "./html/pokemonInnerHtml";
import { DisplayIcon } from "./icon";
import "./scss/style.scss";
import { FilterPokemon } from "./ts/services/filter";
import { App } from "./ts/routes/routes";
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

const logoElement = document.querySelector("#logo");
if (logoElement) {
  logoElement.innerHTML = `<a href="${hostname}"><img src="/src/img/poklogo.png"></a>`;
}

document.querySelector("nav")?.appendChild(new DocumentCreate().ul());
const UL = document.querySelector("nav ul");
if (UL) {
  let link = new DocumentCreate().ahref({
    url: hostname,
  });
  let ico = new DocumentCreate({ className: "icon icon_collection" }).span();
  link.appendChild(ico);
  link.innerHTML += "Home";
  let LI = new DocumentCreate().li();
  LI.appendChild(link);
  UL.appendChild(LI);
}

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

divForm!.appendChild(formSearch);

const formFilter: HTMLFormElement = new DocumentCreate({
  className: "pokemon__filter",
}).form({ method: "GET", action: `${hostname}/get/` });

formFilter.appendChild(
  new DocumentCreate().button({
    type: `submit`,
    texte: `<i class="fa fa-search"></i>`,
  })
);

divForm!.appendChild(formFilter);

let result: any = "";

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
