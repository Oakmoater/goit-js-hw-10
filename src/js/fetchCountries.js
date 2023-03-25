export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Oops, there is no country with that name');
        }
        throw new Error('Oops, something went wrong!');
    }
    return await response.json();
};
