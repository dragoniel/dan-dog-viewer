import { getBreedFromUrl } from './misc';

describe('getBreedFromUrl', () => {
    it('returns the breed name from a valid Dog CEO image URL', () => {
        const url = 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg';
        expect(getBreedFromUrl(url)).toBe('hound-afghan');
    });

    it('returns Unknown when the URL does not contain a breed segment', () => {
        expect(getBreedFromUrl('https://example.com/no-breed.jpg')).toBe('Unknown');
    });
});
