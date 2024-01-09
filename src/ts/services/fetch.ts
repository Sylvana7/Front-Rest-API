interface arrayDefault {
  name: string;
  url: string;
}
interface ability {
  ability: arrayDefault;
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

interface type {
  slot: number;
  type: arrayDefault;
}

// Déclaration de l'interface JSONObject
export interface JSONObject {
  count: number;
  results: arrayDefault[];
}
export interface JSONpokemon {
  forms?: arrayDefault[] | [];
  abilities?: ability[] | [];
  sprites?: sprite;
  weight?: number;
  height?: number;
  types?: type[] | [];
}

export class FetchPokemon {
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
