import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './VIews/recipeView.js';
import searchView from './VIews/searchView.js';
import ResultView from './VIews/resultView.js';
import paginationView from './VIews/paginationView.js';
import bookmarkView from './VIews/bookmarkView.js';
import addRecipeView from './VIews/addRecipeView.js';

import 'core-js/actual';
import 'regenerator-runtime/runtime.js';
import resultView from './VIews/resultView.js';

if (module.hot) {
  module.hot.accept(); //this is not real javascript but from parcel.

  // Hot Module Replacement (HMR) is the ability to push file updates to the browser without triggering
  // a full page refresh. Imagine changing some CSS, hitting save, and then instantly seeing your change reflected on the page without a refresh. That's HMR.
}

// import resultView from './VIews/resultView.js';

// import 'core-js/stable'; //For polyfilling everything else
// import 'regenerator-runtime/runtime' //for polyfilling async/await

// console.log(icons) //so it returns the actual path of the icon in the dist. (still processing why...)

// https://forkify-api.herokuapp.com/v2

//Spinner function

// 1.) Loading Recipe
const controlRecipes = async function () {
  try {
    // dynamically rendering the snack
    // this is the controller getting info from the view (UI)
    const id = window.location.hash.slice(1);
    // console.log(id)

    if (!id) return;

    // Load Spinner
    recipeView.renderSpinner();

    //0.) Update result view to mark selected search result
    ResultView.update(model.getSearchResultsPage());
    // 1. Updating bookmark view
    bookmarkView.update(model.state.bookmarks);
    //2.) Load Recipe
    // ...[50] giving that info to the model
    await model.loadRecipe(id);

    // 3.) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.errorHandler();
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();
    //1.) Get search query
    const query = searchView.getQuery();
    if (!query) return resultView.errorHandler();

    //2.) Load search results
    await model.loadSearchResults(query);

    //3.) Render Results
    // ResultView.render(model.state.search.results)

    ResultView.render(model.getSearchResultsPage());

    //4.) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    // recipeView.errorHandler()
  }
};

const controlPagination = function (goToPage) {
  //1.) Render new Results
  ResultView.render(model.getSearchResultsPage(goToPage));
  //2.) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in the state
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.messageHandler();

    // render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('❌', err);
    addRecipeView.errorHandler(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); //Publisher-Subscriber pattern implementation
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); //Subscriber
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// showRecipe()
// Remember how we implemented polyfilling for ES6 Features. We used core-js & regenerator-runtime
// We want to listen to the hashchange that occurs when we click a snack and render the reciepe id clicked.
// also render on loading the page.

// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)
