import '../styles/style.css';
import regeneratorRuntime from 'regenerator-runtime';

import { APP_ID, APP_KEY } from './ApiKeys';

const searchRecipeForm = document.getElementById('search-recipe-form');
const message = document.getElementById('message');
const recipeContainer = document.getElementById('recipe-container');
const recipesList = document.getElementById('recipes-list');
const recipeName = document.getElementById('recipe-name');
const recipeSource = document.getElementById('recipe-source');
const recipeTime = document.getElementById('recipe-time');
const recipeServings = document.getElementById('recipe-servings');
const recipeIngredientsList = document.getElementById('recipe-ingredients-list');
const recipeImg = document.getElementById('recipe-img');
const recipeDirectionLink = document.getElementById('recipe-direction-link');
const loader = document.getElementById('loader');

let recipes = [];
let selectedRecipe = {};

function initialRecipeSelect() {
  selectedRecipe = recipes[0].recipe;
  displayRecipe();
  recipesList.children[0].classList.add('recipes-list-item-selected');
}

function recipeSelected() {
  const selectedData = recipes.find(({ recipe }) => recipe.label === this.dataset.recipeName).recipe;
  selectedRecipe = selectedData;
  displayRecipe();

  for (let i = 0; i < recipesList.children.length; i++) {
    recipesList.children[i] === this ? recipesList.children[i].classList.add('recipes-list-item-selected') : recipesList.children[i].classList.remove('recipes-list-item-selected');
  }
}

function displayRecipesList() {
  recipesList.innerHTML = '';
  recipes.map(({ recipe }) => {
    const recipesListItem = document.createElement('div');
    const recipesListItemImg = document.createElement('img');
    const recipesListItemDetails = document.createElement('div');
    const recipesListItemName = document.createElement('h3');
    const recipesListItemSource = document.createElement('span');

    recipesListItem.className = 'recipes-list-item';
    recipesListItem.dataset.recipeName = recipe.label;
    recipesListItem.addEventListener('click', recipeSelected);

    recipesListItemImg.setAttribute('src', recipe.image);
    recipesListItemImg.className = 'recipes-list-item-img';

    recipesListItemDetails.className = 'recipes-list-item-details';

    recipesListItemName.textContent = recipe.label;

    recipesListItemSource.textContent = recipe.source;

    recipesListItemDetails.append(recipesListItemName, recipesListItemSource);
    recipesListItem.append(recipesListItemImg, recipesListItemDetails);
    recipesList.append(recipesListItem);
  });
  recipesList.hidden = false;
}

function displayRecipe() {
  const { image, ingredientLines, source, totalTime, yield: servings, label, url } = selectedRecipe;
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
}

async function getRecipesFromApi(searchTerm) {
  message.hidden = true;
  recipeContainer.hidden = true;
  recipesList.hidden = true;
  loader.hidden = false;
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data[0].message} ${response.status}`);
    }
    recipes = data.hits;
    displayRecipesList();
    initialRecipeSelect();
  } catch (error) {
    alert(error);
  }
}

searchRecipeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(searchRecipeForm);
  getRecipesFromApi(formData.get('search-term'));
});
