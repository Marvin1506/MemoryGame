import './styles/style.scss'
import { codeCards, gamingCards, type Card } from "./cards";
import {
    closeExitDiv, renderCards, renderCodeTemplates, renderGamingTemplates,
    resetScoreDisplay, setEndScreenClasses, showExitGameDiv, showResultScreen,
    showSettingsMenu, shuffleCards, updateWinnerContent, goToSetting, togglePlayerInput,
    resetInputs, resetTextFieldsSettings, type PlayerColor, type Theme
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
const images: string[] = ["./assets/fonts/images/codeVibeTheme.png", "./assets/fonts/images/gamingTheme.png"];
let flippedCards: Card[] = [];
let flippedCardElements: HTMLButtonElement[] = [];
let shuffledCards: Card[] = [];

/** Initializes the game and registers all required event listeners. */
function init(){
    goToSetting();
    goToBoard();
    changePreviewImage();
    choosePlayer();
    chooseBoardSize();
    playerInputEvent();
}

init();

/** Registers the click event listener for the card field. */
function cardFlip() {
    const fieldRef = document.getElementById("card__card-play-field");
    fieldRef?.addEventListener("click", handleCardClick);
}

/**
 * Handles a click on a memory card.
 * @param event The click event triggered on the card field.
 */
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

/** Determines whether single-player or multiplayer mode is selected. */
function selectSingleOrMultiplayer() {
    isMultiplayer = Boolean(bluePlayerInput?.checked && orangePlayerInput?.checked);
}

/** Selects the player who starts the game. */
function selectCurrentPlayer() {
    if (isMultiplayer) {
        currentPlayer = Math.random() < 0.5 ? "blue" : "orange";
        return;
    }
    currentPlayer = bluePlayerInput?.checked ? "blue" : "orange";
}

/** Displays the icon and color of the current player. */
function showPlayerIcon() {
    const currentPlayerTurn = document.getElementById("field__current-player-playing-div");
    if (!currentPlayerTurn) return;
    const playerIcon = selectedTheme === "code" ? `./assets/fonts/images/${currentPlayer}LabelPic.png` : "./assets/fonts/images/card_gaming_img/chessWhite.png";
    if (selectedTheme === "gaming") {
        currentPlayerTurn.style.backgroundColor = currentPlayer === "blue" ? "#1FAAFC" : "#EA6900";
    }
    currentPlayerTurn.innerHTML = `<img src="${playerIcon}">`;
}

/** Switches between the blue and orange player in multiplayer mode. */
function switchPlayer() {
    if (!isMultiplayer) return;
    currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
    showPlayerIcon();
}

/** Increases and displays the score of the current player. */
function increaseScore() {
    const counter = document.getElementById(`field-counter-${currentPlayer}`);
    const gameOverCounter = document.getElementById(`game-over__${currentPlayer}-counter`);
    if (!counter || !gameOverCounter) return;
    const score = currentPlayer === "blue" ? ++blueScore : ++orangeScore;
    counter.innerText = score.toString();
    gameOverCounter.innerText = score.toString();
}

/** Checks whether the two currently flipped cards match. */
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

/** Clears the arrays containing the currently flipped cards. */
function resetFlippedCards() {
    flippedCards = [];
    flippedCardElements = [];
}

/** Turns non-matching cards back over and switches the player. */
function resetMismatchedCards() {
    flippedCards.forEach(card => card.isFlipped = false);
    flippedCardElements.forEach(element =>
        element.classList.remove("is-flipped")
    );
    switchPlayer();
    resetFlippedCards();
}

/** Starts the game when all required settings have been selected. */
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

/** Executes all functions required to start the game. */
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

/** Registers the event listeners for selecting a game theme. */
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

/**
 * Selects the code theme and updates its preview.
 * @param previewImg The image element displaying the theme preview.
 * @param gamingThemeText The element displaying the selected theme.
 */
function selectCodeTheme(previewImg: HTMLImageElement, gamingThemeText: HTMLParagraphElement) {
    selectedTheme = "code";
    previewImg.src = images[0];
    gamingThemeText.innerText = "Code vibes theme";
}

/**
 * Selects the gaming theme and updates its preview.
 * @param previewImg The image element displaying the theme preview.
 * @param gamingThemeText The element displaying the selected theme.
 */
function selectGamingTheme(previewImg: HTMLImageElement, gamingThemeText: HTMLParagraphElement) {
    selectedTheme = "gaming";
    previewImg.src = images[1];
    gamingThemeText.innerText = "Gaming theme";
}

/** Registers the event listeners for selecting the players. */
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

/** Updates the displayed summary of the selected players. */
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

/** Registers the event listeners for selecting the board size. */
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

/** Stores the selected number of cards. */
function setCardFieldSize(){
    if(startButton && fieldSizeText?.innerText === "16 cards"){
        selectedBoardSize = 16;
    } else if(fieldSizeText?.innerText === "24 cards"){
        selectedBoardSize = 24;
    } else if(fieldSizeText?.innerText === "36 cards"){
        selectedBoardSize = 36;
    }
}

/** Renders the game field for the selected theme. */
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

/** Selects, shuffles and adds the cards to the game field. */
function addCardsToField() {
    const cardField = document.getElementById("card__card-play-field") as HTMLDivElement | null;
    if (!cardField) return;
    setCardFieldSize();
    cardField.className = `card__card-play-field card__card-play-field--${selectedTheme} card__card-play-field--${selectedBoardSize}`;
    cardField.innerHTML = "";
    shuffledCards = shuffleCards(getSelectedCards());
    renderCards(cardField, shuffledCards, selectedTheme);
}

/** Returns fresh cards for the selected theme and board size. */
function getSelectedCards(): Card[] {
    const cards = selectedTheme === "code"? codeCards : gamingCards;
    return cards.slice(0, selectedBoardSize).map(card => ({
        ...card,
        isFlipped: false,
        isMatched: false
    }));
}

/** Registers the event listener for opening the exit dialog. */
function openExitGameDiv() {
    const exitButton = document.getElementById("field__button-exit");
    const exitDiv = document.getElementById("field__exit-div");
    const cardField = document.getElementById("card__card-play-field");
    if (!exitButton || !exitDiv) return;
    exitButton.addEventListener("click", () =>
        showExitGameDiv(exitDiv, cardField)
    );
}

/** Registers the event listener for closing the exit dialog. */
function closeExitGameDiv() {
    const backToGameButton = document.getElementById("field__button-back-to-game") as HTMLButtonElement | null;
    backToGameButton?.addEventListener("click", () => {
        closeExitDiv();
    });
}

/** Registers the buttons used to exit and reset the game. */
function exitGameButtonEvent() {
    addExitButtonEvent("field__button-exit-game");
    addExitButtonEvent("winner-screen__button", winnerScreenContent);
    addExitButtonEvent("draw-screen__draw-button", drawContentDiv);
}

/**
 * Registers an event listener for an exit button.
 * @param buttonId The ID of the exit button.
 * @param screen An optional screen that is hidden after the click.
 */
function addExitButtonEvent( buttonId: string, screen?: HTMLElement | null) {
    document.getElementById(buttonId)?.addEventListener("click", () => {
        resetGameAndBackToMenu();
        screen?.classList.add("display-none");
    });
}

/** Resets the game and returns to the settings screen. */
function resetGameAndBackToMenu() {
    closeExitDiv();
    resetTextFieldsSettings(fieldSizeText);
    resetGameState();
    resetScoreDisplay();
    resetInputs(orangePlayerInput, bluePlayerInput);
    showSettingsMenu();
}

/** Resets scores, game mode and temporary card data. */
function resetGameState() {
    orangeScore = 0;
    blueScore = 0;
    isMultiplayer = false;
    selectedBoardSize = 0;
    shuffledCards = [];
    resetFlippedCards();
}

/** Registers the event listeners for the player inputs. */
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

/** Checks whether all card pairs have been found. */
function checkIfGameIsOver(){
    const cards = document.getElementsByClassName("card__card-div");
    const field = document.getElementById("field");
    const allCardsFlipped = Array.from(cards).every((card) => {
        return card.classList.contains("is-flipped");
    });
    if (!allCardsFlipped) return;
    whoisTheWinner();
    field?.classList.add("display-none");
}

/** Determines the winner or draw and displays the corresponding screen. */
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