import { getCookie } from "typescript-cookie";
import { DocumentCreate } from "./createElements";
import { hostname } from "../../main";

export class Pagination {
  private classNav: string = "";
  private url: string;
  private numberElements: number;
  private currentPage: number;
  private numberPermanent: number;
  private numberMiddle: number;
  private readonly limit: number = Number(getCookie("limit"));
  private readonly span: HTMLElement = new DocumentCreate({}).span({
    text: "...",
  });

  constructor(
    private readonly options: {
      url: string;
      numberElements: number;
      currentPage: number;
      numberPermanent?: number;
      numberMiddle?: number;
    }
  ) {
    const {
      url = `${hostname}/page/$num`,
      numberElements = 0,
      currentPage = 0,
      numberPermanent = 2,
      numberMiddle = 3,
    } = options;
    this.url = url;
    this.numberElements = numberElements;
    this.currentPage = currentPage;
    this.numberPermanent = numberPermanent;
    this.numberMiddle = numberMiddle;
  }

  public getNextPage(): number {
    return this.currentPage > 1 ? this.currentPage + 1 : 1;
  }
  public getPreviousPage(): number {
    return this.currentPage < this.pageCount()
      ? this.currentPage - 1
      : this.pageCount();
  }

  public pageCount(): number {
    return Math.ceil(Number(this.numberElements) / this.limit);
  }

  public getDisplay(otherClass: string = ""): HTMLDivElement {
    let navigationHtml: HTMLDivElement = new DocumentCreate({
      className: otherClass + (otherClass != "" ? " " : "") + "pagination",
    }).div();

    this.classNav = this.currentPage <= 1 ? "disabled" : "";

    navigationHtml.appendChild(this.endsPagination({ elem: "first" }));
    navigationHtml.appendChild(this.endsPagination({ elem: "previous" }));

    this.nav(navigationHtml);

    this.classNav = this.currentPage >= this.pageCount() ? "disabled" : "";

    navigationHtml.appendChild(this.endsPagination({ elem: "next" }));
    navigationHtml.appendChild(this.endsPagination({ elem: "last" }));

    return navigationHtml;
  }

  public endsPagination(options: { elem: string }): HTMLAnchorElement {
    const { elem = "" } = options;
    const arrayElem: string[] = ["first", "previous", "next", "last"];
    const numPage: number[] = [
      1,
      this.getPreviousPage(),
      this.getNextPage(),
      this.pageCount(),
    ];
    const displayNumberPage: number = numPage[arrayElem.indexOf(elem)];
    const j: number = elem === ("previous" || "next") ? 1 : 2;
    let double: string = elem === ("previous" || "next") ? "" : "double ";
    const sens: string = elem === ("previous" || "first") ? "left" : "right";

    const anchor: HTMLAnchorElement = new DocumentCreate({
      className: this.classNav,
    }).ahref({
      url: this.url.replaceAll("$num", displayNumberPage.toString()),
      title: arrayElem.includes(elem) ? elem + " " : "" + "page",
    });

    for (let i = 0; i < j; i++) {
      anchor.appendChild(
        new DocumentCreate({
          className: `icon ${double}icon_arrow_sm_${sens}`,
        }).span({})
      );
    }

    return anchor;
  }

  private nav(navigationHtml: HTMLDivElement): void {
    for (let i = 1; i <= this.pageCount(); i++) {
      let numPage: number = 0;
      let classNav: string = "";
      let spanMiddle: boolean = false;

      classNav = i === this.currentPage ? "activate" : "";
      if (this.currentPage <= this.numberPermanent) {
        if (i <= 5 || i >= this.pageCount() - this.numberPermanent + 1) {
          numPage = i;
        }
        if (i === 6) {
          spanMiddle = true;
          // navigation += this.span;
        }
      } else if (
        this.currentPage >=
        this.pageCount() - this.numberPermanent + 1
      ) {
        if (i <= this.numberPermanent || i >= this.pageCount() - 5) {
          numPage = i;
        }
        if (i === this.pageCount() - 6) {
          spanMiddle = true;
          // navigation += this.span;
        }
      } else {
        if (
          i <= this.numberPermanent ||
          i >= this.pageCount() - this.numberPermanent + 1
        ) {
          numPage = i;
        }
        if (
          i > this.numberPermanent &&
          i < this.pageCount() - this.numberPermanent + 1 &&
          i >= this.currentPage - Math.ceil(this.numberMiddle / 2) &&
          i <= this.currentPage + Math.ceil(this.numberMiddle / 2)
        ) {
          numPage = i;
        }
        if (
          (i === this.numberPermanent &&
            this.currentPage >
              this.numberPermanent + 1 + Math.ceil(this.numberMiddle / 2)) ||
          (i === this.pageCount() - this.numberPermanent &&
            this.currentPage <
              this.pageCount() -
                this.numberPermanent -
                Math.ceil(this.numberMiddle / 2))
        ) {
          spanMiddle = true;
          // navigation += this.span;
        }
      }
      if (numPage > 0) {
        const element: HTMLAnchorElement = new DocumentCreate({
          className: classNav,
        }).ahref({
          url: this.url.replaceAll("$num", numPage.toString()),
          title: "page " + numPage,
          text: numPage.toString(),
        });
        navigationHtml.appendChild(element);
      }
      if (spanMiddle) {
        navigationHtml.appendChild(this.span);
      }
    }
  }
}
