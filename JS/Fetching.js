const Meo_Api = "https://api.trace.moe/search?anilistInfo&url="
const Anilist_Api = "https://graphql.anilist.co"


let UserUrl = ""
const Input = document.getElementById("InputField")

async function GettingIMG() {
  const imageInput = document.getElementById('file');
  const imageFile = await imageInput.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);
  Fetching(formData)
  console.log('dassa')
}

async function Fetching(formData) {
  UserUrl = Input.value
  try {
    const Meo_Respone = await fetch(`${Meo_Api}${encodeURIComponent(UserUrl)}`, {
      method: "POST",
      body: formData,
    })
    const Meo_Data = await Meo_Respone.json()
    const Meo_One = Meo_Data.result.slice(0, 1)
    const key = Meo_One.map((item) => item.anilist.id)
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
    var variables = {
      ids: key,
      page: 1,
      perPage: 3
    };
    var options = {
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
    // AniList Fetching
    const Ani_Respone = await fetch(Anilist_Api, options)
    const Ani_Data = await Ani_Respone.json()
    const Ani_Map = Ani_Data.data.Page.media
    AddingToBody(Meo_One, Ani_Map)

  } catch (error) {
    console.log(error, "Error Found")
  }

}


function AddingToBody(Meo_One, Ani_Data) {
  let WholeBody = ``
  let Poster = []
  let Banner = []
  let Info = []
  Ani_Data.map((items) => {
    console.log(items)
    Poster.push(items.coverImage.extraLarge)
    Banner.push(items.bannerImage)
    Info.push(items.description)
  })
  Meo_One.map((item) => {
    console.log(item)
    let Name_E = item.anilist.title.english
    let Name_R = item.anilist.title.romaji
    let Ep = item.episode
    let Video = item.video
    let similarity = (item.similarity * 100).toFixed(2)
    let TimeStart = (item.from / 60).toFixed(2)
    let TimeEnd = (item.to / 60).toFixed(2)
    const body = BodyHTML(Ep, similarity, TimeStart, Poster, Banner, Info, Video, Name_R, Name_E)
    WholeBody += body
  })

}



function BodyHTML(Ep, similarity, TimeStart, Poster, Banner, Info, Video, Name_R, Name_E) {
  let Body = `
        <div id="Banner" class="h-[22vh] w-full bg-red-500 absolute" style="top: 0;">
        <img src="${Banner}" class="h-full w-full object-cover" alt="" />
      </div>
      <div id="Poster" class=" bottom-[2rem] left-[1rem] h-[34vh] w-[12vw] bg-white relative " style="top: 3rem;">
        <img src="${Poster}" class="h-full w-full object-cover" alt="" />
      </div>
      <div id="Details" class="h-[41vh] w-[86vw] flex items-end" style="margin-left: 2.3rem">
        <div id="Name" class=" h-[23vh] w-[33vw]">
          <ul class="text-OffWhite ">
            <li>
              <h1 id="border-line" class="text-[3rem] font-name font-bold h-[5.7vh] relative ">${Name_R || Name_E}</h1>
            </li>
            <li class="font-name flex gap-[28px] text-[1.5rem] pl-[7px]">
              <span>Ep${Ep}</span><span>at${TimeStart}</span>
              <span>2020</span> <span>${similarity}%</span>
            </li>
            <li>
              <p id="Text" class="font-name w-[33vw] mt-[10px] pl-[7px]">${Info}</p>
            </li>
          </ul>
        </div>
        <div id="result" class="w-[34vw] h-[16.3vh] mt-[0px] ml-[13px]  flex gap-[17px]">
          <div id="UserIMG"
            class="w-[16vw] h-[18vh] relative flex justify-center items-start flex-col text-[17px] text-center">
            <img src="" alt="" class="w-full h-[16vh] pt-[8px] object-cover" data-img>
            <span id="UserIMG--Name" class=" text-OffWhite">Your Image</span>
          </div>
          <div id="resultIMG"
            class="w-[16vw] h-[18vh] relative flex justify-center items-start flex-col text-[17px] text-center">
            <video class="w-full h-[16vh] pt-[8px] object-cover" src="${Video}" autoplay="true" loop="true"></video>
            <span id="UserIMG--Name" class=" text-OffWhite">Search Image</span>
          </div>
        </div>
      </div>
    `
  AddingBodyToHTML(Body)
}

function AddingBodyToHTML(Body) {
  document.getElementById("SEC-2").innerHTML = Body
  $("img[data-img]").attr('src', UserUrl)
  // $("img[data-img]").attr('src', imageUrl)
  $("#SEC-2").fadeIn()
  $("#SEC-2").css({
    display: 'flex'
  })
}

// Add event listener for the 'keypress' event
window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    GettingIMG()
  }
});
// Fetching()