import { hostname } from "../../main";
import { DocumentCreate } from "../services/createElements";

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
    }).form({ method: "GET", action: `${hostname}/get/` });

    formFilter.appendChild(
      new DocumentCreate().button({
        type: `submit`,
        texte: `<i class="fa fa-search"></i>`,
      })
    );

    form?.appendChild(formFilter);
  }
}
