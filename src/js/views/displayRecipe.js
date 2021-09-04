const recipeContainer = document.getElementById('recipe-container');
const recipeName = document.getElementById('recipe-name');
const recipeSource = document.getElementById('recipe-source');
const recipeTime = document.getElementById('recipe-time');
const recipeServings = document.getElementById('recipe-servings');
const recipeIngredientsList = document.getElementById('recipe-ingredients-list');
const recipeImg = document.getElementById('recipe-img');
const recipeDirectionLink = document.getElementById('recipe-direction-link');

export function displayRecipe(recipe) {
  const { image, ingredientLines, source, totalTime, yield: servings, label, url } = recipe;
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
  message.hidden = true;
}
