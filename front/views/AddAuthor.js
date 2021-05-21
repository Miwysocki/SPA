import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New Author");
    }

    async getHtml() { //action="/addNewAuthor" 

        return `
            <h1>Add new author!</h1>

            <label for="firstname">First name:</label><br>
            <input type="text" id="firstname" name="firstname" value="John" ><br>
            <label for="lastname">Last name:</label><br>
            <input type="text" id="lastname" name="lastname" value="Doe" ><br><br>
            <button type="button" onclick="addAuthor()" >Click Me!</button>

        `;
    }
}

