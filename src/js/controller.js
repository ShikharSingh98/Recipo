import { state, getRecipesFromApi } from './model';
import { displayRecipe } from './views/displayRecipe.js';
import '../styles/style.css';
import regeneratorRuntime from 'regenerator-runtime';

async function showRecipes() {
  try {
    await getRecipesFromApi('chips');
    displayRecipe(state.recipes[0]);
  } catch (error) {}
}

showRecipes();
