import icons from 'url:../../img/icons.svg';
import view from './view';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _successMsg = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); //we used constructor cos we're calling the functions directly below from here
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //FormData is a new Browser API.
      const data = Object.fromEntries(dataArr); //converts array to Object, Nice✔
      handler(data);
    });
  }

  // _generateMarkupBtn() {}
  _generateMarkup() {}
}

export default new addRecipeView();
