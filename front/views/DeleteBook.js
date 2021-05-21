import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {

        let books = await requestBooks();


        let listHTML = ''

        for(let i=0; i < books.length; i++){
            listHTML += "<option> "
            listHTML += books[i].title + " " + books[i].id
            listHTML += " </option> \n"
        }    

        return `
            <h1>Delete book:</h1>
        <select id="bookToDelete">
            ` 
            + listHTML + 
            `
          </select>            
          <button type="button" onclick="deleteBook()" >Delete</button>

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
