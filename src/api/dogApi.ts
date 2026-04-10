import type { RandomDogsResponse } from "../types/RandomDogsResponse";

const DOG_API_BASE_URL = 'https://dog.ceo/api';

export async function fetchRandomDogs(count: number): Promise<RandomDogsResponse> {
    const response = await fetch(`${DOG_API_BASE_URL}/breeds/image/random/${count}`);
    if(!response.ok) {
        throw new Error(`Failed to fetch random dogs: ${response.statusText}`);
    }
    return response.json();
}