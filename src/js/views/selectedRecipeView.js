const recipesList = document.getElementById('recipes-list');

export function selectedRecipeView(selectedRecipe) {
  for (let i = 0; i < recipesList.children.length; i++) {
    recipesList.children[i] === selectedRecipe ? recipesList.children[i].classList.add('recipes-list-item-selected') : recipesList.children[i].classList.remove('recipes-list-item-selected');
  }
}
