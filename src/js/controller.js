import { state, getRecipesFromApi } from './model';
import { displayRecipe } from './views/displayRecipe.js';
import { displayRecipesList } from './views/displayRecipesList';
import '../styles/style.css';
import regeneratorRuntime from 'regenerator-runtime';

async function showRecipes() {
  try {
    await getRecipesFromApi('chips');
    displayRecipe(state.recipes[0]);
    displayRecipesList(state.recipes);
  } catch (error) {}
}

showRecipes();
