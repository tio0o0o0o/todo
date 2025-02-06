import Utility from "../utility/utility.js";
const cross = require("../assets/images/cross.svg");
const plus = require("../assets/images/add.svg");
import "../assets/styles/notes.css";

export default class NotesView {
    constructor(parent = document.querySelector("main")) {
        this.parent = parent;
    }

    create(notes) {
        const grid = Utility.createElement({
            tag: "div",
            attributes: ["class", "grid"],
            parent: this.parent
        });

        notes.forEach((note) => {
            this.#createNote(note, grid);
        });

        const createNoteButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "createNoteButton", "type", "image", "src", plus],
            parent: this.parent
        });
    }

    #createNote(note, noteParent) {
        const newNote = Utility.createElement({
            tag: "div",
            attributes: ["class", "newNote", "data-id", note.id],
            parent: noteParent
        });

        const title = Utility.createElement({
            tag: "input",
            attributes: ["class", "title", "value", note.title],
            parent: newNote
        });

        const description = Utility.createElement({
            tag: "textArea",
            attributes: ["class", "description", "placeholder", "My thoughts..."],
            textContent: note.description,
            parent: newNote
        });

        const deleteButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "deleteButton", "type", "image", "src", cross],
            parent: newNote
        });
    }

    delete() {
        while (this.parent.hasChildNodes()) {
            this.parent.removeChild(this.parent.lastChild);
        }
    }
}
