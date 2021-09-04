import { state, getRecipesFromApi } from './model';
import { displayRecipe } from './views/displayRecipe.js';
import { displayRecipesList } from './views/displayRecipesList';
import '../styles/style.css';
import regeneratorRuntime from 'regenerator-runtime';
import { selectedRecipeView } from './views/selectedRecipeView';

async function showRecipes() {
  try {
    await getRecipesFromApi('cake');
    displayRecipe(state.recipes[0].recipe);
    displayRecipesList(state.recipes);
  } catch (error) {}
}

showRecipes();

export function recipeSelected() {
  const selectedData = state.recipes.find(({ recipe }) => recipe.label === this.dataset.recipeName).recipe;
  state.selectedRecipe = selectedData;
  selectedRecipeView(this);
  displayRecipe(state.selectedRecipe);
}
