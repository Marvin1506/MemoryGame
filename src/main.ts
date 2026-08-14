import './styles/style.scss'

init();

function init(){
    cardFlip();
    goToSetting();
}

function cardFlip(){
    const fieldRef = document.getElementById("field");
    if(fieldRef) {
        fieldRef.addEventListener("click", e => {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
            if(card){
                card.classList.toggle("is-flipped");
            }
        })
    }
}

function goToSetting(){
    const playButton = document.getElementById("play-button");
    const homeScreen = document.getElementById("home-content");
    if(playButton) {
        playButton.addEventListener("click", () => {
            homeScreen?.classList.add("display-none");
        });
    }
}