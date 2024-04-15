// const Meo_Api = "https://api.trace.moe/search?anilistInfo&url="
// const Anilist_Api = "https://graphql.anilist.co"


// let UserUrl = "https://www.comingsoon.net/wp-content/uploads/sites/3/2023/09/Jujutsu-Kaisen-Chapter-237-Release-Date.jpg "
// const Input = document.getElementById("InputField")

// async function Fetching() {
//   // UserUrl = Input.value
//   try {
//     const Meo_Respone = await fetch(`${Meo_Api}${encodeURIComponent(UserUrl)}`)
//     const Meo_Data = await Meo_Respone.json()
//     const Meo_One = Meo_Data.result.slice(0, 1)
//     const key = Meo_One.map((item) => item.anilist.id)

//     var query = `
//   query ($ids: [Int], $page: Int, $perPage: Int, $search: String) {
//   Page(page: $page, perPage: $perPage) {
//     pageInfo {
//       total
//       currentPage
//       lastPage
//       hasNextPage
//       perPage
//     }
//     media(id_in: $ids, search: $search) {
//       id
//       title {
//         romaji
//       }
//         bannerImage
//       coverImage {
//         extraLarge
//       }
//       studios(isMain: true) {
//         nodes {
//           name
//         }
//       }
//       startDate {
//         year
//         month
//         day
//       }
//       endDate {
//         year
//         month
//         day
//       }
//       genres
//       averageScore
//       siteUrl
//       description
//     }
//   }
// }

// `;
//     var variables = {
//       ids: key,
//       page: 1,
//       perPage: 3
//     };
//     var options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables
//       })
//     };
//     // AniList Fetching
//     const Ani_Respone = await fetch(Anilist_Api, options)
//     const Ani_Data = await Ani_Respone.json()
//     const Ani_Map = Ani_Data.data.Page.media
//     AddingToBody(Meo_One, Ani_Map)

//   } catch (error) {
//     console.log(error, "Error Found")
//   }

// }


// function AddingToBody(Meo_One, Ani_Data) {
//   let WholeBody = ``
//   let Poster = []
//   let Banner = []
//   let Info = []
//   Ani_Data.map((items) => {
//     console.log(items)
//     Poster.push(items.coverImage.extraLarge)
//     Banner.push(items.bannerImage)
//     Info.push(items.description)
//   })
//   Meo_One.map((item) => {
//     console.log(item)
//     let Ep = item.episode
//     let Video = item.video
//     let similarity = (item.similarity * 100).toFixed(2)
//     let TimeStart = (item.from / 60).toFixed(2)
//     let TimeEnd = (item.to / 60).toFixed(2)
//     const body = BodyHTML(Ep, similarity, TimeStart, Poster, Banner, Info)
//     WholeBody += body
//   })

// }



// function BodyHTML(Ep, similarity, TimeStart, Poster, Banner, Info) {
//   let Body = `
//          <div id="Banner" class="h-[22vh] w-full bg-red-500">
//         <img src="${Banner}"
//           class="h-full w-full object-cover" alt="" />
//       </div>
//       <div id="Poster" class="absolute bottom-[2rem] left-[1rem] h-[34vh] w-[12vw] bg-white">
//         <img src="${Poster}"
//           class="h-full w-full object-cover" alt="" />
//       </div>
//       <div id="Details" class="h-[11vw] w-[86vw]" style="margin-left: 16rem">
//         <div id="Name">
//           <ul class="text-OffWhite ">
//             <li>
//               <h1 class="text-[3rem] font-name font-bold h-[6.4vh] border-b-2 border-[#c0c0c0]">JUJUTSU KAISEN</h1>
//             </li>
//             <li class="font-name flex gap-[28px] text-[1.5rem] pl-[7px]"> <span>Ep${Ep}</span><span>at${TimeStart}</span>
//               <span>2020</span> <span>${similarity}%</span>
//             </li>
//             <li>
//               <p id="Text" class="font-name w-[33vw] mt-[10px] pl-[7px]">${Info}</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     `
//   AddingBodyToHTML(Body)
// }

// function AddingBodyToHTML(Body) {
//   document.getElementById("SEC-2").innerHTML = Body
// }

// // Add event listener for the 'keypress' event
// // window.addEventListener('keypress', function (event) {
// //   if (event.key === 'Enter') {
// //     Fetching()
// //   }
// // });
// Fetching()