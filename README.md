# Dan's Dog Viewer

A small React + TypeScript application that fetches random dog images from the [Dog CEO API](https://dog.ceo/api) and lets users browse breeds, select a featured dog, and save favorites locally.

You can see the app running [here](https://brave-sea-0021e6110.1.azurestaticapps.net)


## Features

- Displays one selected dog image and breed name
- Shows a grid of clickable dog thumbnails to switch the featured dog
- Favorites sidebar with add/remove support
- Favorites are persisted to browser local storage
- Uses reusable React components with a clear separation of concerns
- Unit tested with Jest and React Testing Library

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Jest + React Testing Library
- Browser local storage

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open the app at [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---

## Running Tests

This project uses Jest with React Testing Library.

```bash
npm test
```

To run a specific test file:

```bash
npx jest src/components/FavoritesList.test.tsx --runInBand
```

To run a single test case by name:

```bash
npx jest -t "calls onRemoveFavorite when the remove button is clicked"
```

---

## Project Overview

The app is intentionally small and modular:

- `src/App.tsx` — root component that renders `DogViewerPage`
- `src/components/DogViewerPage.tsx` — main page responsible for fetching data, managing selection state, and wiring child components
- `src/components/FavoritesList.tsx` — child component that renders the favorites table and emits selection/removal events
- `src/api/dogApi.ts` — encapsulates the Dog CEO fetch call
- `src/utils/storage.ts` — local storage helpers for saving and loading favorites
- `src/utils/misc.ts` — shared helper functions such as breed extraction from image URLs
- `src/types/Dog.ts` — dog model type used across the application
- `src/types/RandomDogsResponse.ts` — API response model for the Dog CEO random image endpoint

---

## Design and Architecture

### Component structure

- `DogViewerPage` is the main stateful component.
- `FavoritesList` is a presentational child component with callback props.
- This separation keeps rendering logic and state updates separate from display details.

### State management

`DogViewerPage` manages three pieces of state:

- `selectedDog` — currently featured dog
- `thumbnailDogs` — a list of additional dogs shown as thumbnails
- `favorites` — saved favorite dogs

### Data flow

1. On mount, `DogViewerPage` fetches 11 random dog images.
2. The first dog becomes the selected dog.
3. The remaining 10 dogs become thumbnails.
4. Favorites are loaded from local storage and shown in the sidebar.
5. Clicking a thumbnail updates the selected dog.
6. Clicking the heart button adds the selected dog to favorites.
7. Removing a favorite updates state and persists the updated favorites.

### Algorithms and implementation details

- Breed extraction is done by parsing the image URL returned from the Dog CEO API using a regex in `src/utils/misc.ts`.
- The app uses a simple in-memory state and does not rely on external state libraries.
- Favorites use `window.localStorage` so the user’s selection survives page refresh.

---

## Unit Tests

The test suite verifies both unit behavior and component interaction:

- `src/utils/misc.test.ts` — validates breed extraction logic
- `src/utils/storage.test.ts` — verifies local storage save/load behavior
- `src/components/FavoritesList.test.tsx` — tests rendering and interaction of the favorites child component
- `src/components/DogViewerPage.test.tsx` — validates data fetching, rendering, and favorite selection behavior

The tests use React Testing Library queries such as `getByRole`, `getByText`, and `getByAltText` to ensure UI behavior matches user interaction.

---

## Notes

- The application is deliberately lightweight and uses only browser-native persistence for favorites.
- The current design makes it easy to replace the API layer or add more advanced caching without changing the UI components.
- Adding additional features such as search or pagination would be straightforward thanks to the clear state boundaries.

