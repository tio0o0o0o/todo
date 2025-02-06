import Utility from "../utility/utility";

export default class NotesView {
    constructor(parent = document.querySelector("main")) {
        this.parent = parent;
    }

    create(notes) {
        notes.forEach((note) => {
            this.#createNote(note);
        });

        const Button = Utility.createElement({
            tag: "button",
            attributes: ["class", "createNoteButton"],
            textContent: "+ New Note",
            parent: this.parent
        });
    }

    #createNote(note) {
        const newNote = Utility.createElement({
            tag: "div",
            styles: {
                backgroundColor: "grey"
            },
            attributes: ["class", "newNote", "data-id", note.id],
            parent: this.parent
        });

        const title = Utility.createElement({
            tag: "input",
            attributes: ["class", "title", "value", note.title],
            parent: newNote
        });

        const description = Utility.createElement({
            tag: "textArea",
            styles: {
                resize: "none",
                width: "300px",
                height: "200px",
                overflow: "auto",
            },
            attributes: ["class", "description"],
            textContent: note.description,
            parent: newNote
        });

        const deleteButton = Utility.createElement({
            tag: "button",
            attributes: ["class", "deleteButton"],
            textContent: "Delete",
            parent: newNote
        });
    }

    delete() {
        while (this.parent.hasChildNodes()) {
            this.parent.removeChild(this.parent.lastChild);
        }
    }
}
