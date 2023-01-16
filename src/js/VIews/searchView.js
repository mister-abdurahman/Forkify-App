class searchView {
_parentEl = document.querySelector('.search')

_clear(){
    this._parentEl.querySelector('.search__field').value = ''
}
getQuery(){
    const query = this._parentEl.querySelector('.search__field').value;
    this._clear();
    return query;
}
addHandlerSearch(handler){//Publisher
    this._parentEl.addEventListener('submit', function(e) {
        e.preventDefault(); //to prevent page reload
        handler();
    })
}

}

export default new searchView()