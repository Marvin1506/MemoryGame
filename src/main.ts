import './styles/style.scss'
const codeVibeThemeInput = document.getElementById("codeVibe");
const gamingThemeInput = document.getElementById("gamingTheme");
const daProjectsThemeInput = document.getElementById("daProjectsTheme");
const foodThemeInput = document.getElementById("foodTheme");
const fieldSizeText = document.getElementById("settings-content__final-settings-game-text-board") as HTMLParagraphElement | null;
const images: string[] = [
    "./src/assets/fonts/images/codeVibeTheme.png",
    "./src/assets/fonts/images/gamingTheme.png",
    "./src/assets/fonts/images/daProjectsTheme.png",
    "./src/assets/fonts/images/foodTheme.png"
];
type Card = {
    id: number;
    src: string;
};

const cards: Card[] = [
    { id: 1, src: "./src/assets/images/html.png" },
    { id: 2, src: "./src/assets/images/css.png" },
    { id: 3, src: "./src/assets/images/javascript.png" },
    { id: 4, src: "./src/assets/images/typescript.png" },
    { id: 5, src: "./src/assets/images/angular.png" },
    { id: 6, src: "./src/assets/images/firebase.png" },
    { id: 7, src: "./src/assets/images/git.png" },
    { id: 8, src: "./src/assets/images/github.png" }
];

init();

function init(){
    cardFlip();
    goToSetting();
    goToBoard();
    // settings
    changePreviewImage();
    choosePlayer();
    chooseBoardSize();
    //
    //Game

    //
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

function changePreviewImage(){
    const previewImg = document.getElementById("settings-content__preview-image") as HTMLImageElement | null;
    const gamingThemeText = document.getElementById("settings-content__final-settings-game-text") as HTMLParagraphElement;
    const imagesArray = images;

    if(previewImg){
        codeVibeThemeInput?.addEventListener("click", () => {
            previewImg.src = imagesArray[0];
            gamingThemeText.innerText = "Code vibes theme";
        });

        gamingThemeInput?.addEventListener("click", () => {
            previewImg.src = imagesArray[1];
            gamingThemeText.innerText = "Gaming theme";
        });

        daProjectsThemeInput?.addEventListener("click", () => {
            previewImg.src = imagesArray[2];
            gamingThemeText.innerText = "DA Projects theme";
        });

        foodThemeInput?.addEventListener("click", () => {
            previewImg.src = imagesArray[3];
            gamingThemeText.innerText = "Foods theme";
        });
    }
}

function choosePlayer(){
    const orangePlayerInput = document.getElementById("orange") as HTMLInputElement | null;
    const bluePlayerInput = document.getElementById("blue") as HTMLInputElement | null;
    const playerPreview = document.getElementById("settings-content__final-settings-game-text-player") as HTMLParagraphElement | null;

    if(playerPreview){
        orangePlayerInput?.addEventListener("click", () => {
            playerPreview.innerText = "Orange";
        });

        bluePlayerInput?.addEventListener("click", () => {
            playerPreview.innerText = "Blue";
        });
    }
}

function chooseBoardSize(){
    const smallBoard = document.getElementById("smallBoard") as HTMLInputElement | null;
    const mediumBoard = document.getElementById("mediumBoard") as HTMLInputElement | null;
    const largeBoard = document.getElementById("largeBoard") as HTMLInputElement | null;
    if(fieldSizeText) {
        smallBoard?.addEventListener("click", () => {
            fieldSizeText.innerText = "16 cards";
        });

        mediumBoard?.addEventListener("click", () => {
            fieldSizeText.innerText = "24 cards";
        });

        largeBoard?.addEventListener("click", () => {
            fieldSizeText.innerText = "32 cards";
        });
    }
}

function addCardsToField(){
    const cardField = document.getElementById("card__card-play-field") as HTMLDivElement | null;

}