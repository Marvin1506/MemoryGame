# 🧠 Memory Game

A modern and interactive **Memory Card Game** built with **TypeScript and SCSS**.

The game goes beyond the classic memory concept by offering different themes, game modes and board sizes. Players can compete against each other or play alone while trying to find all matching card pairs.

The project was developed with a strong focus on **TypeScript, modular code structure, game logic and dynamic UI rendering**.

---

## 🎥 Gameplay Preview

https://github.com/user-attachments/assets/1c9a8a7d-21b5-4c0f-80f7-0d2058e89d1d

---

## 📸 Screenshot

<img width="2505" height="1241" alt="Screenshot 2026-09-10 143620" src="https://github.com/user-attachments/assets/182c9c16-7d34-49a2-bf28-afbcc3211eb7" />

---

## 🚀 Live Demo

👉 https://marvin-mutwil.developerakademie.net/A-Developer-Akademie-Projekte/MemoryGame/index.html

---

## ✨ Features

- 🧠 Classic memory matching gameplay
- 👤 Single-player mode
- 👥 Multiplayer mode
- 🎨 Two different themes: **Code & Gaming**
- 🃏 Different card sets depending on the selected theme
- 📐 Multiple board sizes
- 🎯 Dynamic score system
- 🔄 Automatic player switching
- 🏆 Winner detection
- 🤝 Draw detection
- 🎬 Winner and Game Over screens
- 🎮 Dynamic player selection
- 🔵🟠 Individual player colors
- 🔀 Randomized card positions on every game
- 🔁 Restart and return-to-menu functionality
- 📱 Responsive user interface

---

## 🎮 How to Play

1. Choose between **Single Player** and **Multiplayer**.
2. Select your preferred **board size**.
3. Choose between the **Code** and **Gaming** theme.
4. Select your player.
5. Start the game and flip two cards.
6. Matching cards stay revealed.
7. In multiplayer mode, turns switch between players.
8. Find all matching pairs to finish the game.

The player with the highest score wins.

---

## 🛠️ Technologies

![TypeScript](https://img.shields.io/badge/TypeScript-TS-blue)
![SCSS](https://img.shields.io/badge/SCSS-Sass-pink)
![HTML5](https://img.shields.io/badge/HTML5-HTML-orange)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple)

**Core technologies:**

- TypeScript
- SCSS
- HTML5
- Vite
- Git & GitHub

---

## 🧩 Technical Highlights

### Dynamic Card Generation

Cards are generated dynamically depending on the selected theme and board configuration. The card set is shuffled before being rendered to ensure a different game layout on every round.

### Game State Management

The application keeps track of:

- selected game mode
- current player
- player scores
- selected theme
- board configuration
- flipped cards
- matched pairs
- game state

### Match Detection

After two cards are flipped, the game checks whether they form a matching pair.

If they match, the corresponding player receives a point. Otherwise, the cards are flipped back and the next turn begins.

### Dynamic UI

Large parts of the interface are rendered and updated dynamically with TypeScript depending on the current game state, selected theme and game mode.

---

## 🧠 What I Learned

This project helped me strengthen my understanding of **TypeScript and application architecture**.

Some of the main topics I worked with include:

- Building an interactive application with **TypeScript**
- Structuring a larger codebase into reusable functions and modules
- Separating card data and game logic
- Managing different application and game states
- Implementing single- and multiplayer logic
- Creating dynamic HTML templates
- Working with event listeners and DOM manipulation
- Implementing card matching and score logic
- Randomizing game data
- Building reusable SCSS components
- Creating responsive layouts
- Debugging and refactoring increasingly complex application logic

---

## 🎯 Project Purpose

The goal of this project was not only to recreate the classic Memory game, but to build a more configurable application with multiple game modes, themes and dynamic game states.

A major focus was placed on writing structured TypeScript and refactoring the application as its complexity increased.

---

## 🔮 Future Improvements

- 🔊 Sound effects
- 💾 Persistent high scores
- 🤖 Computer opponent
- 🎨 Additional themes
- 🏅 Player statistics
- ✨ Additional card animations

---

## 👨‍💻 Author

**Marvin Mutwil**

GitHub: [@Marvin1506](https://github.com/Marvin1506)

---

## 📄 License

This project was created for educational and portfolio purposes.
