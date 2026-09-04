import './styles/style.scss'
import {codeGameFieldTemplate,gamingGameFieldTemplate, winnerScreenCodeTemplate, gameOverScreenCodeTemplate,
drawScreenCodeTemplate,gameOverScreenGamingTemplate, winnerScreenGamingTemplate, drawScreenGamingTemplate, gamingCardsTemplate, codeCardsTemplate} from "./templates/templates";
const codeVibeThemeInput = document.getElementById("codeVibe");
const gamingThemeInput = document.getElementById("gamingTheme");
const daProjectsThemeInput = document.getElementById("daProjectsTheme");
const foodThemeInput = document.getElementById("foodTheme");
const fieldSizeText = document.getElementById("settings-content__final-settings-game-text-board") as HTMLParagraphElement | null;
const smallBoard = document.getElementById("smallBoard") as HTMLInputElement | null;
const mediumBoard = document.getElementById("mediumBoard") as HTMLInputElement | null;
const largeBoard = document.getElementById("largeBoard") as HTMLInputElement | null;
const startButton = document.getElementById("final-settings-button") as HTMLButtonElement | null;
const orangePlayerInput = document.getElementById("orange") as HTMLInputElement | null;
const bluePlayerInput = document.getElementById("blue") as HTMLInputElement | null;
const winnerScreenContent = document.getElementById("winner-screen") as HTMLDivElement | null;
const winnerColorTextDiv = document.getElementById("winner-screen__color-winner") as HTMLTextAreaElement | null;
const winnerChessImage = document.getElementById("winner-picture") as HTMLImageElement;
const drawContentDiv = document.getElementById("draw-screen") as HTMLDivElement;
let selectedBoardSize: number = 0;
let orangeScore: number = 0;
let blueScore: number = 0;
let isMultiplayer: boolean = false;
let currentPlayer: PlayerColor = "blue";
let selectedTheme: Theme = "code";
const images: string[] = ["./src/assets/fonts/images/codeVibeTheme.png", "./src/assets/fonts/images/gamingTheme.png"];
let flippedCards: Card[] = [];
let flippedCardElements: HTMLButtonElement[] = [];
let shuffledCards: Card[] = [];
type Card = {
    id: number;
    src: string;
    isFlipped: boolean,
    isMatched: boolean,
};
type PlayerColor = "blue" | "orange";
type Theme = "code" | "gaming";
const codeCards: Card[] = [
    { id: 1, src: "./src/assets/fonts/images/card_img/angularIcon.png", isFlipped: false, isMatched:false },
    { id: 1, src: "./src/assets/fonts/images/card_img/angularIcon.png", isFlipped: false, isMatched:false },
    { id: 2, src: "./src/assets/fonts/images/card_img/bootstrap.png", isFlipped: false, isMatched:false },
    { id: 2, src: "./src/assets/fonts/images/card_img/bootstrap.png", isFlipped: false, isMatched:false },
    { id: 3, src: "./src/assets/fonts/images/card_img/cssLogo.png", isFlipped: false, isMatched:false },
    { id: 3, src: "./src/assets/fonts/images/card_img/cssLogo.png", isFlipped: false, isMatched:false },
    { id: 4, src: "./src/assets/fonts/images/card_img/djangoIcon.png", isFlipped: false, isMatched:false },
    { id: 4, src: "./src/assets/fonts/images/card_img/djangoIcon.png", isFlipped: false, isMatched:false },
    { id: 5, src: "./src/assets/fonts/images/card_img/firebaseIcon.png", isFlipped: false, isMatched:false },
    { id: 5, src: "./src/assets/fonts/images/card_img/firebaseIcon.png", isFlipped: false, isMatched:false },
    { id: 6, src: "./src/assets/fonts/images/card_img/githubIcon.png", isFlipped: false, isMatched:false },
    { id: 6, src: "./src/assets/fonts/images/card_img/githubIcon.png", isFlipped: false, isMatched:false },
    { id: 7, src: "./src/assets/fonts/images/card_img/gitIcon.png", isFlipped: false, isMatched:false },
    { id: 7, src: "./src/assets/fonts/images/card_img/gitIcon.png", isFlipped: false, isMatched:false },
    { id: 8, src: "./src/assets/fonts/images/card_img/htmlIcon.png", isFlipped: false, isMatched:false },
    { id: 8, src: "./src/assets/fonts/images/card_img/htmlIcon.png", isFlipped: false, isMatched:false },
    { id: 9, src: "./src/assets/fonts/images/card_img/JsIcon.png", isFlipped: false, isMatched:false },
    { id: 9, src: "./src/assets/fonts/images/card_img/JsIcon.png", isFlipped: false, isMatched:false },
    { id: 10, src: "./src/assets/fonts/images/card_img/nodejsIcon.png", isFlipped: false, isMatched:false },
    { id: 10, src: "./src/assets/fonts/images/card_img/nodejsIcon.png", isFlipped: false, isMatched:false },
    { id: 11, src: "./src/assets/fonts/images/card_img/pythonIcon.png", isFlipped: false, isMatched:false },
    { id: 11, src: "./src/assets/fonts/images/card_img/pythonIcon.png", isFlipped: false, isMatched:false },
    { id: 12, src: "./src/assets/fonts/images/card_img/reactIcon.png", isFlipped: false, isMatched:false },
    { id: 12, src: "./src/assets/fonts/images/card_img/reactIcon.png", isFlipped: false, isMatched:false },
    { id: 13, src: "./src/assets/fonts/images/card_img/SassIcon.png", isFlipped: false, isMatched:false },
    { id: 13, src: "./src/assets/fonts/images/card_img/SassIcon.png", isFlipped: false, isMatched:false },
    { id: 14, src: "./src/assets/fonts/images/card_img/SQL.png", isFlipped: false, isMatched:false },
    { id: 14, src: "./src/assets/fonts/images/card_img/SQL.png", isFlipped: false, isMatched:false },
    { id: 15, src: "./src/assets/fonts/images/card_img/terminalIcon.png", isFlipped: false, isMatched:false },
    { id: 15, src: "./src/assets/fonts/images/card_img/terminalIcon.png", isFlipped: false, isMatched:false },
    { id: 16, src: "./src/assets/fonts/images/card_img/typescriptIcon.png", isFlipped: false, isMatched:false },
    { id: 16, src: "./src/assets/fonts/images/card_img/typescriptIcon.png", isFlipped: false, isMatched:false },
    { id: 17, src: "./src/assets/fonts/images/card_img/VSCodeIcon.png", isFlipped: false, isMatched:false },
    { id: 17, src: "./src/assets/fonts/images/card_img/VSCodeIcon.png", isFlipped: false, isMatched:false },
    { id: 18, src: "./src/assets/fonts/images/card_img/vueJS.png", isFlipped: false, isMatched:false },
    { id: 18, src: "./src/assets/fonts/images/card_img/vueJS.png", isFlipped: false, isMatched:false }
];
const gamingCards: Card[] = [
    { id: 1, src: "./src/assets/fonts/images/card_gaming_img/bananaGaming.png", isFlipped: false, isMatched:false },
    { id: 1, src: "./src/assets/fonts/images/card_gaming_img/bananaGaming.png", isFlipped: false, isMatched:false },
    { id: 2, src: "./src/assets/fonts/images/card_gaming_img/bigPacmanGaming.png", isFlipped: false, isMatched:false },
    { id: 2, src: "./src/assets/fonts/images/card_gaming_img/bigPacmanGaming.png", isFlipped: false, isMatched:false },
    { id: 3, src: "./src/assets/fonts/images/card_gaming_img/cardGaming.png", isFlipped: false, isMatched:false },
    { id: 3, src: "./src/assets/fonts/images/card_gaming_img/cardGaming.png", isFlipped: false, isMatched:false },
    { id: 4, src: "./src/assets/fonts/images/card_gaming_img/circleGaming.png", isFlipped: false, isMatched:false },
    { id: 4, src: "./src/assets/fonts/images/card_gaming_img/circleGaming.png", isFlipped: false, isMatched:false },
    { id: 5, src: "./src/assets/fonts/images/card_gaming_img/coinGaming.png", isFlipped: false, isMatched:false },
    { id: 5, src: "./src/assets/fonts/images/card_gaming_img/coinGaming.png", isFlipped: false, isMatched:false },
    { id: 6, src: "./src/assets/fonts/images/card_gaming_img/creeperGaming.png", isFlipped: false, isMatched:false },
    { id: 6, src: "./src/assets/fonts/images/card_gaming_img/creeperGaming.png", isFlipped: false, isMatched:false },
    { id: 7, src: "./src/assets/fonts/images/card_gaming_img/cubeGaming.png", isFlipped: false, isMatched:false },
    { id: 7, src: "./src/assets/fonts/images/card_gaming_img/cubeGaming.png", isFlipped: false, isMatched:false },
    { id: 8, src: "./src/assets/fonts/images/card_gaming_img/gameboyGaming.png", isFlipped: false, isMatched:false },
    { id: 8, src: "./src/assets/fonts/images/card_gaming_img/gameboyGaming.png", isFlipped: false, isMatched:false },
    { id: 9, src: "./src/assets/fonts/images/card_gaming_img/levelGaming.png", isFlipped: false, isMatched:false },
    { id: 9, src: "./src/assets/fonts/images/card_gaming_img/levelGaming.png", isFlipped: false, isMatched:false },
    { id: 10, src: "./src/assets/fonts/images/card_gaming_img/mushroomGaming.png", isFlipped: false, isMatched:false },
    { id: 10, src: "./src/assets/fonts/images/card_gaming_img/mushroomGaming.png", isFlipped: false, isMatched:false },
    { id: 11, src: "./src/assets/fonts/images/card_gaming_img/pacmanGaming.png", isFlipped: false, isMatched:false },
    { id: 11, src: "./src/assets/fonts/images/card_gaming_img/pacmanGaming.png", isFlipped: false, isMatched:false },
    { id: 12, src: "./src/assets/fonts/images/card_gaming_img/playerGaming.png", isFlipped: false, isMatched:false },
    { id: 12, src: "./src/assets/fonts/images/card_gaming_img/playerGaming.png", isFlipped: false, isMatched:false },
    { id: 13, src: "./src/assets/fonts/images/card_gaming_img/playGaming.png", isFlipped: false, isMatched:false },
    { id: 13, src: "./src/assets/fonts/images/card_gaming_img/playGaming.png", isFlipped: false, isMatched:false },
    { id: 14, src: "./src/assets/fonts/images/card_gaming_img/puzzleGaming.png", isFlipped: false, isMatched:false },
    { id: 14, src: "./src/assets/fonts/images/card_gaming_img/puzzleGaming.png", isFlipped: false, isMatched:false },
    { id: 15, src: "./src/assets/fonts/images/card_gaming_img/quarterGaming.png", isFlipped: false, isMatched:false },
    { id: 15, src: "./src/assets/fonts/images/card_gaming_img/quarterGaming.png", isFlipped: false, isMatched:false },
    { id: 16, src: "./src/assets/fonts/images/card_gaming_img/runesGaming.png", isFlipped: false, isMatched:false },
    { id: 16, src: "./src/assets/fonts/images/card_gaming_img/runesGaming.png", isFlipped: false, isMatched:false },
    { id: 17, src: "./src/assets/fonts/images/card_gaming_img/snakeGaming.png", isFlipped: false, isMatched:false },
    { id: 17, src: "./src/assets/fonts/images/card_gaming_img/snakeGaming.png", isFlipped: false, isMatched:false },
    { id: 18, src: "./src/assets/fonts/images/card_gaming_img/traiangleGaming.png", isFlipped: false, isMatched:false },
    { id: 18, src: "./src/assets/fonts/images/card_gaming_img/traiangleGaming.png", isFlipped: false, isMatched:false }
];

init();

function init(){
    goToSetting();
    goToBoard();
    changePreviewImage();
    choosePlayer();
    chooseBoardSize();
    playerInputEvent();
}

function cardFlip() {
    const fieldRef = document.getElementById("card__card-play-field");

    fieldRef?.addEventListener("click", (element) => {
        if (flippedCards.length === 2) return;
        const cardElement = (element.target as HTMLElement).closest(".card__card-div") as HTMLButtonElement | null;
        if (!cardElement) return;
        const cardIndex = Number(cardElement.dataset.cardIndex);
        const card = shuffledCards[cardIndex];
        if (card.isFlipped || card.isMatched) return;
        card.isFlipped = true;
        cardElement.classList.add("is-flipped");
        flippedCards.push(card);
        flippedCardElements.push(cardElement);
        if (flippedCards.length === 2) {
            checkForMatch();
            setTimeout(() => {
                checkIfGameIsOver();
            }, 1000);
        }
    });
}

function selectSingleOrMultiplayer(){
    if(bluePlayerInput && bluePlayerInput.checked && orangePlayerInput && orangePlayerInput.checked){
        isMultiplayer = true;
    } else if(bluePlayerInput && bluePlayerInput.checked) {
        isMultiplayer = false;
    } else if (orangePlayerInput && orangePlayerInput.checked){
        isMultiplayer = false;
    }
}

function selectCurrentPlayer() {
    if (isMultiplayer) {
        if (Math.random() < 0.5) {
            currentPlayer = "blue";
        } else {
            currentPlayer = "orange";
        }
    } else {
        if (bluePlayerInput?.checked) {
            currentPlayer = "blue";
        } else if (orangePlayerInput?.checked) {
            currentPlayer = "orange";
        }
    }
}

function showPlayerIcon() {
    const currentPlayerTurn = document.getElementById("field__current-player-playing-div") as HTMLDivElement | null;
    if (!currentPlayerTurn) return;
    let playerIcon = "";
    if (selectedTheme === "code") {
        if (currentPlayer === "blue") {
            playerIcon = "./src/assets/fonts/images/blueLabelPic.png";
        } else {
            playerIcon = "./src/assets/fonts/images/orangeLabelPic.png";
        }
    }
    if (selectedTheme === "gaming") {
        if (currentPlayer === "blue") {
            currentPlayerTurn.style.backgroundColor = "#1FAAFC";
            playerIcon = "./src/assets/fonts/images/card_gaming_img/chessWhite.png";
        } else {
            currentPlayerTurn.style.backgroundColor = "#EA6900";
            playerIcon = "./src/assets/fonts/images/card_gaming_img/chessWhite.png";
        }
    }
    currentPlayerTurn.innerHTML = `
        <img src="${playerIcon}">
    `;
}

function switchPlayer() {
    if (!isMultiplayer) return;
    if (currentPlayer === "blue") {
        currentPlayer = "orange";
    } else {
        currentPlayer = "blue";
    }
    showPlayerIcon();
}

function increaseScore() {
    const counterOrange = document.getElementById("field-counter-orange");
    const counterBlue = document.getElementById("field-counter-blue");
    const counterBlueGameOver = document.getElementById("game-over__blue-counter");
    const counterOrangeGameOver = document.getElementById("game-over__orange-counter");
    if (!counterOrange || !counterBlue || !counterBlueGameOver || !counterOrangeGameOver) return;
    if (currentPlayer === "blue") {
        blueScore++;
        counterBlue.innerText = blueScore.toString();
        counterBlueGameOver.innerHTML = blueScore.toString();
    } else if (currentPlayer === "orange") {
        orangeScore++;
        counterOrange.innerText = orangeScore.toString();
        counterOrangeGameOver.innerHTML = orangeScore.toString();
    }
}


function checkForMatch() {
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];
    const firstCardElement = flippedCardElements[0];
    const secondCardElement = flippedCardElements[1];
    if (firstCard.id === secondCard.id) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        increaseScore();
        flippedCards = [];
        flippedCardElements = [];
    } else {
        setTimeout(() => {
            firstCard.isFlipped = false;
            secondCard.isFlipped = false;
            firstCardElement.classList.remove("is-flipped");
            secondCardElement.classList.remove("is-flipped");
            switchPlayer();
            flippedCards = [];
            flippedCardElements = [];
        }, 1000);
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
    const playerPreview = document.getElementById("settings-content__final-settings-game-text-player") as HTMLParagraphElement | null;
    const gamingThemeText = document.getElementById("settings-content__final-settings-game-text") as HTMLParagraphElement;
    finalSettingButton?.addEventListener("click", () => {
        if(fieldSizeText?.innerText === "Board size" || playerPreview?.innerText === "Player" || gamingThemeText.innerText === "Game theme"
        || orangePlayerInput?.checked === false && bluePlayerInput?.checked === false) return;
        selectSingleOrMultiplayer();
        selectCurrentPlayer();
        renderGameField();
        showPlayerIcon();
        addCardsToField();
        cardFlip();
        openExitGameDiv();
        closeExitGameDiv();
        exitGameButtonEvent();
        settingsContent?.classList.add("display-none");
        playContent?.classList.remove("display-none");
    });
}

function changePreviewImage(){
    const previewImg = document.getElementById("settings-content__preview-image") as HTMLImageElement | null;
    const gamingThemeText = document.getElementById("settings-content__final-settings-game-text") as HTMLParagraphElement;
    const imagesArray = images;
    if(previewImg){
        codeVibeThemeInput?.addEventListener("click", () => {
            selectedTheme = "code";
            previewImg.src = imagesArray[0];
            gamingThemeText.innerText = "Code vibes theme";
        });
        gamingThemeInput?.addEventListener("click", () => {
            selectedTheme = "gaming";
            previewImg.src = imagesArray[1];
            gamingThemeText.innerText = "Gaming theme";
        });
    }
}

function choosePlayer(){
    const orangePlayerInput = document.getElementById("orange") as HTMLInputElement | null;
    const bluePlayerInput = document.getElementById("blue") as HTMLInputElement | null;
    const playerPreview = document.getElementById("settings-content__final-settings-game-text-player") as HTMLParagraphElement | null;
    if(playerPreview){
        orangePlayerInput?.addEventListener("click", () => {
            updatePlayerPreview();
        });
        bluePlayerInput?.addEventListener("click", () => {
            updatePlayerPreview();
        });
    }
}

 function updatePlayerPreview() {
    const playerPreview = document.getElementById("settings-content__final-settings-game-text-player") as HTMLParagraphElement | null;
    if (!orangePlayerInput || !bluePlayerInput || !playerPreview) return;
    if (orangePlayerInput.checked && bluePlayerInput.checked) {
        playerPreview.innerText = "2 Player";
    } else if (orangePlayerInput.checked) {
        playerPreview.innerText = "Orange";
    } else if (bluePlayerInput.checked) {
        playerPreview.innerText = "Blue";
    } else {
        playerPreview.innerText = "Player";
    }
}

function chooseBoardSize(){
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

function setCardFieldSize(){
    if(startButton && fieldSizeText?.innerText === "16 cards"){
        selectedBoardSize = 16;
    } else if(fieldSizeText?.innerText === "24 cards"){
        selectedBoardSize = 24;
    } else if(fieldSizeText?.innerText === "32 cards"){
        selectedBoardSize = 32;
    }
}

function shuffleCards(cards: Card[]) {
    return [...cards].sort(() => Math.random() - 0.5);
}

function renderGameField() {
    const field = document.getElementById("field");
    const winnerScreen = document.getElementById("winner-screen");
    const gameOverScreen = document.getElementById("game-over");
    const drawScreen = document.getElementById("draw-screen");
    if (!field || !winnerScreen || !gameOverScreen || !drawScreen) return;
    field.className = `field field--${selectedTheme}`;
    winnerScreen.className = `winner-screen winner-screen--${selectedTheme} display-none`;
    gameOverScreen.className = `game-over game-over--${selectedTheme} display-none`;
    drawScreen.className = `draw-screen draw-screen--${selectedTheme} display-none`;
    if(selectedTheme === "code"){
        field.innerHTML = codeGameFieldTemplate();
        winnerScreen.innerHTML = winnerScreenCodeTemplate();
        gameOverScreen.innerHTML = gameOverScreenCodeTemplate();
        drawScreen.innerHTML = drawScreenCodeTemplate();
    } else if(selectedTheme === "gaming") {
        field.innerHTML = gamingGameFieldTemplate();
        winnerScreen.innerHTML = winnerScreenGamingTemplate();
        gameOverScreen.innerHTML = gameOverScreenGamingTemplate();
        drawScreen.innerHTML = drawScreenGamingTemplate();
    }
}

function addCardsToField(){
    const cardField = document.getElementById("card__card-play-field") as HTMLDivElement | null;
    setCardFieldSize();
    if (!cardField) return;
    cardField.className = `card__card-play-field card__card-play-field--${selectedTheme}`;
    cardField.innerHTML = "";
    let selectedCards: Card[] = [];
    if (selectedTheme === "code") {
        selectedCards = codeCards.slice(0, selectedBoardSize);
    }   
    if (selectedTheme === "gaming") {
        selectedCards = gamingCards.slice(0, selectedBoardSize);
    }
    shuffledCards = shuffleCards(selectedCards);
    if(selectedTheme === "code"){
        for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i];
            cardField.innerHTML += codeCardsTemplate(card, i);
        }
    } else if(selectedTheme === "gaming"){
         for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i];
            cardField.innerHTML += gamingCardsTemplate(card, i);
        }
    }
}

function openExitGameDiv(){
    const exitButtonGame = document.getElementById("field__button-exit") as HTMLButtonElement | null;
    const exitDiv = document.getElementById("field__exit-div");
    const cardField = document.getElementById("card__card-play-field");
    if (exitButtonGame && exitDiv) {
        exitButtonGame.addEventListener("click", () => {
            exitDiv.classList.remove("display-none");
            cardField?.classList.add("card__card-play-field--disabled");
            setTimeout(() => {
                exitDiv.classList.add("field__exit-div--open");
                exitDiv.classList.remove("field__exit-div--close");
            }, 10);
        });
    }
}

function closeExitDiv() {
    const exitDiv = document.getElementById("field__exit-div");
    const cardField = document.getElementById("card__card-play-field");
    if (!exitDiv) return;
    exitDiv.classList.add("field__exit-div--close");
    setTimeout(() => {
        exitDiv.classList.remove("field__exit-div--open");
        exitDiv.classList.remove("field__exit-div--close");
        exitDiv.classList.add("display-none");
        cardField?.classList.remove("card__card-play-field--disabled");
    }, 200);
}

function closeExitGameDiv() {
    const backToGameButton = document.getElementById("field__button-back-to-game") as HTMLButtonElement | null;
    backToGameButton?.addEventListener("click", () => {
        closeExitDiv();
    });
}

function exitGameButtonEvent(){
    const exitGameButton = document.getElementById("field__button-exit-game") as HTMLButtonElement | null;
    const exitGameButtonWin = document.getElementById("winner-screen__button") as HTMLButtonElement | null;
    const drawContentButton = document.getElementById("draw-screen__draw-button") as HTMLButtonElement;
    exitGameButton?.addEventListener("click", () => {
        resetGameAndBackToMenu();
    });
    exitGameButtonWin?.addEventListener("click", () => {
        resetGameAndBackToMenu();
        winnerScreenContent?.classList.add("display-none");
    });
    drawContentButton?.addEventListener("click", () => {
        resetGameAndBackToMenu();
        drawContentDiv?.classList.add("display-none");
    });
}

function resetGameAndBackToMenu(){
    const settingsContent = document.getElementById("settings-content");
    const field = document.getElementById("field");
    const cardField = document.getElementById("card__card-play-field");
    const counterBlue = document.getElementById("field-counter-blue");
    const counterOrange = document.getElementById("field-counter-orange");
    closeExitDiv();
    resetTextFieldsSettings();
    orangeScore = 0;
    blueScore = 0;
    if (counterOrange) {
        counterOrange.innerText = "0";
    }
    if (counterBlue) {
        counterBlue.innerText = "0";
    }
    isMultiplayer = false;
    selectedBoardSize = 0;
    flippedCards = [];
    flippedCardElements = [];
    shuffledCards = [];
    resetInputs();
    settingsContent?.classList.remove("display-none");
    field?.classList.add("display-none");
    cardField?.classList.remove("card__card-play-field--disabled");
}

function playerInputEvent() {
    bluePlayerInput?.addEventListener("click", (event) => {
        togglePlayerInput(event);
        updatePlayerPreview();
    });
    orangePlayerInput?.addEventListener("click", (event) => {
        togglePlayerInput(event);
        updatePlayerPreview();
    });
}

function togglePlayerInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.dataset.wasChecked === "true") {
        input.checked = false;
        input.dataset.wasChecked = "false";
    } else {
        input.checked = true;
        input.dataset.wasChecked = "true";
    }
}

function resetInputs(){
    const themeInputs = document.getElementsByName("boardTheme");
    const boardSizeInputs = document.getElementsByName("boardSize");
    themeInputs.forEach((input) => {
        (input as HTMLInputElement).checked = false;
    });
    boardSizeInputs.forEach((input) => {
        (input as HTMLInputElement).checked = false;
    });
    if (orangePlayerInput && bluePlayerInput) {
        orangePlayerInput.checked = false;
        bluePlayerInput.checked = false;
    }
}

function resetTextFieldsSettings(){
    const playerPreview = document.getElementById("settings-content__final-settings-game-text-player") as HTMLParagraphElement | null;
    const gamingThemeText = document.getElementById("settings-content__final-settings-game-text") as HTMLParagraphElement;
    if (playerPreview) {
        playerPreview.innerText = "Player";
    }
    gamingThemeText.innerText = "Game theme";
    if (fieldSizeText) {
        fieldSizeText.innerText = "Board size";
    }
}

function checkIfGameIsOver(){
    const cards = document.getElementsByClassName("card__card-div");
    const field = document.getElementById("field");
    const allCardsFlipped = Array.from(cards).every((card) => {
        return card.classList.contains("is-flipped");
    });
    if (allCardsFlipped && blueScore !== orangeScore) {
        whoisTheWinner();
        field?.classList.add("display-none");
    }
}

function whoisTheWinner(){
    const gameOverScreen = document.getElementById("game-over") as HTMLDivElement || null;
    if (winnerColorTextDiv){
        if(blueScore > orangeScore){
            winnerColorTextDiv.innerText = "BLUE PLAYER";
            winnerColorTextDiv.classList.add("winner-screen__blue-winner");
            if(selectedTheme === "code"){
                winnerChessImage.src = "./src/assets/fonts/images/chessBlue.png";
            }
            gameOverScreen.classList.remove("display-none");
            setTimeout(() => {
                gameOverScreen.classList.add("display-none");
                winnerScreenContent?.classList.remove("display-none");
            }, 2000);
        } else if(orangeScore > blueScore){
            winnerColorTextDiv.innerText = "ORANGE PLAYER";
            winnerColorTextDiv.classList.add("winner-screen__orange-winner");
            if(selectedTheme === "code"){
                winnerChessImage.src = "./src/assets/fonts/images/chessOrange.png";
            }
            gameOverScreen.classList.remove("display-none");
            setTimeout(() => {
                gameOverScreen.classList.add("display-none");
                winnerScreenContent?.classList.remove("display-none");
            }, 2000);
        } else if (orangeScore === blueScore){
            gameOverScreen.classList.remove("display-none");
            setTimeout(() => {
                gameOverScreen.classList.add("display-none");
                drawContentDiv.classList.remove("display-none");
            }, 2000);
        }
    }
}