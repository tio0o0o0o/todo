import NotesModel from "../models/notes-model.js";
import NotesView from "../views/notes-view.js";

class NotesController {
    #notesView = new NotesView();

    get notes() {
        return NotesModel.read();
    }

    updateView() {
        this.#notesView.delete();
        this.#notesView.create(this.notes);
        this.#assignDelete();
        this.#assignCreate();
        this.#assignUpdateDescription();
        this.#assignUpdateTitle();
    }

    createPlaceholder(count = 1) {
        for (let i = 0; i < count; i++) {
            NotesModel.create({
                title: `Placeholder note ${i + 1}`,
                description: "1. First item\n2. Second item\n3. Third item"
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

    #assignUpdateDescription() {
        this.#assignFunction({
            elements: document.querySelectorAll(".description"),
            functionToAssign: (element) => {
                NotesModel.update(element.parentNode.dataset.id, {
                    description: element.value
                });
            },
            event: "focusout"
        });
    }

    #assignUpdateTitle() {
        this.#assignFunction({
            elements: document.querySelectorAll(".title"),
            functionToAssign: (element) => {
                NotesModel.update(element.parentNode.dataset.id, {
                    title: element.value
                });
                console.table(this.notes);
            },
            event: "focusout"
        });
    }
}

const notesController = new NotesController();

notesController.updateView();
