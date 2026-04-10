import type { Dog } from '../types/Dog';

const FAVS_KEY = 'favoritesDogs';

export function saveFavorites(dogs: Dog[]): void {
    const serialized = JSON.stringify(dogs);
    window.localStorage.setItem(FAVS_KEY, serialized);
}

export function loadFavorites(): Dog[] {
    const favorites = window.localStorage.getItem(FAVS_KEY);
    return favorites ?  JSON.parse(favorites) : [];
}