const Notes = require("../notes.js");
const cross = require("../../assets/images/cross.svg");
const Utility = require("../utility.js");
import "../../assets/styles/notes.css";

function build(parent = document.querySelector("main")) {
    Utility.removeChildElements(parent);

    const columnWrapper = document.createElement("div");
    const column1 = document.createElement("div");
    const column2 = document.createElement("div");
    const column3 = document.createElement("div");

    columnWrapper.appendChild(column1);
    columnWrapper.appendChild(column2);
    columnWrapper.appendChild(column3);

    Object.assign(columnWrapper.style, {
       display: "flex",
       width: "100%",
       height: "100%",
       gap: "20px",
       padding: "20px 80px 80px 60px",
    });
    Object.assign(column1.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    });
    Object.assign(column2.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    });
    Object.assign(column3.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    });

    Notes.noteList.forEach((note, index) => {
        const newNote = document.createElement("div");

        const deleteButton = Utility.createElement(
            "input", 
            newNote,
            {
                width: "20px",
                position: "absolute",
                top: "20px",
                right: "20px"
            },
            [
                "type", "image",
                "src", cross,
            ],
            "",
            ""
        );
        const title = Utility.createElement(
            "h1", 
            newNote,
            {
                fontSize: "22px",
                marginBottom: "6px"
            },
            [],
            note.title,
            ""
        );
        const description = Utility.createElement(
            "p", 
            newNote,
            {
                fontSize: "20px"
            },
            [],
            "",
            note.description
        );

        newNote.dataset.id = note.id;

        Object.assign(newNote.style, {
            backgroundColor: "rgb(60, 60, 60)",
            padding: "20px",
            borderRadius: "16px",
            position: "relative"
        });

        deleteButton.addEventListener("click", () => {
            console.log("Deleting");
            console.log(Notes.deleteNote(deleteButton.parentNode.dataset.id));
            build();
        });

        newNote.appendChild(description);

        if ((index + 1) % 3 === 1) column1.appendChild(newNote);
        else if ((index + 1) % 3 === 2) column2.appendChild(newNote);
        else if ((index + 1) % 3 === 0) column3.appendChild(newNote);
    });

    parent.appendChild(columnWrapper);
}

build();



