'use strict';

var pageQuery = location.search;
var queryParams = new URLSearchParams(pageQuery);
function privpage(){
    queryParams.set('page', queryParams.get('page')-1);
    location.search = queryParams.toString();
}
function addpage(page){
    queryParams.set('page', page);
    location.search = queryParams.toString();
}
function nextpage(){
    queryParams.set('page', Number(queryParams.get('page'))+1);
    location.search = queryParams.toString();
}