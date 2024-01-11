import { hostname } from "../../main";

type Options = {
  idName?: string;
  className?: string;
};

export type ElemOptions = {
  url?: string;
  h?: string;
  texte?: string;
  addElem?: HTMLElement;
  method?: string;
};

export class DocumentCreate {
  private className: string[];
  private idName: string;

  constructor(public readonly options: Options = {}) {
    const { className = "", idName = "" } = this.options;
    this.className = className != "" ? className.split(" ") : [];
    this.idName = idName;
  }

  private addIdClass(element: HTMLElement) {
    if (this.className.length > 0) {
      for (const line of this.className) {
        element.classList.add(line);
      }
    }
    if (this.idName != "") {
      element.setAttribute("id", this.idName);
    }
  }

  private createElement<T extends HTMLElement>(
    tagName: string,
    options?: ElemOptions & Record<string, any>
  ): T {
    const elem: T = document.createElement(tagName) as T;
    this.addIdClass(elem);

    if (options) {
      const { texte, addElem, ...rest } = options;
      if (addElem) {
        elem.appendChild(addElem);
      }
      if (texte) {
        elem.innerHTML += texte;
      }
      for (const key in rest) {
        if (rest.hasOwnProperty(key)) {
          elem.setAttribute(key, rest[key]);
        }
      }
    }

    return elem;
  }

  public ahref(options: ElemOptions & Record<string, any>): HTMLAnchorElement {
    const { url = "" } = options;
    const anchor: HTMLAnchorElement = this.createElement("a", options);
    anchor.href = url;
    return anchor;
  }

  public div(options?: ElemOptions & Record<string, any>): HTMLDivElement {
    const div: HTMLDivElement = this.createElement("div", options);
    return div;
  }

  public span(options?: ElemOptions & Record<string, any>): HTMLSpanElement {
    const span: HTMLSpanElement = this.createElement("span", options);
    return span;
  }

  public title(options: ElemOptions & Record<string, any>): HTMLElement {
    const { h = "" } = options;
    const isValidHeading = /^h[1-6]$/i.test(h);
    const hn = !isValidHeading ? "h1" : h;
    const title: HTMLElement = this.createElement(hn, options);
    return title;
  }

  public form(options: ElemOptions & Record<string, any>): HTMLFormElement {
    const { method = "POST" } = options;
    const methodForm = method !== "GET" ? "POST" : "GET";
    const updatedOptions: ElemOptions & Record<string, any> = {
      ...options,
      method: methodForm,
    };
    const elemForm: HTMLFormElement = this.createElement(
      "form",
      updatedOptions
    );
    return elemForm;
  }

  public input(
    options: {
      type?: string;
      placeholder?: string;
      name?: string;
      required?: boolean;
      value?: string;
      label?: boolean;
      labelValue?: string;
      labelPosition?: string;
    } = {}
  ): HTMLInputElement | HTMLSpanElement {
    const {
      type = "",
      placeholder = "",
      name = "",
      required = false,
      value = "",
      label = false,
      labelValue = "Label",
      labelPosition = "after",
    } = options;
    const arrayType: string[] = [
      "button",
      "checkbox",
      "color",
      "date",
      "datetime-local",
      "email",
      "file",
      "hidden",
      "image",
      "month",
      "number",
      "password",
      "radio",
      "range",
      "reset",
      "search",
      "submit",
      "tel",
      "text",
      "time",
      "url",
      "week",
    ];

    let idName: string = this.idName;
    this.idName = "";

    let className: string[] = this.className || [];
    this.className = [];

    const elemInput: HTMLInputElement = document.createElement("input");
    elemInput.type = arrayType.includes(type) ? type : "text";
    this.idName = label ? name : idName;
    this.addIdClass(elemInput);

    if (placeholder) elemInput.placeholder = placeholder;
    elemInput.required = required;
    if (name) elemInput.setAttribute("name", name);
    if (value) elemInput.setAttribute("value", value);

    if (label) {
      this.idName = idName;
      this.className = className;
      const elemSpan: HTMLSpanElement = this.span();

      this.idName = "";
      this.className = [
        "formm__label--" + (labelPosition === "after" ? "after" : "before"),
      ];
      const elemLabel: HTMLLabelElement = this.label({
        texte: labelValue,
        for: idName,
      });

      elemSpan.appendChild(elemLabel);
      elemSpan.appendChild(elemInput);

      elemSpan.appendChild(elemLabel);
      elemSpan.appendChild(elemInput);

      return elemSpan;
    }

    return elemInput;
  }

  public label(options: ElemOptions & Record<string, any>): HTMLLabelElement {
    const label: HTMLLabelElement = this.createElement("form", options);
    return label;
  }

  public button(options: {
    type?: "submit" | "reset" | "button";
    texte?: string;
  }): HTMLButtonElement {
    const { type = "button", texte = "" } = options;
    const arrayType: string[] = ["button", "submit", "reset"];

    const buttonElem: HTMLButtonElement = document.createElement("button");
    this.addIdClass(buttonElem);
    buttonElem.type = arrayType.includes(type) ? type : "button";

    buttonElem.innerHTML = texte;
    return buttonElem;
  }

  public element(options: { element?: string; texte?: string }): HTMLElement {
    const { element = "i", texte = "" } = options;
    const elem: HTMLElement = document.createElement(element);
    elem.innerHTML = texte;
    this.addIdClass(elem);
    return elem;
  }

  public img(options: {
    src?: string;
    alt?: string;
    name?: string;
  }): HTMLImageElement {
    const { src = hostname, alt = "", name = "" } = options;
    const img: HTMLImageElement = document.createElement("img");
    img.src = src;
    img.title = name;
    img.alt = alt;
    return img;
  }

  // Create Title
  public titleDisplay(title: string): HTMLDivElement {
    const titleDisplay: HTMLDivElement = new DocumentCreate({
      className: "title",
    }).div();

    for (let i = 0; i < 2; i++) {
      const h1Div: HTMLDivElement = new DocumentCreate().div();
      h1Div.appendChild(new DocumentCreate().title({ h: "h1", texte: title }));
      titleDisplay.appendChild(h1Div);
    }
    return titleDisplay;
  }

  public ul(): HTMLUListElement {
    const label: HTMLUListElement = document.createElement("ul");
    this.addIdClass(label);
    return label;
  }
  public li(options: { texte?: string } = {}): HTMLLIElement {
    const { texte = "" } = options;
    const label: HTMLLIElement = document.createElement("li");
    this.addIdClass(label);
    label.innerHTML = texte;
    return label;
  }
}

// const linkOptions: ElemOptions & Record<string, any> = {
//   url: "https://www.example.com",
//   texte: "Cliquez ici",
//   "title": "Bonjour",
//   "data-lien": "mon-lien",
// };

/* example:


const myLink: HTMLAnchorElement = new DocumentCreate({idName: "myId"}).ahref(linkOptions);
or
const myLink: HTMLAnchorElement = new DocumentCreate({className: "myClass myOtherClass"}).ahref(linkOptions);
or
const myLink: HTMLAnchorElement = new DocumentCreate({}).ahref(linkOptions);
*/
