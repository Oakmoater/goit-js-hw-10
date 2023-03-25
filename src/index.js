import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from '../src/js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputArea = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputArea.addEventListener('input', debounce((event) => {
    fetchCountries(event.currentTarget.value.trim())
        .then((country) => renderCountry(country[0]))
        .catch((error) => console.log(error));
}, DEBOUNCE_DELAY));


function renderCountry({ flags, name, capital, population, languages }) {
  const leng = Object.values(languages).join(', ');
  const markup = `
  <div class="country-container">
    <img class="country-info__flag" src="${flags.svg}" alt="${flags.alt}" />
    <h2 class="country-info__title">${name.official}</h2>
  </div>
    <p class="country-info__capital">
      <span>Capital: </span>
      ${capital}
    </p>
    <p class="country-info__population">
      <span>Population: </span>
      ${population}
    </p>
    <p class="country-info__lng">
      <span>Languages: </span>
        ${leng}
    </p>
    `;

  countryInfo.insertAdjacentHTML('beforeend', markup);
};