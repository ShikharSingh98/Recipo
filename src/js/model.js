import { APP_ID, APP_KEY } from './ApiKeys';

export const state = {
  recipes: [],
  selectedRecipe: {},
};

export async function getRecipesFromApi(searchTerm) {
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data[0].message} ${response.status}`);
    }
    state.recipes = data.hits;
  } catch (error) {
    alert(error);
  }
}
