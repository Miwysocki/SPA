import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {


        let listHTML = ''

        let books = await requestBooks();
        let authors = await requestAuthors();
        
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
            <h1>Search</h1>
            <input id ="search" type="text" placeholder="Search..">
            <button onclick = "search()">Search</button><br>
            <select id = "searchOption">
                <option> title </option>
                <option> author </option>
                <option> date  </option>
            <select>

            <div id ="result">

            </div>
        `;
    }
}