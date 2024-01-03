export async function getPokemonJson(url: string): Promise<any> {
  const container: Response = await fetch(url);
  const pokemon: any = await container.json();
  // console.log(pokemon);
  return Promise.resolve(pokemon);
}

export function getPokemon(list: any): string {
  console.log(list);
  const pokemon = list.results;
  const hostname: string = window.location.hostname;
  let html: string = "";

  for (let array of pokemon) {
    const name = array.name;
    const url = array.url;

    const urlImg: string = "";
    const idPokemon: number = 0;

    html += `
    <a href='http://${hostname}:5173/pokemon/1'">
      <div>
          <h3>${name}</h3>
      </div>
    </a>
        `;
  }
  return html;
}
