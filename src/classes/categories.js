class Categories {
    static categoryList = [];

    static createCategory(name) {
        if (this.checkNameExists(name)) return false;

        this.categoryList.push(name);
    }

    static deleteCategory(name) {
        this.categoryList = this.categoryList.filter((value) => {
            return value !== name;
        });
    }

    static updateCategory(name, newName) {
        if (this.checkNameExists(newName)) return false;

        this.categoryList = this.categoryList.map((value) => {
            if (value === name) return newName;
            else return value;
        });
    }

    static checkNameExists(name) {
        for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i] === name) return true;
        }
        return false;
    }
}

module.exports = Categories;