export default class CategoriesModel {
    static categories = ["edging", "rizzing", "looksmaxxing"];

    static create(name) {
        name = name.toLowerCase();
        if (this.categories.find((value) => value === name)) return false;
        if (name === "") return false;
        this.categories.push(name);
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
                return true;
            }
        });
        return false;
    }

    static delete(name) {
        this.categories = this.categories.filter((category) => {
            return category !== name;
        });
    }
}


