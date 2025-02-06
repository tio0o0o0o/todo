import NotesModel from "../models/notes-model.js";
import NotesView from "../views/notes-view.js";

const notesView = new NotesView();

class NotesController {
    get notes() {
        return NotesModel.read();
    }

    updateView() {
        notesView.delete();
        notesView.create(this.notes);
        this.#assignDelete();
        this.#assignCreate();
    }

    createPlaceholder(count = 1) {
        for (let i = 0; i < count; i++) {
            NotesModel.create({
                title: `Placeholder note ${i + 1}`,
                description: "1. First item 2. Second item 3. Third item"
            });
        }
        this.updateView();
    }

    #assignFunction({ elements, functionToAssign, event = "click" } = {}) {
        elements.forEach((element, index) => {
            element.addEventListener(event, () => {
                functionToAssign(element, index);
            });
        });
    }

    #assignDelete() {
        this.#assignFunction({
            elements: document.querySelectorAll(".deleteButton"),
            functionToAssign: (element) => {
                NotesModel.delete(element.parentNode.dataset.id);
                this.updateView();
            }
        });
    }

    #assignCreate() {
        this.#assignFunction({
            elements: [document.querySelector(".createNoteButton")],
            functionToAssign: () => {
                NotesModel.create();
                this.updateView();
            }
        });
    }   
}

const notesController = new NotesController();

notesController.createPlaceholder(5);
