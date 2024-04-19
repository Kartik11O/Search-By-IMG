import { AddingToBody } from "./AddToBody.js"
import { Meo_Api, Anilist_Api, query } from "./Api.js"

var UserUrl = ""
const Input = document.getElementById("InputField")


async function GettingIMG() {
  const imageInput = document.getElementById('file');
  const imageFile = await imageInput.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);
  Fetching(formData)
  console.log(imageFile, 'img')
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

    var variables = {
      ids: key
    }
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



document.getElementById('file').addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    removeNodes()
    GettingIMG()
  } else {
    console.log('No file selected');
  }
}
// Add event listener for the 'keypress' event
window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    removeNodes()
    Fetching()
  }
});

function removeNodes() {
  document.getElementById("Banner").remove()
  document.getElementById("Poster").remove()
  document.getElementById("Details").remove()
}
export { UserUrl }


$("")