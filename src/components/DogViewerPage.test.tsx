import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Dog } from '../types/Dog';
import DogViewerPage from './DogViewerPage';
import { fetchRandomDogs } from '../api/dogApi';
import { loadFavorites, saveFavorites } from '../utils/storage';

jest.mock('../api/dogApi', () => ({
    fetchRandomDogs: jest.fn(),
}));

jest.mock('../utils/storage', () => ({
    loadFavorites: jest.fn(),
    saveFavorites: jest.fn(),
}));

const mockFetchRandomDogs = fetchRandomDogs as unknown as jest.MockedFunction<typeof fetchRandomDogs>;
const mockLoadFavorites = loadFavorites as unknown as jest.MockedFunction<typeof loadFavorites>;
const mockSaveFavorites = saveFavorites as unknown as jest.MockedFunction<typeof saveFavorites>;

const dogUrls = [
    'https://images.dog.ceo/breeds/shiba/n02097130_100.jpg',
    'https://images.dog.ceo/breeds/pug/n02110958_10047.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
];

const expectedSelectedDog: Dog = {
    imageUrl: dogUrls[0],
    breed: 'shiba',
};

const thumbnailSelectedDog: Dog = {
    imageUrl: dogUrls[1],
    breed: 'pug',
};

describe('DogViewerPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetchRandomDogs.mockResolvedValue({ message: dogUrls, status: 'success' });
        mockLoadFavorites.mockReturnValue([]);
        window.localStorage.clear();
    });

    it('renders the selected dog and thumbnail list after loading', async () => {
        render(<DogViewerPage />);

        await waitFor(() => {
            expect(mockFetchRandomDogs).toHaveBeenCalled();
        });

        expect(screen.getByText('shiba')).toBeInTheDocument();
        expect(screen.getByText('pug')).toBeInTheDocument();
        expect(screen.getByText('husky')).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(3);
        expect(images[0]).toHaveAttribute('src', expectedSelectedDog.imageUrl);
    });

    it('adds the selected dog to favorites when the heart button is clicked', async () => {
        render(<DogViewerPage />);

        await waitFor(() => {
            expect(mockFetchRandomDogs).toHaveBeenCalled();
        });

        const cella = screen.queryByRole('cell', { name: expectedSelectedDog.breed });
        expect(cella).not.toBeInTheDocument();

        // Click the heart button to add the selected dog to favorites
        fireEvent.click(screen.getByRole('button', { name: '❤️' }));

        await waitFor(() => {
            expect(mockSaveFavorites).toHaveBeenCalledWith([expectedSelectedDog]);
        });

        // Check if the favorite dog is displayed in the favorites section
        const favoriteCell = screen.getByRole('cell', { name: expectedSelectedDog.breed });
        expect(favoriteCell).toBeInTheDocument()

    });

    it('delete a favorite dog when the delete button is clicked', async () => {
        render(<DogViewerPage />);

        await waitFor(() => {
            expect(mockFetchRandomDogs).toHaveBeenCalled();
        });

        // First add the dog to favorites
        fireEvent.click(screen.getByRole('button', { name: '❤️' }));

        await waitFor(() => {
            expect(mockSaveFavorites).toHaveBeenCalledWith([expectedSelectedDog]);
        });

        // Check if the favorite dog is displayed in the favorites section
        const favoriteCell = screen.getByRole('cell', { name: expectedSelectedDog.breed });
        expect(favoriteCell).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: '❌' }));

        await waitFor(() => {
            const removedCell = screen.queryByRole('cell', { name: expectedSelectedDog.breed });
            // The cell should no longer be in the document after deletion
            expect(removedCell).not.toBeInTheDocument();
        });
    });

    it('display the clicked thumbnail as the selected dog', async () => {
        render(<DogViewerPage />);

        await waitFor(() => {
            expect(mockFetchRandomDogs).toHaveBeenCalled();
        });

        const thumbnailDiv = screen.getByAltText(thumbnailSelectedDog.breed).closest('.thumbnail') as HTMLElement;
        fireEvent.click(thumbnailDiv);

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            // The first image should now be the one from the clicked thumbnail
            expect(images[0]).toHaveAttribute('src', thumbnailSelectedDog.imageUrl);
        });
    });
});
