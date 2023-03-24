export function fetchCountries (name) {
    return fetch (`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Oops, there is no country with that name');
                }
                throw new Error('Oops, something went wrong!');
            }
           return response.json();
        }
    );
};
