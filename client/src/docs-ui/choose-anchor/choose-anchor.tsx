import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {getFilterKeyFromPage} from "../../utils/filters";
import {filterMetadataByOptionByName} from "../../utils/filter-data";

const getRoute = (page: Page, filterValue: string): string => {
  switch (filterValue) {
    case "android":
    case "ios": {
      if (page.route.startsWith("/lib")) {
        return `/sdk/q/platform/${filterValue}`;
      }
      break;
    }
  }

  return page.versions?.[filterValue] as string;
};

@Component({tag: "docs-choose-anchor", shadow: false})
export class DocsChooseAnchor {
  /*** the current page's data */
  @Prop() readonly page: Page;

  render() {
    const filterKey = getFilterKeyFromPage(this.page);

    return (
      <Host>
        <amplify-responsive-grid
          gridGap={1}
          columns={4}
          class="border-radius margin-top-md"
        >
          {filterKey &&
            Object.entries(filterMetadataByOptionByName[filterKey]).map(
              ([filterValue, {label, graphicURI}]) => {
                const route = getRoute(this.page, filterValue);

                return (
                  <docs-card key={label} vertical url={route}>
                    <img
                      slot="graphic"
                      src={graphicURI}
                      alt={`${label} Logo`}
                    />
                    <h4 slot="heading">{label}</h4>
                  </docs-card>
                );
              },
            )}
        </amplify-responsive-grid>
      </Host>
    );
  }
}
