import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
 

 
    }

    async getHtml() {
        
        let books = await requestBooks();
        let authors = await requestAuthors();

        let listHTML = ''

        for(let i=0; i < books.length; i++){
            //get authors names
            let thisBookAuthors = ''
            for(let j=0; j < 3; j++){
                if(books[i].authors[j] != null){
                    for(let k=0; k < authors.length; k++){
                        if(authors[k].id == books[i].authors[j]){
                            thisBookAuthors += authors[k].name+" ";
                            thisBookAuthors += authors[k].surname + ", ";
                        }
                    }
                }
            }
            listHTML += "<dt> "
            listHTML += books[i].title 
            listHTML += " </dt>"
            listHTML += "<dd>"
            listHTML +="Authors:"+thisBookAuthors+" "
            listHTML +="Creation date:"+books[i].date+" "
            listHTML += "Pages:"+books[i].pages
            listHTML +="</dd>"
        }        

        return `
            <h1>Books</h1>
            <div id ='list'> 
            <dl>
            `
            +listHTML + 
            `
            </dl>
            </div>
            <div id="adding"> <a id ="addLink" color = "blue" href="/AddBook" class="nav__link" data-link>Add new book</a></div>
            <div id="deleting"> <a id ="addLink" color = "blue" href="/DeleteBook" class="nav__link" data-link>Delete book</a></div>
            
        `;
    }
}

function requestBooks() {
    return new Promise(function(resolve, reject) {
    const url = `http://localhost:8080/listBooks`;
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const data = JSON.parse(this.responseText);      
        resolve(data)
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.send();
    });
  }

  function requestAuthors() {
    return new Promise(function(resolve, reject) {
    const url = `http://localhost:8080/listAuthors`;
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const data = JSON.parse(this.responseText);      
        resolve(data)
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.send();
    });
  }















