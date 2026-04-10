import { useEffect, useState } from 'react'
import { fetchRandomDogs } from '../api/dogApi'
import type { Dog } from '../types/Dog'
import { getBreedFromUrl } from '../utils/misc'
import { loadFavorites, saveFavorites } from '../utils/storage'
import FavoriteDogs from './FavoriteDogs'

function DogViewerPage() {
    const [selectedDog, setSelectedDog] = useState<Dog>()
    const [thumbnailDogs, setThumbnailDogs] = useState<Dog[]>([])
    const [favorites, setFavorites] = useState<Dog[]>([])

    async function loadData() {
        //fetch the dogs and set the selected and thumbnail dogs
        const dogsData = await fetchRandomDogs(11);
        const dogList: Dog[] = [];
        dogsData.message.forEach((url) => {
            dogList.push({
                imageUrl: url,
                breed: getBreedFromUrl(url)
            });
        });
        setSelectedDog(dogList[0]);
        setThumbnailDogs(dogList.splice(1));

        const favorites = loadFavorites(); // load favorites from local storage, if any
        setFavorites(favorites);

    }

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, [])

    function selectDog(dog: Dog) {
        setSelectedDog(dog);
    }
    function addFavorite(dog: Dog | undefined) {
        if (dog && !favorites.some((favorite) => favorite.breed === dog.breed)) {
            const favs = [...favorites, dog];
            setFavorites(favs);
            saveFavorites(favs);
        }
    }
    function removeFavorite(dog: Dog) {
        const favs = favorites.filter((favorite) => favorite.breed !== dog.breed);
        setFavorites(favs);
        saveFavorites(favs);
    }

    return (
        <div className='main'>
            <h1>Dan's Dog Viewer</h1>
            <div className='topSection'>
                <div className='selectedDog'>
                        <div className='selectedPicture'>
                        <img src={selectedDog?.imageUrl} alt={selectedDog?.breed} />
                    </div>
                    <div>
                        <h3>{selectedDog?.breed + ' '}<button onClick={() => addFavorite(selectedDog)}>❤️</button></h3>
                    </div>
                </div>
                <FavoriteDogs
                    favorites={favorites}
                    onSelectDog={selectDog}
                    onRemoveFavorite={removeFavorite}
                />
            </div>
            <br />
            <div className='thumbnailsGrid'>
                {thumbnailDogs.map((dog, index) => (
                    <div className='thumbnail' key={index} onClick={() => selectDog(dog)}>
                        <div className='thumbnailPicture'>
                            <img src={dog.imageUrl} alt={dog.breed} />
                        </div>
                        <p>{dog.breed}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DogViewerPage