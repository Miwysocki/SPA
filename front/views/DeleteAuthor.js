import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {

        let authors = await requestAuthors();


        let listHTML = ''

        for(let i=0; i < authors.length; i++){
            listHTML += "<option> "
            listHTML += authors[i].name + " " + authors[i].surname + " " + authors[i].id
            listHTML += " </option> \n"
        }    

        return `
            <h1>Delete Author:</h1>
        <select id="authorToDelete">
            ` 
            + listHTML + 
            `
          </select>            
          <button type="button" onclick="deleteAuthor()" >Delete</button>

        `;
    } 
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