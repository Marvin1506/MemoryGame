import './styles/style.scss'

init();

function init(){
    cardFlip();
    goToSetting();
    goToBoard();
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
    const settingsContent = document.getElementById("settings-content");
    if(playButton) {
        playButton.addEventListener("click", () => {
            homeScreen?.classList.add("display-none");
            settingsContent?.classList.remove("display-none");
        });
    }
}

function goToBoard(){
    const finalSettingButton = document.getElementById("final-settings-button");
    const settingsContent = document.getElementById("settings-content");
    const playContent = document.getElementById("field");
    if(finalSettingButton) {
        finalSettingButton.addEventListener("click", () => {
            settingsContent?.classList.add("display-none");
            playContent?.classList.remove("display-none");
        });
    }
}