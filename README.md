<p align="center">
  <img src="assets/logo.png" alt="Folio" width="200">
</p>

## Overview

Small web app that recommends a fiction book based on your taste

Answer a quick 3-step quiz and get a book that matches your genre, era and must-have detail

## Features

* **3-step quiz:** choose a genre, an era and one detail your next book must have
* **Smart matching:** finds a book that fits all three choices, or the closest match when none does
* **Book card:** shows the cover, author, matched tags and synopsis
* **Responsive:** works on desktop and mobile

## How to Use

* **Access online:** Open the [FOLIO website](https://keithnery.github.io/FOLIO/) directly in your browser.
* **Take the quiz:** Pick one option in each of the three chapters (genre, era and detail).
* **Get your book:** See the recommendation and tap **Start a new story** to try again.
* **Run locally (optional):** Clone or download this repository and serve it using a local web server (such as VS Code's *Live Server* or `python -m http.server`) so `books.json` loads properly in the browser.

## How it works

Each option in the quiz is linked to a list of books in `books.json`. Folio picks a random book that appears in all three lists. If none does, it picks one that matches two of them and shows a notice, listing only the criteria that matched.

## Project structure

```
├── index.html
├── style.css
├── script.js
├── books.json
└── assets/
    └── logo.png
```

## Changelog

### [v1.0.0] - 2026-11

* First web-based release, replacing the terminal version with a website
* Quiz with genre, era and detail selection
* Book recommendation based on full or partial matches
* Uses a `books.json` data file to store the books, with a small selection available so far (to be expanded)

### [v0.1.0] - 2026-MM

* Initial release
* Terminal-based version written in Python
* Limited selection of books for now
