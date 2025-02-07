import Utility from "../utility/utility.js";
const cross = require("../assets/images/cross.svg");
const plus = require("../assets/images/add.svg");
import "../assets/styles/categories.css";

export default class CategoriesView {
    constructor(parent = document.querySelector("main")) {
        this.parent = parent;
    }

    create(categories) {
        const categoriesWrapper = Utility.createElement({
            tag: "div",
            attributes: ["class", "categoriesWrapper"],
            parent: this.parent
        });

        categories.forEach((category) => {
            this.#createCategory(category, categoriesWrapper);
        });

        const createCategoryButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "createCategoryButton", "type", "image", "src", plus],
            parent: this.parent
        });
    }

    #createCategory(category, cardParent) {
        const newCard = Utility.createElement({
            tag: "div",
            attributes: ["class", "newCard", "data-name", category],
            parent: cardParent
        });

        const name = Utility.createElement({
            tag: "input",
            attributes: ["class", "categoryName", "type", "text", "value", category],
            parent: newCard
        });

        const deleteButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "deleteCategoryButton", "type", "image", "src", cross],
            parent: newCard
        });
    }

    delete() {
        while (this.parent.hasChildNodes()) {
            this.parent.removeChild(this.parent.lastChild);
        }
    }
}
