const Meo_Api = "https://api.trace.moe/search?anilistInfo&url="
const Anilist_Api = "https://graphql.anilist.co"

var query = `
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
        bannerImage
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
export { Meo_Api, Anilist_Api, query }