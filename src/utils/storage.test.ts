import { loadFavorites, saveFavorites } from './storage';
import type { Dog } from '../types/Dog';

describe('storage utilities', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('saves and loads a list of favorite dogs', () => {
        const favorites: Dog[] = [
            { imageUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg', breed: 'beagle' },
        ];

        saveFavorites(favorites);
        expect(loadFavorites()).toEqual(favorites);
    });

    it('returns an empty list when nothing is saved', () => {
        expect(loadFavorites()).toEqual([]);
    });
});
