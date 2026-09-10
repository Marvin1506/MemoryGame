import { type Card } from "./cards";
import {
    codeCardsTemplate, codeGameFieldTemplate, drawScreenCodeTemplate,
    drawScreenGamingTemplate, gameOverScreenCodeTemplate,
    gameOverScreenGamingTemplate, gamingCardsTemplate, gamingGameFieldTemplate,
    winnerScreenCodeTemplate, winnerScreenGamingTemplate
} from "./templates/templates";

export type PlayerColor = "blue" | "orange";
export type Theme = "code" | "gaming";

/**
 * Randomizes the order of the provided cards without modifying
 * the original array.
 * @param cards - The cards that should be shuffled.
 * @returns A new array containing the shuffled cards.
 */
export function shuffleCards(cards: Card[]) {
    return [...cards].sort(() => Math.random() - 0.5);
}

/**
 * Renders all templates used by the code theme.
 * @param field - The main game field element.
 * @param winnerScreen - The screen displayed when a player wins.
 * @param gameOverScreen - The intermediate game-over screen.
 * @param drawScreen - The screen displayed when the game ends in a draw.
 */
export function renderCodeTemplates(field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = codeGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenCodeTemplate();
    gameOverScreen.innerHTML = gameOverScreenCodeTemplate();
    drawScreen.innerHTML = drawScreenCodeTemplate();
}

/**
 * Renders all templates used by the gaming theme.
 * @param field - The main game field element.
 * @param winnerScreen - The screen displayed when a player wins.
 * @param gameOverScreen - The intermediate game-over screen.
 * @param drawScreen - The screen displayed when the game ends in a draw.
 */
export function renderGamingTemplates(field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = gamingGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenGamingTemplate();
    gameOverScreen.innerHTML = gameOverScreenGamingTemplate();
    drawScreen.innerHTML = drawScreenGamingTemplate();
}

/**
 * Applies the selected theme classes to all end-game screens
 * and initially hides them.
 * @param winnerScreen - The winner screen element.
 * @param gameOverScreen - The game-over screen element.
 * @param drawScreen - The draw screen element.
 * @param theme - The currently selected game theme.
 */
export function setEndScreenClasses(winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement, theme: Theme) {
    winnerScreen.className = `winner-screen winner-screen--${theme} display-none`;
    gameOverScreen.className = `game-over game-over--${theme} display-none`;
    drawScreen.className = `draw-screen draw-screen--${theme} display-none`;
}

/**
 * Renders all cards inside the card field using the template
 * that belongs to the selected theme.
 * @param cardField - The element in which the cards are rendered.
 * @param cards - The cards that should be displayed.
 * @param theme - The currently selected game theme.
 */
export function renderCards(cardField: HTMLDivElement, cards: Card[], theme: Theme) {
    const cardTemplate = theme === "code" ? codeCardsTemplate : gamingCardsTemplate;
    for (let i = 0; i < cards.length; i++) {
        cardField.innerHTML += cardTemplate(cards[i], i);
    }
}

/**
 * Displays the exit-game dialog and temporarily disables
 * interaction with the card field.
 * @param exitDiv - The exit-game dialog element.
 * @param cardField - The card field that should be disabled.
 */
export function showExitGameDiv(exitDiv: HTMLElement, cardField: HTMLElement | null) {
    exitDiv.classList.remove("display-none");
    cardField?.classList.add("card__card-play-field--disabled");
    setTimeout(() => {
        exitDiv.classList.add("field__exit-div--open");
        exitDiv.classList.remove("field__exit-div--close");
    }, 10);
}

/**
 * Closes the exit-game dialog and enables interaction
 * with the card field again.
 */
export function closeExitDiv() {
    const exitDiv = document.getElementById("field__exit-div");
    if (!exitDiv) return;
    exitDiv.classList.add("field__exit-div--close");
    setTimeout(() => {
        exitDiv.classList.remove("field__exit-div--open", "field__exit-div--close");
        exitDiv.classList.add("display-none");
        document.getElementById("card__card-play-field")?.classList.remove("card__card-play-field--disabled");
    }, 200);
}

/**
 * Resets the displayed score of both players to zero.
 */
export function resetScoreDisplay() {
    const blueCounter = document.getElementById("field-counter-blue");
    const orangeCounter = document.getElementById("field-counter-orange");
    if (blueCounter) blueCounter.innerText = "0";
    if (orangeCounter) orangeCounter.innerText = "0";
}

/**
 * Displays the settings menu, hides the game field and removes
 * the disabled state from the card field.
 */
export function showSettingsMenu() {
    document.getElementById("settings-content")?.classList.remove("display-none");
    document.getElementById("field")?.classList.add("display-none");
    document.getElementById("card__card-play-field")?.classList.remove("card__card-play-field--disabled");
}

/**
 * Updates the winner text, color class and winner image according
 * to the winning player and selected theme.
 * @param winner - The color of the winning player.
 * @param theme - The currently selected game theme.
 */
export function updateWinnerContent(winner: PlayerColor, theme: Theme) {
    const winnerText = document.getElementById("winner-screen__color-winner");
    const winnerImage = document.getElementById("winner-picture") as HTMLImageElement | null;
    if (!winnerText || !winnerImage) return;
    winnerText.innerText = `${winner.toUpperCase()} PLAYER`;
    winnerText.classList.remove("winner-screen__blue-winner", "winner-screen__orange-winner");
    winnerText.classList.add(`winner-screen__${winner}-winner`);
    if (theme === "code") {
        winnerImage.src = winner === "blue"
            ? "./assets/fonts/images/chessBlue.png"
            : "./assets/fonts/images/chessOrange.png";
    }
}

/**
 * Briefly displays the game-over screen before showing
 * the final winner or draw screen.
 * @param gameOverScreen - The temporary game-over screen.
 * @param resultScreen - The winner or draw screen to display afterwards.
 */
export function showResultScreen(gameOverScreen: HTMLElement, resultScreen: HTMLElement | null) {
    gameOverScreen.classList.remove("display-none");
    setTimeout(() => {
        gameOverScreen.classList.add("display-none");
        resultScreen?.classList.remove("display-none");
    }, 2000);
}

/** Opens the settings screen from the home screen. */
export function goToSetting() {
    const playButton = document.getElementById("play-button");
    const homeScreen = document.getElementById("home-content");
    const settingsContent = document.getElementById("settings-content");
    playButton?.addEventListener("click", () => {
        homeScreen?.classList.add("display-none");
        settingsContent?.classList.remove("display-none");
    });
}

/**
 * Toggles the checked state of a player input.
 * @param event - The click event triggered by the input.
 */
export function togglePlayerInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const wasChecked = input.dataset.wasChecked === "true";
    input.checked = !wasChecked;
    input.dataset.wasChecked = String(!wasChecked);
}

/**
 * Resets all theme, board-size and player inputs.
 * @param orangeInput - The orange player input.
 * @param blueInput - The blue player input.
 */
export function resetInputs(orangeInput: HTMLInputElement | null, blueInput: HTMLInputElement | null) {
    document.getElementsByName("boardTheme").forEach(input => {
        (input as HTMLInputElement).checked = false;
    });
    document.getElementsByName("boardSize").forEach(input => {
        (input as HTMLInputElement).checked = false;
    });
    resetPlayerInput(orangeInput);
    resetPlayerInput(blueInput);
}

/**
 * Resets a player input and clears its previously stored checked state.
 * @param input - The player input that should be reset.
 */
function resetPlayerInput(input: HTMLInputElement | null) {
    if (!input) return;
    input.checked = false;
    input.dataset.wasChecked = "false";
}

/**
 * Resets the displayed settings summary.
 * @param fieldSizeText - The element displaying the selected board size.
 */
export function resetTextFieldsSettings(fieldSizeText: HTMLParagraphElement | null) {
    const playerPreview = document.getElementById(
        "settings-content__final-settings-game-text-player"
    );
    const themeText = document.getElementById(
        "settings-content__final-settings-game-text"
    );
    if (playerPreview) playerPreview.innerText = "Player";
    if (themeText) themeText.innerText = "Game theme";
    if (fieldSizeText) fieldSizeText.innerText = "Board size";
}

/** Changes the button color when all required settings are selected. */
export function updateStartButtonColor() {
    const startButton = document.getElementById("final-settings-button") as HTMLButtonElement | null;
    const codeTheme = document.getElementById("codeVibe") as HTMLInputElement | null;
    const gamingTheme = document.getElementById("gamingTheme") as HTMLInputElement | null;
    const smallBoard = document.getElementById("smallBoard") as HTMLInputElement | null;
    const mediumBoard = document.getElementById("mediumBoard") as HTMLInputElement | null;
    const largeBoard = document.getElementById("largeBoard") as HTMLInputElement | null;
    const bluePlayer = document.getElementById("blue") as HTMLInputElement | null;
    const orangePlayer = document.getElementById("orange") as HTMLInputElement | null;
    const themeSelected = Boolean(codeTheme?.checked || gamingTheme?.checked);
    const boardSelected = Boolean(smallBoard?.checked || mediumBoard?.checked || largeBoard?.checked);
    const playerSelected = Boolean(bluePlayer?.checked || orangePlayer?.checked);
    if (startButton) startButton.style.backgroundColor = themeSelected && boardSelected && playerSelected ? "#F0EA6E" : "#DBDBD6";
}

/** Registers the button color update for all settings inputs. */
export function startButtonColorEvent() {
    const inputs = document.querySelectorAll<HTMLInputElement>(".settings-content__radio-input");
    inputs.forEach(input => {input.addEventListener("click", updateStartButtonColor);});
    updateStartButtonColor();
}

/**
 * Switches between the incomplete and completed settings line.
 * @param incompleteLineId - The ID of the incomplete settings line.
 * @param completedLineId - The ID of the completed settings line.
 * @param isSelected - Indicates whether the setting is selected.
 */
function updateSettingsLine(incompleteLineId: string,completedLineId: string,isSelected: boolean) {
    const incompleteLine = document.getElementById(incompleteLineId);
    const completedLine = document.getElementById(completedLineId);
    incompleteLine?.classList.toggle("display-none", isSelected);
    completedLine?.classList.toggle("display-none", !isSelected);
}

/** Updates the settings line after selecting a game theme. */
export function updateThemeSettingsLine() {
    const codeTheme = document.getElementById("codeVibe") as HTMLInputElement | null;
    const gamingTheme = document.getElementById("gamingTheme") as HTMLInputElement | null;
    const themeSelected = Boolean(codeTheme?.checked || gamingTheme?.checked);
    updateSettingsLine("line-no-settings-board", "line-settings-done-board", themeSelected);
}

/** Updates the settings line after selecting at least one player. */
export function updatePlayerSettingsLine() {
    const bluePlayer = document.getElementById("blue") as HTMLInputElement | null;
    const orangePlayer = document.getElementById("orange") as HTMLInputElement | null;
    const playerSelected = Boolean(bluePlayer?.checked || orangePlayer?.checked);
    updateSettingsLine( "line-no-settings-player", "line-settings-done-player", playerSelected);
}