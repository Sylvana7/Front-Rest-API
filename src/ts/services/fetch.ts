export interface arrayDefault {
  name: string;
  url: string;
}
export interface ability {
  ability: arrayDefault;
  is_hidden: boolean;
  slot: number;
}

export interface showdown {
  back_default: string;
  front_default: string;
}
export interface sprite {
  other: { showdown: showdown; dream_world: showdown };
}

export interface type {
  slot: number;
  type: arrayDefault;
}

export interface stat {
  base_stat: number;
  effort: number;
  stat: arrayDefault;
  percentage?: number;
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
  stats?: stat[] | [];
  id?: number;
}

export interface JSONspecies {
  color?: arrayDefault;
  habitat?: arrayDefault;
  gender_rate?: number;
  capture_rate?: number;
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
  public async infoSpecies(): Promise<JSONspecies> {
    const container: Response = await fetch(this.url);
    if (container.status === 404) {
      return {};
    }
    const pokemon = (await container.json()) as JSONspecies;
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
