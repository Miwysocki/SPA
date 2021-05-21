import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {

        let books = await requestBooks();
        let authors = await requestAuthors();


        let listHTML = ''

        for(let i=0; i < books.length; i++){
            listHTML += "<option> "
            listHTML += books[i].title + " " + books[i].id
            listHTML += " </option> \n"
        }    

        let noAuthor = {
          name: "no",
          surname: "author",
          id: 666
      }
        authors.unshift(noAuthor)
        let autorHTML = ''
        for(let i=0; i < authors.length; i++){
          autorHTML += "<option> "
          autorHTML += authors[i].name + " " + authors[i].surname + " " + authors[i].id
          autorHTML += " </option> \n"
        }   

        return `
            <h1>Modify or delete book:</h1>
        <select id="bookToDelete">
            ` 
            + listHTML + 
            `
          </select>            
          <button type="button" onclick="deleteBook()" >Delete</button><br>
          <label for="title">Title:</label><br>
          <input type="text" id="title" name="title" value="Nad niemnem" ><br>
            <label for="author">Authors:</label><br>
            <select id = "author1">`
            + autorHTML + 
            `</select><br>
            <select id = "author2">`
            + autorHTML + 
            `</select><br>
            <select id = "author3">`
            + autorHTML + 
            `</select><br>
            <label for="pages">Number of pages:</label><br>
            <input type="text" id="pages" name="pages" value="142" ><br>
            <label for="date">Creation date:</label><br>
            <input type="date" id="date" name="date"
            value="2018-07-22"
            min="1800-01-01" max="2018-12-31"><br>
          <button type="button" onclick="addBook(true)" >Modify</button>

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
