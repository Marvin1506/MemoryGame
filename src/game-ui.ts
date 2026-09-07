import { type Card } from "./cards";
import {
    codeCardsTemplate, codeGameFieldTemplate, drawScreenCodeTemplate,
    drawScreenGamingTemplate, gameOverScreenCodeTemplate,
    gameOverScreenGamingTemplate, gamingCardsTemplate, gamingGameFieldTemplate,
    winnerScreenCodeTemplate, winnerScreenGamingTemplate
} from "./templates/templates";

export type PlayerColor = "blue" | "orange";
export type Theme = "code" | "gaming";

export function shuffleCards(cards: Card[]) {
    return [...cards].sort(() => Math.random() - 0.5);
}

export function renderCodeTemplates(field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = codeGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenCodeTemplate();
    gameOverScreen.innerHTML = gameOverScreenCodeTemplate();
    drawScreen.innerHTML = drawScreenCodeTemplate();
}

export function renderGamingTemplates(field: HTMLElement, winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement) {
    field.innerHTML = gamingGameFieldTemplate();
    winnerScreen.innerHTML = winnerScreenGamingTemplate();
    gameOverScreen.innerHTML = gameOverScreenGamingTemplate();
    drawScreen.innerHTML = drawScreenGamingTemplate();
}

export function setEndScreenClasses(winnerScreen: HTMLElement, gameOverScreen: HTMLElement, drawScreen: HTMLElement, theme: Theme) {
    winnerScreen.className = `winner-screen winner-screen--${theme} display-none`;
    gameOverScreen.className = `game-over game-over--${theme} display-none`;
    drawScreen.className = `draw-screen draw-screen--${theme} display-none`;
}

export function renderCards(cardField: HTMLDivElement, cards: Card[], theme: Theme) {
    const cardTemplate = theme === "code" ? codeCardsTemplate : gamingCardsTemplate;
    for (let i = 0; i < cards.length; i++) {
        cardField.innerHTML += cardTemplate(cards[i], i);
    }
}

export function showExitGameDiv(exitDiv: HTMLElement, cardField: HTMLElement | null) {
    exitDiv.classList.remove("display-none");
    cardField?.classList.add("card__card-play-field--disabled");
    setTimeout(() => {
        exitDiv.classList.add("field__exit-div--open");
        exitDiv.classList.remove("field__exit-div--close");
    }, 10);
}

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

export function resetScoreDisplay() {
    const blueCounter = document.getElementById("field-counter-blue");
    const orangeCounter = document.getElementById("field-counter-orange");
    if (blueCounter) blueCounter.innerText = "0";
    if (orangeCounter) orangeCounter.innerText = "0";
}

export function showSettingsMenu() {
    document.getElementById("settings-content")?.classList.remove("display-none");
    document.getElementById("field")?.classList.add("display-none");
    document.getElementById("card__card-play-field")?.classList.remove("card__card-play-field--disabled");
}

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

export function showResultScreen(gameOverScreen: HTMLElement, resultScreen: HTMLElement | null) {
    gameOverScreen.classList.remove("display-none");
    setTimeout(() => {
        gameOverScreen.classList.add("display-none");
        resultScreen?.classList.remove("display-none");
    }, 2000);
}
