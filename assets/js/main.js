const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);
const toggleLoading = () => $('.loading').classList.toggle('hidden');

const urlBase = `https://pokeapi.co/api/v2/pokemon`;
const urlImgLoad =
  "https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif";

const imgNotFound = "https://i.gifer.com/VEK7.gif"

function fetchAPI(url, headers) {
  return fetch(urlBase + url, headers)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

document.addEventListener("DOMContentLoaded", function () {
  initEvents();
});

function initEvents() {
  $("#search").addEventListener("submit", async function (event) {
    event.preventDefault();

    const search = $("#search-input").value.toLowerCase().trim();
    $("#img-pokemon").setAttribute("src", urlImgLoad);

    toggleLoading();
    try {

        const pokemonRequest = await fetchAPI(`/${search}`);
    
    
        // Create sprites 
        const { sprites } = pokemonRequest;
        let {front_default, back_default, front_shiny, back_shiny} = sprites;
        let linksSprites = [front_default, back_default, front_shiny, back_shiny, front_default];
        let it = 0;
        var handle = setInterval((linksSprites) => {
          $("#img-pokemon").setAttribute("src", linksSprites[it]);
          it++;
          if (it === linksSprites.length) {
            clearInterval(handle)
          }
        }, 1000, linksSprites);
    
        // Create types
        const { types } = pokemonRequest;
        let typesList = "";
        types.forEach((type) => {
            typesList += `${type.type.name},`;
        });
        $("#type").innerText = typesList;
    
    
        // Create name
        const { name } = pokemonRequest;
        $("#name").innerText = name;
        
    
        // Create stats
        const { stats } = pokemonRequest;
       
        $('#hp').innerText = stats[0].base_stat;
        $('#attack').innerText = stats[1].base_stat;
        $('#defense').innerText = stats[2].base_stat;
        $('#special-attack').innerText = stats[3].base_stat;
        $('#special-defense').innerText = stats[4].base_stat;
    
        // Create moves
        const { moves } = pokemonRequest;
    
        const movesList = moves.splice(0, 2).map((move) => move.move.name);
    
        $("#yellowBox1").innerText = movesList[0];
        $("#yellowBox2").innerText = movesList[1];
    
    
    }
    catch (error) {
        console.log(error);
        $("#img-pokemon").setAttribute("src", imgNotFound);
        $("#name").innerText = "Pokemon not found";
        $("#type").innerText = "";
        $('#hp').innerText = "";
        $('#attack').innerText = "";
        $('#defense').innerText = "";
        $('#special-attack').innerText = "";
        $('#special-defense').innerText = "";
        $("#yellowBox1").innerText = "";
        $("#yellowBox2").innerText = "";    
    }
    
    toggleLoading();
});
}
