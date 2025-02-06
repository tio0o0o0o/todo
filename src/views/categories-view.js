import Utility from "../utility/utility";

export default class CategoriesView {
    constructor(parent = document.querySelector("main")) {
        this.parent = parent;
    }

    create() {
        Utility.createElement({
            tag: "h1",
            textContent: "Categories",
            parent: this.parent
        });
    }

    delete() {
        while (this.parent.hasChildNodes()) {
            this.parent.removeChild(this.parent.lastChild);
        }
    }
}