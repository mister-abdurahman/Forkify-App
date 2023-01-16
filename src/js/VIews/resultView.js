import icons from 'url:../../img/icons.svg'
import view from './view';
import previewView from './previewView';

class ResultView extends view {
    _parentElement = document.querySelector('.results');
    _errorMsg = `No recipe found for your query, Please try again :)`;
    _successMsg = 'Success';

    _generateMarkup() {
      return this._data.map(result => previewView.render(result, false)).join('')
  }
}


export default new ResultView()