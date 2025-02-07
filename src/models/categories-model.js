export default class CategoriesModel {
    static categories = ["Edging", "Rizzing", "Looksmaxxing"];

    static create(name) {
        if (this.categories.find((value) => value === name)) return false;
        if (name === "") return false;
        this.categories.push(name);
    }

    static read() {
        return this.categories;
    }

    static update(name, newName) {
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


