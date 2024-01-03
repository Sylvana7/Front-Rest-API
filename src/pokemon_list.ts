export const getPokemonJson = async (url: string): Promise<any> => {
  const container: Response = await fetch(url);
  return await container.json();
};

export function getPokemon(list: any): string {
  const pokemon: any = list.results;
  const hostname: string = window.location.hostname;
  let html: string = "";

  for (let array of pokemon) {
    const name = array.name;
    const url = array.url;

    html += `
    <a href=${hostname} + "/pokemon/1">
      <div>
          <h3>${name}</h3>
      </div>
    </a>
        `;
  }
  return html;
}
