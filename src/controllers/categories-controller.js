import CategoriesView from "../views/categories-view";

export default class CategoriesController {
    #categoriesView = new CategoriesView();

    updateView() {
        this.#categoriesView.delete();
        this.#categoriesView.create();
    }
}