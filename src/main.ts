import './styles/style.scss'
import { codeCards, gamingCards, type Card } from "./cards";
import {codeGameFieldTemplate,gamingGameFieldTemplate, winnerScreenCodeTemplate, gameOverScreenCodeTemplate,
drawScreenCodeTemplate,gameOverScreenGamingTemplate, winnerScreenGamingTemplate, drawScreenGamingTemplate, gamingCardsTemplate, codeCardsTemplate} from "./templates/templates";
const codeVibeThemeInput = document.getElementById("codeVibe");
const gamingThemeInput = document.getElementById("gamingTheme");
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
type PlayerColor = "blue" | "orange";
type Theme = "code" | "gaming";

function init(){
    goToSetting();
    goToBoard();
    changePreviewImage();
    choosePlayer();
    chooseBoardSize();
    playerInputEvent();
}

init();

function cardFlip() {
    const fieldRef = document.getElementById("card__card-play-field");
    fieldRef?.addEventListener("click", handleCardClick);
}

function handleCardClick(event: Event) {
    if (flippedCards.length === 2) return;
    const cardElement = (event.target as HTMLElement).closest<HTMLButtonElement>(".card__card-div");
    if (!cardElement) return;
    const card = shuffledCards[Number(cardElement.dataset.cardIndex)];
    if (!card || card.isFlipped || card.isMatched) return;
    card.isFlipped = true;
    cardElement.classList.add("is-flipped");
    flippedCards.push(card);
    flippedCardElements.push(cardElement);
    if (flippedCards.length < 2) return;
    checkForMatch();
    setTimeout(checkIfGameIsOver, 1000);
}

function selectSingleOrMultiplayer() {
    isMultiplayer = Boolean(bluePlayerInput?.checked && orangePlayerInput?.checked);
}

function selectCurrentPlayer() {
    if (isMultiplayer) {
        currentPlayer = Math.random() < 0.5 ? "blue" : "orange";
        return;
    }
    currentPlayer = bluePlayerInput?.checked ? "blue" : "orange";
}

function showPlayerIcon() {
    const currentPlayerTurn = document.getElementById("field__current-player-playing-div");
    if (!currentPlayerTurn) return;
    const playerIcon = selectedTheme === "code" ? `./src/assets/fonts/images/${currentPlayer}LabelPic.png` : "./src/assets/fonts/images/card_gaming_img/chessWhite.png";
    if (selectedTheme === "gaming") {
        currentPlayerTurn.style.backgroundColor = currentPlayer === "blue" ? "#1FAAFC" : "#EA6900";
    }
    currentPlayerTurn.innerHTML = `<img src="${playerIcon}">`;
}

function switchPlayer() {
    if (!isMultiplayer) return;
    currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
    showPlayerIcon();
}

function increaseScore() {
    const counter = document.getElementById(`field-counter-${currentPlayer}`);
    const gameOverCounter = document.getElementById(`game-over__${currentPlayer}-counter`);
    if (!counter || !gameOverCounter) return;
    const score = currentPlayer === "blue" ? ++blueScore : ++orangeScore;
    counter.innerText = score.toString();
    gameOverCounter.innerText = score.toString();
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.id === secondCard.id) {
        firstCard.isMatched = secondCard.isMatched = true;
        increaseScore();
        resetFlippedCards();
        return;
    }
    setTimeout(resetMismatchedCards, 1000);
}

function resetFlippedCards() {
    flippedCards = [];
    flippedCardElements = [];
}

function resetMismatchedCards() {
    flippedCards.forEach(card => card.isFlipped = false);
    flippedCardElements.forEach(element =>
        element.classList.remove("is-flipped")
    );
    switchPlayer();
    resetFlippedCards();
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
        startGameFunctions();
        settingsContent?.classList.add("display-none");
        playContent?.classList.remove("display-none");
    });
}

function startGameFunctions() {
    selectSingleOrMultiplayer();
    selectCurrentPlayer();
    renderGameField();
    showPlayerIcon();
    addCardsToField();
    cardFlip();
    openExitGameDiv();
    closeExitGameDiv();
    exitGameButtonEvent();
}

function changePreviewImage() {
    const previewImg = document.getElementById("settings-content__preview-image") as HTMLImageElement | null;
    const gamingThemeText = document.getElementById("settings-content__final-settings-game-text") as HTMLParagraphElement;
    if (!previewImg) return;
    codeVibeThemeInput?.addEventListener("click", () =>
        selectCodeTheme(previewImg, gamingThemeText)
    );
    gamingThemeInput?.addEventListener("click", () =>
        selectGamingTheme(previewImg, gamingThemeText)
    );
}

function selectCodeTheme(previewImg: HTMLImageElement, gamingThemeText: HTMLParagraphElement) {
    selectedTheme = "code";
    previewImg.src = images[0];
    gamingThemeText.innerText = "Code vibes theme";
}

function selectGamingTheme(previewImg: HTMLImageElement, gamingThemeText: HTMLParagraphElement) {
    selectedTheme = "gaming";
    previewImg.src = images[1];
    gamingThemeText.innerText = "Gaming theme";
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
    setEndScreenClasses(winnerScreen, gameOverScreen, drawScreen);
    if(selectedTheme === "code"){
        renderCodeTemplates(field, winnerScreen, gameOverScreen, drawScreen);
    } else if(selectedTheme === "gaming") {
       renderGamingTemplates(field, winnerScreen, gameOverScreen, drawScreen);
    }
}

function renderCodeTemplates( field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = codeGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenCodeTemplate();
    gameOverScreen.innerHTML = gameOverScreenCodeTemplate();
    drawScreen.innerHTML = drawScreenCodeTemplate();
}

function renderGamingTemplates( field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = gamingGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenGamingTemplate();
    gameOverScreen.innerHTML = gameOverScreenGamingTemplate();
    drawScreen.innerHTML = drawScreenGamingTemplate();
}

function setEndScreenClasses(winnerScreen: HTMLElement,gameOverScreen: HTMLElement,drawScreen: HTMLElement) {
    winnerScreen.className = `winner-screen winner-screen--${selectedTheme} display-none`;
    gameOverScreen.className = `game-over game-over--${selectedTheme} display-none`;
    drawScreen.className = `draw-screen draw-screen--${selectedTheme} display-none`;
}

function addCardsToField() {
    const cardField = document.getElementById("card__card-play-field") as HTMLDivElement | null;
    if (!cardField) return;
    setCardFieldSize();
    cardField.className = `card__card-play-field card__card-play-field--${selectedTheme}`;
    cardField.innerHTML = "";
    shuffledCards = shuffleCards(getSelectedCards());
    renderCards(cardField);
}

function getSelectedCards() {
    if (selectedTheme === "code") {
        return codeCards.slice(0, selectedBoardSize);
    }
    return gamingCards.slice(0, selectedBoardSize);
}

function renderCards(cardField: HTMLDivElement) {
    const cardTemplate = selectedTheme === "code" ? codeCardsTemplate: gamingCardsTemplate;
    for (let i = 0; i < shuffledCards.length; i++) {
        const card = shuffledCards[i];
        cardField.innerHTML += cardTemplate(card, i);
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