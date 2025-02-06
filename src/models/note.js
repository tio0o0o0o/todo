import Utility from "../utility/utility.js";

export default class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.id = Utility.randomString(20);
    }
}