export default class CategoriesModel {
    static categories = this.initializeProxy();
    static hasInitialized = false;

    static create(name) {
        name = name.toLowerCase();
        if (this.categories.find((value) => value === name)) return false;
        if (name === "") return false;
        this.categories.push(name);

        // Save data
        this.saveDataProxy();
    }

    static read() {
        const lowerCaseCategoriesList = this.categories.map((value) => {
            return value.toLowerCase();
        });
        return lowerCaseCategoriesList;
    }

    static update(name, newName) {
        name = name.toLowerCase();
        newName = newName.toLowerCase();
        this.categories.forEach((value, index) => {
            if (value === name && newName != "") {
                if (this.categories.find((value) => value === newName)) return false;
                this.categories[index] = newName;

                // Save data
                this.saveDataProxy();

                return true;
            }
        });
        return false;
    }

    static delete(name) {
        this.categories = this.categories.filter((category) => {
            return category !== name;
        });

        // Save data
        this.saveDataProxy();
    }

    static initializeProxy() {
        if (!this.hasInitialized) {
            this.hasInitialized = true;
            const categoriesParsed = JSON.parse(localStorage.getItem("categories"));
            if (categoriesParsed) {
                return categoriesParsed;
            }
            else {
                return this.createDefault();
            }
        }
    }

    static createDefault() {
        return [
            "rizzing",
            "looksmaxxing",
            "edging"
        ];
    }

    static saveDataProxy() {
        const categoriesString = JSON.stringify(this.categories);
        localStorage.setItem("categories", categoriesString);
    }
}


