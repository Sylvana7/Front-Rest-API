import { hostname } from "./main";

export async function getPokemonJson(url: string): Promise<any> {
  const container: Response = await fetch(url);
  const pokemon: any = await container.json();
  // console.log(pokemon);
  return Promise.resolve(pokemon);
}

export async function getPokemon(
  list: any,
  page: number,
  limitDisplay: number
): Promise<string> {
  const pokemon = list.results;
  const pageMax: number = Math.ceil(Number(list.count) / limitDisplay);
  const previous: number = page < 1 ? 1 : page - 1;
  const next: number = page > pageMax ? pageMax : page + 1;
  const numPermanent: number = 2;
  const numInter: number = 3;
  const span: string = `<span>...</span>`;

  let navigation: string = "";
  let classNav: string = "";
  if (!list.previous) {
    classNav = "disabled";
  }
  navigation += `<div><h2>Pokemon list</h2></div>`;
  navigation += `<div class='pokemon__pagination'>`;
  navigation += `<a href='http://${hostname}:5173/page/1' class='${classNav}' title='first page'><span class='icon double icon_arrow_sm_left'></span><span class='icon icon_arrow_sm_left'></span></a>`;
  navigation += `<a href='http://${hostname}:5173/page/${previous}' class='${classNav}' title='previous page'><span class='icon icon_arrow_sm_left'></span></a>`;
  // navigation += `<div>`;

  // Ajout des numéros de pages
  for (let i = 1; i <= pageMax; i++) {
    classNav = i === page ? "activate" : "";
    if (page <= numPermanent) {
      if (i <= 5 || i >= pageMax - numPermanent + 1) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (i === 6) {
        navigation += span;
      }
    } else if (page >= pageMax - numPermanent + 1) {
      if (i <= numPermanent || i >= pageMax - 5) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (i === pageMax - 6) {
        navigation += span;
      }
    } else {
      if (i <= numPermanent || i >= pageMax - numPermanent + 1) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (
        i > numPermanent &&
        i < pageMax - numPermanent + 1 &&
        i >= page - Math.ceil(numInter / 2) &&
        i <= page + Math.ceil(numInter / 2)
      ) {
        navigation += `<a href='http://${hostname}:5173/page/${i}' class='${classNav}'>${i}</a>`;
      }
      if (
        (i === numPermanent &&
          page > numPermanent + 1 + Math.ceil(numInter / 2)) ||
        (i === pageMax - numPermanent &&
          page < pageMax - numPermanent - Math.ceil(numInter / 2))
      ) {
        navigation += span;
      }
    }
  }
  // navigation += "</div>";
  classNav = "";
  if (!list.next) {
    classNav = "disabled";
  }
  navigation += `<a href='http://${hostname}:5173/page/${next}' class='${classNav}' title='next page'><span class='icon icon_arrow_sm_right'></span></a>`;
  navigation += `<a href='http://${hostname}:5173/page/${pageMax}' class='${classNav}' title='last page'><span class='icon double icon_arrow_sm_right'></span><span class='icon icon_arrow_sm_right'></span></a>`;
  navigation += "</div>";

  let html: string = navigation;
  html += "<div class='pokemon__list'>";

  for (let array of pokemon) {
    const name = array.name;
    const url = array.url;
    const infoPokemon: any = await getPokemonJson(url);
    const urlSVG: string = infoPokemon.sprites.other.dream_world.front_default;
    const urlImg: string =
      urlSVG != undefined
        ? urlSVG
        : `http://${hostname}:5173/src/img/no_photo.png`;
    const idPokemon: string = "#" + infoPokemon.id.toString().padStart(5, "0");

    html += `
    <a href='http://${hostname}:5173/pokemon/${idPokemon}'>
      <div>
          <h3>${name}</h3>
          <img src=${urlImg}>
          <span>${idPokemon}</span>
      </div>
    </a>
        `;
  }
  html += "</div>";
  html += navigation;
  return html;
}
