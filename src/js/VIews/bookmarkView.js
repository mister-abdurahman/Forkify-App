import view from './view';
import previewView  from './previewView';
import icons from 'url:../../img/icons.svg'

class bookmarkView extends view {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMsg = `No Bookmarks yet, Find a nice recipe and bookmark it`;
    _successMsg = 'Success';

    addHandlerRender(handler){
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
}


export default new bookmarkView()