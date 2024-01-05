import { getCookie } from "typescript-cookie";

export class Pagination {
  private readonly limit: number = Number(getCookie("limit"));
  private readonly pageMax: number;
  private readonly span: string = `<span>...</span>`;

  constructor(
    public readonly numElement: number,
    public readonly currentPage: number,
    public readonly numPermanent: number = 2,
    public readonly numInter: number = 3
  ) {
    this.pageMax = Math.ceil(Number(numElement) / this.limit);
  }

  public nextPage(): number {
    if (this.currentPage > 1) {
      return this.currentPage + 1;
    }
    return 1;
  }
  public previousPage(): number {
    if (this.currentPage < this.pageCount()) {
      return this.currentPage - 1;
    }
    return this.pageCount();
  }

  public pageCount(): number {
    return Math.ceil(Number(this.numElement) / this.limit);
  }

  public getDisplay(
    firstPage: string,
    previousPage: string,
    numPage: string,
    nextPage: string,
    lastPage: string
  ): string {
    let navigationHtml: string = "";
    let classNav: string = "";

    navigationHtml += "<div class='pokemon__pagination'>";

    classNav = this.currentPage <= 1 ? "disabled" : "";

    navigationHtml += firstPage.replace("$classNav", classNav);

    navigationHtml += previousPage
      .replace("$num", this.previousPage().toString())
      .replace("$classNav", classNav);

    navigationHtml += this.nav(numPage);

    classNav = this.currentPage >= this.pageMax ? "disabled" : "";

    navigationHtml += nextPage
      .replace("$num", this.nextPage().toString())
      .replace("$classNav", classNav);

    navigationHtml += lastPage
      .replace("$num", this.pageCount().toString())
      .replace("$classNav", classNav);

    navigationHtml += "</div>";

    return navigationHtml;
  }

  private nav(numPage: string): string {
    let navigation: string = "";
    let classNav: string = "";
    for (let i = 1; i <= this.pageMax; i++) {
      classNav = i === this.currentPage ? "activate" : "";
      if (this.currentPage <= this.numPermanent) {
        if (i <= 5 || i >= this.pageMax - this.numPermanent + 1) {
          navigation += numPage
            .replaceAll("$num", i.toString())
            .replace("$classNav", classNav);
        }
        if (i === 6) {
          navigation += this.span;
        }
      } else if (this.currentPage >= this.pageMax - this.numPermanent + 1) {
        if (i <= this.numPermanent || i >= this.pageMax - 5) {
          navigation += numPage
            .replaceAll("$num", i.toString())
            .replace("$classNav", classNav);
        }
        if (i === this.pageMax - 6) {
          navigation += this.span;
        }
      } else {
        if (
          i <= this.numPermanent ||
          i >= this.pageMax - this.numPermanent + 1
        ) {
          navigation += numPage
            .replaceAll("$num", i.toString())
            .replace("$classNav", classNav);
        }
        if (
          i > this.numPermanent &&
          i < this.pageMax - this.numPermanent + 1 &&
          i >= this.currentPage - Math.ceil(this.numInter / 2) &&
          i <= this.currentPage + Math.ceil(this.numInter / 2)
        ) {
          navigation += numPage
            .replaceAll("$num", i.toString())
            .replace("$classNav", classNav);
        }
        if (
          (i === this.numPermanent &&
            this.currentPage >
              this.numPermanent + 1 + Math.ceil(this.numInter / 2)) ||
          (i === this.pageMax - this.numPermanent &&
            this.currentPage <
              this.pageMax - this.numPermanent - Math.ceil(this.numInter / 2))
        ) {
          navigation += this.span;
        }
      }
    }
    return navigation;
  }
}
