const Notes = require("../notes.js");
const cross = require("../../assets/images/cross.svg");
const Utility = require("../utility.js");
import "../../assets/styles/notes.css";

class NoteDisplay {
    static clearDisplay(parent) {
        Utility.removeChildElements(parent);
    }

    static createDisplay(columnCount, parent) {
        return this.createNotes(this.createColumns(columnCount, parent));
    }

    static createColumns(columnCount, parent) {
        const columnWrapper = Utility.createElement({
            tag: "div",
            styles: {
                display: "flex",
                width: "100%",
                height: "100%",
                gap: "20px",
                padding: "20px 80px 80px 60px"
            },
            parent: parent
        });

        let columns = [];

        for (let i = 0; i < columnCount; i++) {
            const newColumn = Utility.createElement({
                tag: "div",
                styles: {
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                },
                parent: columnWrapper
            });

            columns.push(newColumn);
        }

        return columns;
    }

    static createNotes(columns) {
        let notes = [];

        Notes.noteList.forEach((note, index) => {
            const parentColumn = columns[Utility.getColumnPosition(index, columns.length)];
            
            const newNote = Utility.createElement({
                tag: "div",
                styles: {
                    backgroundColor: "rgb(60, 60, 60)",
                    padding: "20px",
                    borderRadius: "16px",
                    position: "relative"
                },
                attributes: ["data-id", note.id],
                parent: parentColumn
            });
    
            const deleteButton = Utility.createElement({
                tag: "input",
                styles: {
                    width: "20px",
                    position: "absolute",
                    top: "10px",
                    right: "10px"
                },
                attributes: ["type", "image", "src", cross],
                parent: newNote
            });
    
            const title = Utility.createElement({
                tag: "h1",
                styles: {
                    fontSize: "22px",
                    marginBottom: "6px"
                },
                textContent: note.title,
                parent: newNote
            });
    
            const description = Utility.createElement({
                tag: "p",
                styles: {
                    fontSize: "20px"
                },
                innerHTML: note.description,
                parent: newNote
            });

            notes.push(newNote);
        });

        return notes;
    }
}

alert("NoteDisplay");

module.exports = NoteDisplay;
