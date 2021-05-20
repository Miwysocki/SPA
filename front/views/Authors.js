import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
 

 
    }

    async getHtml() {
        
        let authors = await requestAuthors();


        let listHTML = ''

        for(let i=0; i < authors.length; i++){
            listHTML += "<li> "
            listHTML += authors[i].name + " " + authors[i].surname
            listHTML += " </li> \n"
        }        

        return `
            <h1>Authors</h1>
            <p>You are viewing the authors!</p>
            <div id ='list'> 
            <ul>
            `
            +listHTML + 
            `
            </ul>
            </div>
            <div id="adding"> <a id ="addLink" color = "blue" href="/AddAuthor" class="nav__link" data-link>Add new author</a></div>
            
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
















/*
function requestAuthors(){
    const xhr = new XMLHttpRequest();
    
    const url = `http://localhost:8080/listAuthors`;
    xhr.open('GET', url, true);
    xhr.onload = function() {
        const data = JSON.parse(this.responseText);
        console.log(data);

        for(let i in data){
         //   console.log('namee :', data[i].name);
        }
        return data
    }
    
    xhr.send();
    
    
}

*/