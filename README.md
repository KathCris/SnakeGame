# 🐍 Snake Game

<p align="center">
  A classic recreated with Vue.js.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white" alt="Nuxt" />
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</p>

---

## 🎮 About the Project

**Snake Game** is a recreation of the classic Snake game, built with Nuxt and Vue.js, focusing on interactivity, animations, and graphical rendering.

Rather than simply reproducing the traditional gameplay, this project explores different front-end development features with Nuxt.js to create a dynamic experience while revisiting development concepts related to this framework.

**Documentation link:** https://app.notion.com/p/Snake-Game-40750456b2768071b348c7898d75a2d5?source=copy_link 

## 🖼️ Preview

<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/a60be238-aedb-49ec-ba3d-340a1e0a0b0c" />


<img width="1916" height="915" alt="gif da cobrinha 2" src="https://github.com/user-attachments/assets/73c42d89-a123-4450-895b-79f2a39e6405" />


## ✨ Features

- **Dynamic movement:** control the snake using the arrow keys or WASD.
- **Segmented movement:** the head changes direction first, followed by the body through smooth animations.
- **Growth system:** the snake grows longer whenever it eats an apple.
- **Collision detection:** detects collisions with the board boundaries and the snake's own body.
- **Game Over and restart:** displays a Game Over screen and allows players to start a new game without reloading the page.
- **Sound effects:** sounds for movement, eating apples, and ending the game.
- **Audio controls:** option to enable or mute sound effects.
- **Scoring system:** tracks the number of apples collected.
- **Trophy system:** tracks achievements across multiple games.
- **Data persistence:** stores preferences and results using Web Storage.

## 🛠️ Technologies and Tools

| Technology     | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| Nuxt           | Application structure and organization                   |
| Vue.js         | Component architecture, reactivity, and state management |
| TypeScript     | Typing and development support                           |
| JavaScript     | Implementation of game rules and mechanics               |
| HTML Canvas    | Board and grid rendering                                 |
| SVG            | Snake body rendering using vector paths                  |
| Tailwind CSS   | Styling and element positioning                          |
| Web Audio API  | Sound effect generation                                  |
| LocalStorage   | Persistence of preferences and trophies                  |
| SessionStorage | Session data storage                                     |
| pnpm           | Dependency management                                    |

## 🧠 Technical Highlights

### Hybrid Rendering with Canvas and Vue

The board is drawn using HTML Canvas, while interactive elements are built with Vue components layered on top of the game area.

This approach combines Canvas rendering capabilities with the flexibility and reactivity of Vue components.

### Snake Body Rendering with SVG

The snake's body is represented by a single SVG element, dynamically generated from the position of each segment.

Using `stroke-linecap` and `stroke-linejoin` creates a continuous appearance between segments, preventing the body from looking like a sequence of independent blocks.

### Segment Animation

Movement uses position interpolation with `requestAnimationFrame`.

Instead of visually updating all segments at once, their positions are interpolated between the initial and final states, creating the effect of the body following the head's movement.

### Sound Effects with the Web Audio API

Sound effects are synthesized directly in the browser using the Web Audio API, without relying on external audio files.

The game includes specific sounds for movement, eating apples, and Game Over, along with an option to mute sound effects.

### State Management and Data Persistence

The application uses Vue's reactivity system to manage the game state, including movement, scoring, growth, collisions, and game completion.

Information that needs to remain available between games is stored using the browser's Web Storage APIs.

In the future, state management will be updated to a more robust and better-organized architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm | npm | yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/KathCris/SnakeGame.git
```

Navigate to the project directory:

```bash
cd SnakeGame
```

Install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the application at:

```text
http://localhost:3000
```

## 🔮 Future Improvements

- [ ] Implement difficulty levels.
- [ ] Add progressive speed increases.
- [ ] Develop new visual themes for the game.
- [ ] Improve responsiveness and the mobile experience with touch controls.
- [ ] Add new gameplay mechanics, such as the ability to control the number of apples and the snake's speed.

---

<p align="center">   Developed with 💚 and JavaScript. </p>

<p align="center">   <strong>Have fun and don't hit yourself! 🐍</strong> </p>
