import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New Author");
    }

    async getHtml() { 

        let authors = await requestAuthors();
        let noAuthor = {
            name: "no",
            surname: "author",
            id: 666
        }
        authors.unshift(noAuthor)
        let listHTML = ''
        for(let i=0; i < authors.length; i++){
            listHTML += "<option> "
            listHTML += authors[i].name + " " + authors[i].surname + " " + authors[i].id
            listHTML += " </option> \n"
        }   

        return `
            <h1>Add new book!</h1>

            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title" value="Nad niemnem" ><br>
            <label for="author">Authors:</label><br>
            <select id = "author1">`
            + listHTML + 
            `</select><br>
            <select id = "author2">`
            + listHTML + 
            `</select><br>
            <select id = "author3">`
            + listHTML + 
            `</select><br>
            <label for="pages">Number of pages:</label><br>
            <input type="text" id="pages" name="pages" value="142" ><br>
            <label for="date">Creation date:</label><br>
            <input type="date" id="date" name="date"
            value="2018-07-22"
            min="1800-01-01" max="2018-12-31"><br>
            <button type="button" onclick="addBook()" >Add book!</button>

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
