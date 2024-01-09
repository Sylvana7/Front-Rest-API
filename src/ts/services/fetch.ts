interface Pokemon {
  name: string;
  url: string;
}
interface ability {
  ability: Pokemon;
  is_hidden: boolean;
  slot: number;
}
interface showdown {
  back_default: string;
  front_default: string;
}
interface sprite {
  other: { showdown: showdown };
}

// Déclaration de l'interface JSONObject
export interface JSONObject {
  count: number;
  results: Pokemon[];
}
export interface JSONpokemon {
  forms: Pokemon[];
  abilities?: ability[] | [];
  sprites?: sprite;
}

export class FetchPokemon {
  static ability: string | URL | Request;
  constructor(public readonly url: string) {}

  public async info(): Promise<JSONpokemon> {
    const container: Response = await fetch(this.url);
    if (container.status === 404) {
      return { forms: [] };
    }
    const pokemon = (await container.json()) as JSONpokemon;
    return Promise.resolve(pokemon);
  }

  public async list(): Promise<JSONObject> {
    const container: Response = await fetch(this.url);
    if (container.status === 404) {
      return { count: 0, results: [] };
    }
    const pokemon = (await container.json()) as JSONObject;
    return Promise.resolve(pokemon);
  }
}
