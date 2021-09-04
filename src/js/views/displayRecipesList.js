const recipesList = document.getElementById('recipes-list');

export function displayRecipesList(recipes) {
  recipesList.innerHTML = '';
  recipes.map(({ recipe }) => {
    const recipesListItem = document.createElement('div');
    const recipesListItemImg = document.createElement('img');
    const recipesListItemDetails = document.createElement('div');
    const recipesListItemName = document.createElement('h3');
    const recipesListItemSource = document.createElement('span');

    recipesListItem.className = 'recipes-list-item';
    recipesListItem.dataset.recipeName = recipe.label;
    // recipesListItem.addEventListener('click', recipeSelected);

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
