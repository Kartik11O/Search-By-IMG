export var query = ` 
  query ($ids: [Int], $page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id_in: $ids, search: $search) {
      id
      title {
        romaji
      }
      coverImage {
        extraLarge
      }
      studios(isMain: true) {
        nodes {
          name
        }
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      genres
      averageScore
      siteUrl
      description
    }
  }
}

`;
var variables = {
  ids: 113415,
  page: 1,
  perPage: 3
};

export var options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables
  })
};