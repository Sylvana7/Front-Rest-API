export function strUcFirst(a: string): string {
  return (a + "").charAt(0).toUpperCase() + (a + "").substr(1);
}

export class DocumentCreate {
  constructor(
    public readonly options: { idName?: string; className?: string } = {}
  ) {}
  private addIdClass(element: HTMLElement) {
    const { className = "", idName = "" } = this.options;
    if (className != "") {
      element.classList.add(className);
    }
    if (idName != "") {
      element.setAttribute("id", idName);
    }
  }
  public ahref(url: string, text: string): HTMLAnchorElement {
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

  public title(hn: string, text: string): HTMLElement {
    const isValidHeading = /^h[1-6]$/i.test(hn);
    hn = !isValidHeading ? "h1" : hn;
    const anchor: HTMLElement = document.createElement(hn);
    const link: Text = document.createTextNode(text);
    anchor.appendChild(link);
    this.addIdClass(anchor);
    return anchor;
  }
}
