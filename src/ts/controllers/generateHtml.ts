import { arrayElemFilter, hostname } from "../../main";
import { App } from "../routes/routes";
import { DocumentCreate } from "../services/createElements";
import { FetchPokemon } from "../services/fetch";

export class GenerateHtml {
  public logo() {
    const logoElement = document.querySelector("#logo");
    if (logoElement) {
      logoElement.innerHTML = `<a href="${hostname}"><img src="/src/img/poklogo.png"></a>`;
    }
  }
  public nav() {
    const nav = document.querySelector("nav");
    nav?.classList.add("nav");
    nav?.appendChild(new DocumentCreate().ul());
    const UL = document.querySelector("nav ul");

    if (UL) {
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

      link = new DocumentCreate().ahref({
        url: "javascript:void(0)",
      });
      ico = new DocumentCreate({
        className: "icon icon_search",
      }).span();
      link.appendChild(ico);
      link.innerHTML += "Options";
      // link.setAttribute("onclick", "toggleActive()");
      LI = new DocumentCreate({
        idName: "nav__options",
        className: "nav__options",
      }).li();
      LI.appendChild(link);
      UL.appendChild(LI);
    }
  }
  public search() {
    const form: HTMLDivElement | null = document.querySelector("#formSearch");
    const formSearch: HTMLFormElement = new DocumentCreate({
      className: "pokemon__form__search",
    }).form({ method: "GET", action: `${hostname}/get/` });

    formSearch.appendChild(
      new DocumentCreate().input({
        type: "search",
        placeholder: "Search...",
        name: "form__search--pokemon",
        required: true,
        value: App.getValue("search"),
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

  public async filter() {
    const form: HTMLDivElement | null = document.querySelector("#formSearch");
    const formFilter: HTMLFormElement = new DocumentCreate({
      className: "pokemon__form__filter",
    }).form({ method: "GET", action: `${hostname}/getFilter/` });

    await Promise.all(
      arrayElemFilter.map(async (arrayText) => {
        const selectElement = document.createElement("select");
        selectElement.setAttribute("name", arrayText);
        const url = `https://pokeapi.co/api/v2/${arrayText}?limit=200000`;
        const fetchResult = await new FetchPokemon(url).list();

        const optionElement = document.createElement("option");
        optionElement.value = "0";
        optionElement.text = `--${arrayText.replace(
          "pokemon-color",
          "color"
        )}--`;
        optionElement.classList.add("lablelOption");
        selectElement.appendChild(optionElement);

        await Promise.all(
          fetchResult.results.map(async (optionText) => {
            const optionElement = document.createElement("option");
            optionElement.value = optionText.name;
            optionElement.classList.add(optionText.name);
            optionElement.text = optionText.name;
            optionElement.selected =
              optionText.name === App.getValue(arrayText);
            selectElement.appendChild(optionElement);
          })
        );

        formFilter?.appendChild(selectElement);
      })
    );

    formFilter.appendChild(
      new DocumentCreate().button({
        type: `submit`,
        texte: `<i class="fa fa-search"></i>`,
      })
    );

    form?.appendChild(formFilter);
  }
}
