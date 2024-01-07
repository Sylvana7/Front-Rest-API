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
        console.log(line);
        element.classList.add(line);
      }
    }
    if (this.idName != "") {
      element.setAttribute("id", this.idName);
    }
  }
  public ahref(
    options: { url?: string; text?: string; title?: string } = {}
  ): HTMLAnchorElement {
    const { url = "", text = "" } = options;
    const anchor: HTMLAnchorElement = document.createElement("a");
    const link: Text = document.createTextNode(text);
    anchor.appendChild(link);
    anchor.href = url;
    this.addIdClass(anchor);
    return anchor;
  }

  public div(): HTMLDivElement {
    const anchor: HTMLDivElement = document.createElement("div");
    this.addIdClass(anchor);
    return anchor;
  }

  public span(options: { text?: string }): HTMLElement {
    const { text = "" } = options;
    const elemSpan: HTMLElement = document.createElement("span");
    const link: Text = document.createTextNode(text);
    elemSpan.appendChild(link);
    this.addIdClass(elemSpan);
    return elemSpan;
  }

  public title(options: { h?: string; text?: string }): HTMLElement {
    const { h = "", text = "" } = options;
    const isValidHeading = /^h[1-6]$/i.test(h);
    const hn = !isValidHeading ? "h1" : h;
    const title: HTMLElement = document.createElement(hn);
    const link: Text = document.createTextNode(text);
    title.appendChild(link);
    this.addIdClass(title);
    return title;
  }

  public form(options: { method: string; action: string }): HTMLFormElement {
    const { method = "POST", action = `${hostname}` } = options;
    const methodForm = method != "GET" ? "POST" : "GET;";
    const elemForm: HTMLFormElement = document.createElement("form");
    elemForm.setAttribute("method", methodForm);
    elemForm.setAttribute("action", action);
    this.addIdClass(elemForm);
    return elemForm;
  }
}
