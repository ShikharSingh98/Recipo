import '../styles/style.css';
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/style.css';

import { APP_ID, APP_KEY } from './ApiKeys';

const message = document.getElementById('message');
const recipeContainer = document.getElementById('recipe-container');
const recipeName = document.getElementById('recipe-name');
const recipeSource = document.getElementById('recipe-source');
const recipeTime = document.getElementById('recipe-time');
const recipeServings = document.getElementById('recipe-servings');
const recipeIngredientsList = document.getElementById('recipe-ingredients-list');
const recipeImg = document.getElementById('recipe-img');
const recipeDirectionLink = document.getElementById('recipe-direction-link');
const loader = document.getElementById('loader');

async function getRecipesFromApi() {
  message.hidden = true;
  loader.hidden = false;
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    const recipes = data.hits;

    if (!response.ok) {
      throw new Error(`${data[0].message} ${response.status}`);
    }

    const { image, ingredientLines, source, totalTime, yield: servings, label, url } = recipes[0].recipe;

    recipeName.textContent = label;
    recipeSource.textContent = source;
    recipeTime.textContent = totalTime;
    recipeServings.textContent = servings;
    recipeImg.setAttribute('src', image);
    recipeDirectionLink.setAttribute('href', url);

    let markup = '';

    ingredientLines.map((ingredient) => (markup += `<li><i class="far fa-check-circle"></i>${ingredient}</li>`));
    recipeIngredientsList.innerHTML = markup;
    recipeContainer.hidden = false;
    loader.hidden = true;
  } catch (error) {
    alert(error);
  }
}
getRecipesFromApi();
