
const gallery = document.querySelector("#gallery");
const popUp = document.querySelector("#popup");
const popUpImg = document.querySelector("#popup-img");

const API_KEY = "b0ff41cc-63e6-4086-b0f1-86a37678efa9";

let page = 1;
let popUpState = false; // false = closed; true = open

fetchImages();

function fetchImages(){
    fetch("https://api.thecatapi.com/v1/images/search?api_key=" + API_KEY + "&limit=15&page=" + page)
    .then(response => response.json())
    .then(data => appendToGallery(data));
}

function appendToGallery(data){

    data.forEach(item => {
        
        let image = document.createElement("img");
        image.src = item.url;

        gallery.appendChild(image);

        image.addEventListener("click", (event) => {
            openPopUp(event.target.src)
        })
    });
}

function openPopUp(url){
    togglePupUp();
    popUpImg.src = url;
}

function togglePupUp(){
    if(popUpState){
        popUp.classList.remove("visable");
        popUp.classList.add("hidden");
    }
    else{
        popUp.classList.remove("hidden");
        popUp.classList.add("visable");
    }

    popUpState = !popUpState;
}

popUp.addEventListener("click", () => {
    togglePupUp()
});

document.querySelector("#load-more").addEventListener("click", () => {
    page++;
    fetchImages();
})