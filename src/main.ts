import './styles/style.scss'
import { codeCards, gamingCards, type Card } from "./cards";
import {
    closeExitDiv, renderCards, renderCodeTemplates, renderGamingTemplates,
    resetScoreDisplay, setEndScreenClasses, showExitGameDiv, showResultScreen,
    showSettingsMenu, shuffleCards, updateWinnerContent, type PlayerColor, type Theme
} from "./game-ui";
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
            fieldSizeText.innerText = "36 cards";
        });
    }
}

function setCardFieldSize(){
    if(startButton && fieldSizeText?.innerText === "16 cards"){
        selectedBoardSize = 16;
    } else if(fieldSizeText?.innerText === "24 cards"){
        selectedBoardSize = 24;
    } else if(fieldSizeText?.innerText === "36 cards"){
        selectedBoardSize = 36;
    }
}

function renderGameField() {
    const field = document.getElementById("field");
    const winnerScreen = document.getElementById("winner-screen");
    const gameOverScreen = document.getElementById("game-over");
    const drawScreen = document.getElementById("draw-screen");
    if (!field || !winnerScreen || !gameOverScreen || !drawScreen) return;
    field.className = `field field--${selectedTheme}`;
    setEndScreenClasses(winnerScreen, gameOverScreen, drawScreen, selectedTheme);
    if(selectedTheme === "code"){
        renderCodeTemplates(field, winnerScreen, gameOverScreen, drawScreen);
    } else if(selectedTheme === "gaming") {
       renderGamingTemplates(field, winnerScreen, gameOverScreen, drawScreen);
    }
}

function addCardsToField() {
    const cardField = document.getElementById("card__card-play-field") as HTMLDivElement | null;
    if (!cardField) return;
    setCardFieldSize();
    cardField.className = `card__card-play-field card__card-play-field--${selectedTheme} card__card-play-field--${selectedBoardSize}`;
    cardField.innerHTML = "";
    shuffledCards = shuffleCards(getSelectedCards());
    renderCards(cardField, shuffledCards, selectedTheme);
}

function getSelectedCards() {
    if (selectedTheme === "code") {
        return codeCards.slice(0, selectedBoardSize);
    }
    return gamingCards.slice(0, selectedBoardSize);
}

function openExitGameDiv() {
    const exitButton = document.getElementById("field__button-exit");
    const exitDiv = document.getElementById("field__exit-div");
    const cardField = document.getElementById("card__card-play-field");
    if (!exitButton || !exitDiv) return;
    exitButton.addEventListener("click", () =>
        showExitGameDiv(exitDiv, cardField)
    );
}

function closeExitGameDiv() {
    const backToGameButton = document.getElementById("field__button-back-to-game") as HTMLButtonElement | null;
    backToGameButton?.addEventListener("click", () => {
        closeExitDiv();
    });
}

function exitGameButtonEvent() {
    addExitButtonEvent("field__button-exit-game");
    addExitButtonEvent("winner-screen__button", winnerScreenContent);
    addExitButtonEvent("draw-screen__draw-button", drawContentDiv);
}

function addExitButtonEvent( buttonId: string, screen?: HTMLElement | null) {
    document.getElementById(buttonId)?.addEventListener("click", () => {
        resetGameAndBackToMenu();
        screen?.classList.add("display-none");
    });
}

function resetGameAndBackToMenu() {
    closeExitDiv();
    resetTextFieldsSettings();
    resetGameState();
    resetScoreDisplay();
    resetInputs();
    showSettingsMenu();
}

function resetGameState() {
    orangeScore = 0;
    blueScore = 0;
    isMultiplayer = false;
    selectedBoardSize = 0;
    shuffledCards = [];
    resetFlippedCards();
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

function whoisTheWinner() {
    const gameOverScreen = document.getElementById("game-over");
    if (!gameOverScreen) return;
    if (blueScore === orangeScore) {
        showResultScreen(gameOverScreen, drawContentDiv);
        return;
    }
    const winner = blueScore > orangeScore ? "blue" : "orange";
    updateWinnerContent(winner, selectedTheme);
    showResultScreen(gameOverScreen, winnerScreenContent);
}