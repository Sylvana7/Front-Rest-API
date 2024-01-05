import { hostname } from "../../main";

export class Form {
  private display: HTMLFormElement = document.createElement("form");
  constructor(public readonly method: string) {}

  public getSearch(
    type: string,
    placeholder: string,
    name: string,
    textButton: string
  ): HTMLFormElement {
    this.display.classList.add("pokemon__search");
    this.display.method = this.method === "GET" ? "GET" : "POST";
    this.display.action = `${hostname}/get/`;
    this.display.innerHTML += `
       <input type='${type}' placeholder='${placeholder}' name='${name}' required>
       <button type='submit'>${textButton}</button>`;
    return this.display;
  }
}
