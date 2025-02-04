class Categories {
    categoryList = [];

    createCategory(name) {
        if (this.checkNameExists(name)) return false;

        this.categoryList.push(name);
    }

    deleteCategory(name) {
        this.categoryList = this.categoryList.filter((value) => {
            return value !== name;
        });
    }

    updateCategory(name, newName) {
        if (this.checkNameExists(newName)) return false;

        this.categoryList = this.categoryList.map((value) => {
            if (value === name) return newName;
            else return value;
        });
    }

    checkNameExists(name) {
        for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i] === name) return true;
        }
        return false;
    }
}