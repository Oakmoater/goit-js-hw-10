import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from '../src/js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputArea = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputArea.addEventListener('input', debounce(event => {
    fetchCountries(event.target.value.trim())
      .then(country => {
        clearPage();

        console.log(country.length);

        if (country.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (country.length > 1) {
          renderCountries(country);
        } else if (country.length === 1) {
          renderCountry(country[0]);
        }
      })
      .catch(error => {
        clearPage();
        Notify.failure(error.message)
      });
}, DEBOUNCE_DELAY));

function renderCountries(countries) {
  const markup = countries.map(({ flags, name }) => {
    return `
    <li class="country-list__item">
      <div class="country-container">
        <img class="country-info__flag" src="${flags.svg}" alt="${flags.alt}" />
        <h2 class="country-info__title">${name.official}</h2>
      </div>
    </li>`
  });
  countryList.insertAdjacentHTML('beforeend', markup.join(' '));
  console.log(markup);
};

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

function clearPage() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};