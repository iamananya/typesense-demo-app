const { algoliasearch, instantsearch } = window;
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "127.0.0.1",
        port: "8108",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "title,authors"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: "books"
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 12,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="{{image_url}}" align="left" alt="" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "authors" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\$</div>
          <div class="hit-rating">Rating: </div>
        </div>
      `,
    },
  }),
 
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
