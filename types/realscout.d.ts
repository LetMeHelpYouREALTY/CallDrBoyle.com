// TypeScript declarations for RealScout Web Components
import "react";


declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-simple-search": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "agent-encoded-id": string;
        },
        HTMLElement
      >;
      "realscout-office-listings": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "agent-encoded-id"?: string;
          "office-encoded-id"?: string;
          "sort-order"?: string;
          "listing-status"?: string;
          "property-types"?: string;
          "price-min"?: string;
          "price-max"?: string;
        },
        HTMLElement
      >;
    }
  }
}
