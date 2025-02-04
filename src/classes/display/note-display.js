const notes = require("../notes.js");
import "../../assets/styles/notes.css";

function build(parent = document.querySelector("main")) {
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
       padding: "20px 80px 80px 80px",
    //    backgroundColor: "red"
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

    notes.noteList.forEach((note, index) => {
        const newNote = document.createElement("div");
        const title = document.createElement("h1");
        const description = document.createElement("p");

        title.innerHTML = note.title;
        description.innerHTML = note.description;

        Object.assign(newNote.style, {
            backgroundColor: "rgb(60, 60, 60)",
            padding: "20px",
            borderRadius: "16px"
        });
        Object.assign(title.style, {
            fontSize: "22px",
            marginBottom: "6px"
        });
        Object.assign(description.style, {
            fontSize: "20px"
        });

        newNote.appendChild(title);
        newNote.appendChild(description);

        if ((index + 1) % 3 === 1) column1.appendChild(newNote);
        else if ((index + 1) % 3 === 2) column2.appendChild(newNote);
        else if ((index + 1) % 3 === 0) column3.appendChild(newNote);
    });

    parent.appendChild(columnWrapper);

    // notes.noteList.forEach((note) => {
    //     const newNote = document.createElement("div");
    //     const title = document.createElement("h1");
    //     const description = document.createElement("p");
        
    //     title.textContent = note.title;
    //     description.textContent = note.description;

    //     Object.assign(newNote.style, {
    //         backgroundColor: "rgb(50, 50, 50)",
    //         padding: "20px",
    //         borderRadius: "10px"
    //     });

    //     newNote.appendChild(title);
    //     newNote.appendChild(description);
    //     gridWrapper.appendChild(newNote);
    // });

    // parent.appendChild(gridWrapper);
}

build();