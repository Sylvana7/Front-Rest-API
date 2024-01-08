import { hostname } from "../../main";

export class DocumentCreate {
  private className: string[];
  private idName: string;

  constructor(
    public readonly options: { idName?: string; className?: string } = {}
  ) {
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
  public ahref(
    options: { url?: string; texte?: string; title?: string } = {}
  ): HTMLAnchorElement {
    const { url = "", texte = "" } = options;
    const anchor: HTMLAnchorElement = document.createElement("a");
    anchor.innerHTML = texte;
    anchor.href = url;
    this.addIdClass(anchor);
    return anchor;
  }

  public div(): HTMLDivElement {
    const anchor: HTMLDivElement = document.createElement("div");
    this.addIdClass(anchor);
    return anchor;
  }

  public span(options: { texte?: string } = {}): HTMLElement {
    const { texte = "" } = options;
    const elemSpan: HTMLElement = document.createElement("span");
    elemSpan.innerHTML = texte;
    this.addIdClass(elemSpan);
    return elemSpan;
  }

  public title(options: { h?: string; texte?: string }): HTMLElement {
    const { h = "", texte = "" } = options;
    const isValidHeading = /^h[1-6]$/i.test(h);
    const hn = !isValidHeading ? "h1" : h;
    const title: HTMLElement = document.createElement(hn);
    title.innerHTML = texte;
    this.addIdClass(title);
    return title;
  }

  public form(options: { method?: string; action?: string }): HTMLFormElement {
    const { method = "POST", action = `${hostname}` } = options;
    const methodForm = method != "GET" ? "POST" : "GET;";
    const elemForm: HTMLFormElement = document.createElement("form");
    elemForm.setAttribute("method", methodForm);
    elemForm.setAttribute("action", action);
    this.addIdClass(elemForm);
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
        forName: idName,
        texte: labelValue,
      });

      elemSpan.appendChild(elemLabel);
      elemSpan.appendChild(elemInput);

      elemSpan.appendChild(elemLabel);
      elemSpan.appendChild(elemInput);

      return elemSpan;
    }

    return elemInput;
  }

  public label(options: {
    forName?: string;
    texte?: string;
  }): HTMLLabelElement {
    const { forName = "", texte = "" } = options;
    const label: HTMLLabelElement = document.createElement("label");

    label.innerHTML = texte;
    label.setAttribute("for", forName);
    this.addIdClass(label);

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
    //<button type="submit"><i class="fa fa-search"></i></button>
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
}
