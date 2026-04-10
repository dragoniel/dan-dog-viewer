import { fireEvent, render, screen } from '@testing-library/react';
import type { Dog } from '../types/Dog';
import FavoriteDogs from './FavoriteDogs';

describe('FavoriteDogs', () => {
    const favorites: Dog[] = [
        { imageUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg', breed: 'beagle' },
        { imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_10047.jpg', breed: 'pug' },
    ];

    it('renders the favorites table header and list of favorite breeds', () => {
        render(
            <FavoriteDogs
                favorites={favorites}
                onSelectDog={jest.fn()}
                onRemoveFavorite={jest.fn()}
            />
        );

        expect(screen.getByText('Favorites')).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'beagle' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'pug' })).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: '❌' })).toHaveLength(2);
    });

    it('calls onSelectDog when a favorite breed cell is clicked', () => {
        const onSelectDog = jest.fn();
        render(
            <FavoriteDogs
                favorites={favorites}
                onSelectDog={onSelectDog}
                onRemoveFavorite={jest.fn()}
            />
        );

        fireEvent.click(screen.getByRole('cell', { name: 'pug' }));

        expect(onSelectDog).toHaveBeenCalledTimes(1);
        expect(onSelectDog).toHaveBeenCalledWith(favorites[1]);
    });

    it('calls onRemoveFavorite when the remove button is clicked', () => {
        const onRemoveFavorite = jest.fn();
        render(
            <FavoriteDogs
                favorites={favorites}
                onSelectDog={jest.fn()}
                onRemoveFavorite={onRemoveFavorite}
            />
        );

        fireEvent.click(screen.getAllByRole('button', { name: '❌' })[0]);

        expect(onRemoveFavorite).toHaveBeenCalledTimes(1);
        expect(onRemoveFavorite).toHaveBeenCalledWith(favorites[0]);
    });
});
