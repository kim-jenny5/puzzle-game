# Animal Crossing Puzzle Game

A drag-and-drop puzzle game built with React and GSAP, with Animal Crossing characters!

Built as a personal project to practice GSAP, exploring animations, timelines, physics plugins, and the `useGSAP` hook in a React + TypeScript / Vite setup.

> **Disclaimer:** This project is for learning purposes only and is not affiliated with or endorsed by Nintendo. All Animal Crossing characters and assets are the intellectual property of Nintendo Co., Ltd.

## How it works

Puzzle pieces (Tom Nook, Isabelle, KK Slider, and friends) are scattered on either side of the board. Drag each piece onto its matching shadow to place it. Place them all to complete the game.

## Tech

- **React 19** + **TypeScript**
- **GSAP** — drag-and-drop via `Draggable`, physics-based sparkle particles via `Physics2DPlugin`, sequenced animations via timelines and `useGSAP`
- **Tailwind CSS v4**
- **Vite**

## Features

- Loading screen with staggered fruit animations and a dot counter driven by a GSAP ticker
- Inertia-based dragging with a 70% overlap threshold for snapping pieces to their targets
- Sparkle burst on each successful placement
- Victory sequence: screen dim → play-again prompt, composed as a single GSAP timeline
- Components scoped with `useGSAP`'s `scope` option to keep selector targeting isolated
