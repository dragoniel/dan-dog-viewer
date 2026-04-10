export function getBreedFromUrl(imageUrl: string): string {
    const match = imageUrl.match(/\/breeds\/([^/]+)\//);
    if (!match) {
        return 'Unknown';
    }
  return match[1];
}