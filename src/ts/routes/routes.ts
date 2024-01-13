// Represents a segment with a type and value.
export interface Segment {
  type: string;
  value: string;
}

// Utility class for handling and parsing routes.
export class Routes {
  // Holds the current route from the window's pathname.
  private static route: string = window.location.pathname;

  // Constructor for the Routes class.
  constructor() {}

  // Gets an array of segments parsed from the current route.
  public static getRoutes(): Segment[] {
    return Routes.parseString(Routes.route);
  }

  // Parses a string into an array of segments.
  private static parseString(input: string): Segment[] {
    const segments: Segment[] = [];

    const parts = input.split("/");

    for (let i = 0; i <= parts.length - 1; i++) {
      const part = parts[i + 1];
      if (part != undefined) {
        if (i % 2 === 0) {
          segments.push({ type: part, value: "" });
        } else {
          segments[segments.length - 1].value = part;
        }
      } else {
        i++;
      }
    }
    return segments;
  }
}

// Main application class for route handling.
export class App {
  // Checks if a given route exists in the parsed routes.
  public static routes(routeClient: string): boolean {
    const routes = Routes.getRoutes();
    return routes.some(
      (segment) => segment.type === routeClient || segment.value === routeClient
    );
  }

  // Gets the value associated with a specific route.
  public static getValue(routeClient: string): string {
    const routes = Routes.getRoutes();
    const matchingSegment = routes.find(
      (segment) => segment.type === routeClient || segment.value === routeClient
    );

    return matchingSegment ? matchingSegment.value : "";
  }

  // Replaces the value of a specific route segment.
  public static getReplace(routeClient: string, value: string): Segment[] {
    const routes = Routes.getRoutes();

    // Find the index of the segment that corresponds to routeClient.
    const index: number = routes.findIndex(
      (segment) => segment.type === routeClient || segment.value === routeClient
    );

    // If a matching segment is found, update its value.
    if (index !== -1) {
      routes[index].value = value;
    }

    return routes;
  }

  // Joins an array of segments into a formatted route string.
  public static joinSegments(segments: Segment[]): string {
    return segments
      .map(
        (segment) =>
          `${segment.type}${segment.value ? "/" + segment.value : ""}`
      )
      .join("/");
  }

  public static transformUrlToString(): string {
    const urlObj = new URL(window.location.href);
    const params = new URLSearchParams(urlObj.search);

    // Obtenir les paramètres de requête sous forme de tableau de paires clé-valeur
    const queryParams = Array.from(params.entries());

    // Mapper les paires clé-valeur en une chaîne de caractères
    const transformedString = queryParams
      .map(([key, value]) => `${key}/${value}`)
      .join("/");

    return transformedString;
  }
}
