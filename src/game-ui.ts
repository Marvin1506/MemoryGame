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
            ? "./src/assets/fonts/images/chessBlue.png"
            : "./src/assets/fonts/images/chessOrange.png";
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
