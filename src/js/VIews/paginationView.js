import icons from 'url:../../img/icons.svg'
import view from './view';

class paginationView extends view {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            console.log(btn)
            
            const goToPage = +btn.dataset.goto;
            
            handler(goToPage)
        })
    }

    _generateMarkupBtn(dir){
        const curPage = this._data.page

        return dir  === "prev" ? `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage - 1}</span>
         </button>` : `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
         </button>`
    }

    _generateMarkup(){
        const curPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);

        // Page 1 and there are other page
        
        if(curPage === 1 && numPages > 1){
            return this._generateMarkupBtn("next")
        }
        // Page 1 and there are NO other page
        
        // Last page
        if(curPage === numPages && curPage > 1){
            return this._generateMarkupBtn("prev")
        }
        // Other page
        if(curPage < numPages){
            return [this._generateMarkupBtn("prev"), this._generateMarkupBtn("next")]
        }
        return ''
    }
}

export default new paginationView()