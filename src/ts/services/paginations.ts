import { getCookie } from "typescript-cookie";
import { DocumentCreate } from "./createElements";
import { hostname } from "../../main";

// Pagination class for creating a pagination component
export class Pagination {
  private classNav: string = ""; // CSS class for navigation
  private url: string; // Base URL for pagination links
  private numberElements: number; // Total number of elements to paginate
  private currentPage: number; // Current active page
  private numberPermanent: number; // Number of permanent pagination links
  private numberMiddle: number; // Number of middle pagination links
  private readonly limit: number = Number(getCookie("limit")); // Number of elements per page
  private readonly span: HTMLElement = new DocumentCreate({}).span({
    texte: "...",
  }); // Ellipsis element for pagination

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
      numberPermanent = 3,
      numberMiddle = 2,
    } = options;
    this.url = url;
    this.numberElements = numberElements;
    this.currentPage = currentPage;
    this.numberPermanent = numberPermanent;
    this.numberMiddle = numberMiddle * 2;
  }

  // Get the next page number
  public getNextPage(): number {
    return this.currentPage > 1 ? this.currentPage + 1 : 1;
  }

  // Get the previous page number
  public getPreviousPage(): number {
    return this.currentPage < this.pageCount()
      ? this.currentPage - 1
      : this.pageCount();
  }

  // Calculate the total number of pages
  public pageCount(): number {
    return Math.ceil(Number(this.numberElements) / this.limit);
  }

  // Get the HTML representation of the pagination component
  /**
   * Generate and return the HTML representation of the pagination component.
   * @param otherClass - Additional CSS class to be applied.
   * @returns HTMLDivElement representing the pagination component.
   */
  public getDisplay(otherClass: string = ""): HTMLDivElement {
    // Concatenate the given class with "pagination" or use "pagination" if no class is provided
    const paginationClass = otherClass
      ? `${otherClass} pagination`
      : "pagination";

    // Create a new div element with the specified class
    const navigationHtml: HTMLDivElement = new DocumentCreate({
      className: paginationClass,
    }).div();

    // Set the navigation class based on the current page
    this.classNav = this.currentPage <= 1 ? "disabled" : "";

    // Append first and previous pagination links
    navigationHtml.appendChild(this.endsPagination({ elem: "first" }));
    navigationHtml.appendChild(this.endsPagination({ elem: "previous" }));

    // Generate and append middle pagination links
    this.nav(navigationHtml);

    // Set the navigation class based on the current page for the next and last pagination links
    this.classNav = this.currentPage >= this.pageCount() ? "disabled" : "";

    // Append next and last pagination links
    navigationHtml.appendChild(this.endsPagination({ elem: "next" }));
    navigationHtml.appendChild(this.endsPagination({ elem: "last" }));

    // Return the HTML representation of the pagination component
    return navigationHtml;
  }

  /**
   * Generates HTML anchor element for pagination ends (first, previous, next, last).
   * @param options - Object with the 'elem' property specifying the pagination element.
   * @returns HTMLAnchorElement representing the pagination link.
   */
  public endsPagination(options: { elem: string }): HTMLAnchorElement {
    const { elem = "" } = options;

    // Define the order of pagination elements and their corresponding page numbers
    const arrayElem: string[] = ["first", "previous", "next", "last"];
    const numPage: number[] = [
      1,
      this.getPreviousPage(),
      this.getNextPage(),
      this.pageCount(),
    ];

    // Determine the page number to display based on the provided pagination element
    const displayNumberPage: number = numPage[arrayElem.indexOf(elem)];

    // Define the number of icons to display based on the pagination element
    const j: number = elem === "previous" || elem === "next" ? 1 : 2;

    // Determine the class and direction for double arrows
    const double: string =
      elem === "previous" || elem === "next" ? "" : "double ";
    const sens: string =
      elem === "previous" || elem === "first" ? "left" : "right";

    // Create the HTML anchor element with specified class and URL
    const anchor: HTMLAnchorElement = new DocumentCreate({
      className: this.classNav,
    }).ahref({
      url: this.url.replaceAll("$num", displayNumberPage.toString()),
      title: arrayElem.includes(elem) ? elem + " " : "" + "page",
    });

    // Append the required number of icon elements to the anchor
    for (let i = 0; i < j; i++) {
      anchor.appendChild(
        new DocumentCreate({
          className: `icon ${double}icon_arrow_sm_${sens}`,
        }).span({})
      );
    }

    return anchor;
  }

  // Generate the middle pagination links and append them to the navigation element
  private nav(navigationHtml: HTMLDivElement): void {
    const { numberPermanent, numberMiddle } = this;

    for (let i = 1; i <= this.pageCount(); i++) {
      let numPage: number = 0;
      let classNav: string = "";
      let spanMiddle: boolean = false;

      classNav = i === this.currentPage ? "activate" : "";

      if (
        i <= numberPermanent ||
        (i >= this.pageCount() - numberPermanent + 1 && i <= this.pageCount())
      ) {
        // Les 3 premières pages et les 3 dernières pages
        numPage = i;
      } else if (
        i >= this.currentPage - Math.floor(numberMiddle / 2) &&
        i <= this.currentPage + Math.ceil(numberMiddle / 2)
      ) {
        // Les 6 pages au milieu
        numPage = i;
      } else if (
        (i === numberPermanent + 1 &&
          this.currentPage >
            numberPermanent + Math.ceil(numberMiddle / 2) + 1) ||
        (i === this.pageCount() - numberPermanent &&
          this.currentPage <
            this.pageCount() - numberPermanent - Math.floor(numberMiddle / 2))
      ) {
        // Ajouter <span>...</span> entre les 3 premières et les 6 pages du milieu
        // ou entre les 6 pages du milieu et les 3 dernières pages
        spanMiddle = true;
      }

      if (numPage > 0) {
        const element: HTMLAnchorElement = new DocumentCreate({
          className: classNav,
        }).ahref({
          url: this.url.replaceAll("$num", numPage.toString()),
          title: "page " + numPage,
          texte: numPage.toString(),
        });
        navigationHtml.appendChild(element);
      }

      if (spanMiddle) {
        navigationHtml.appendChild(this.span.cloneNode(true) as Node);
      }
    }
  }
}
