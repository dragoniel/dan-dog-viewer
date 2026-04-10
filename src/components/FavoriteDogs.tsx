import type { Dog } from '../types/Dog';

interface FavoriteDogsProps {
  favorites: Dog[];
  onSelectDog: (dog: Dog) => void;
  onRemoveFavorite: (dog: Dog) => void;
}

export default function FavoriteDogs({
  favorites,
  onSelectDog,
  onRemoveFavorite,
}: FavoriteDogsProps) {
  return (
    <div className='favorites'>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Favorites</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((dog, index) => (
            <tr key={index}>
              <td width='80%' onClick={() => onSelectDog(dog)}>{dog.breed}</td>
              <td width='20%'>
                <button onClick={() => onRemoveFavorite(dog)}>
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
