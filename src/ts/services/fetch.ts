interface Pokemon {
  name: string;
  url: string;
}
// Déclaration de l'interface JSONObject
export interface JSONObject {
  count: number;
  results: Pokemon[];
}
export interface JSONpokemon {
  count: number;
  results: JSONObject[];
}

export async function fetchPokemon(url: string): Promise<JSONObject> {
  const container: Response = await fetch(url);
  const pokemon = (await container.json()) as JSONObject;

  return Promise.resolve(pokemon);
}
