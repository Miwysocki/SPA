import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
 

 
    }

    async getHtml() {
        
        let books = await requestBooks();


        let listHTML = ''

        for(let i=0; i < books.length; i++){
            listHTML += "<li> "
            listHTML += books[i].title 
            listHTML += " </li> \n"
        }        

        return `
            <h1>Books</h1>
            <div id ='list'> 
            <ul>
            `
            +listHTML + 
            `
            </ul>
            </div>
            <div id="adding"> <a id ="addLink" color = "blue" href="/AddBook" class="nav__link" data-link>Add new book</a></div>
            <div id="deleting"> <a id ="addLink" color = "blue" href="/DeleteAuthor" class="nav__link" data-link>Delete an author</a></div>
            
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















