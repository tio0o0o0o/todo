import Note from "./note.js";
import Utility from "../utility/utility.js";

export default class NotesModel {
    static notes = this.initializeProxy();
    static hasInitialized = false;

    static create({ title = "New note", description = "" } = {}) {
        const newNote = new Note(title, description);
        this.notes.push(newNote);

        // Save data
        this.saveDataProxy();

        return newNote;
    }

    static read() {
        return this.notes;
    }

    static update(id, { title = "", description } = {}) {
        const note = this.notes.find((note) => note.id === id);

        if (!note) throw new Error(`ID of ${id} was not found`);

        if (title !== "") note.title = title;
        if (description !== undefined) note.description = description;

        // Save data
        this.saveDataProxy();
    }

    static delete(id) {
        this.notes = this.notes.filter((note) => {
            return note.id !== id;
        });

        // Save data
        this.saveDataProxy();
    }

    static initializeProxy() {
        if (!this.hasInitialized) {
            this.hasInitialized = true;
            const notesParsed = JSON.parse(localStorage.getItem("notes"));
            if (notesParsed) {
                return notesParsed;
            } 
            else {
                return this.createDefault();
            }
        }
    }

    static createDefault() {
        return [
            new Note("How to creating aura", "1. Mewing \n2. Edgemaxing \n3. Avoid gooning"),
            new Note("Gyatt tier list", "S Tier \n• Sophie Rain \n• Livvy Dunne \n\nF Tier \n• Ice Spice")
        ];
    }

    static saveDataProxy() {
        const notesString = JSON.stringify(this.notes);
        localStorage.setItem("notes", notesString);
    }
}



