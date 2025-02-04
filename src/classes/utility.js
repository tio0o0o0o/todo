class Utility {
    static generateId(length = 20) {
        let id = "";

        for (let i = 0; i < length; i++) {
            id += this.randomChar();
        }

        return id;
    }

    static randomChar(chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        const availableCharacters = chars.split("");
        const randomIndex = this.randomInt(availableCharacters.length);
        const randomChar = availableCharacters[randomIndex];
        return randomChar;
    }

    // 0 to max - 1
    static randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static removeChildElements(parent) {
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    static createElement(type = "div", parent, styles = {}, attributes = [], textContent = "", innerHTML = "") {
        const newElement = document.createElement(type);
        Object.assign(newElement.style, styles);

        for(let i = 0; i < attributes.length; i += 2) {
            newElement.setAttribute(attributes[i], attributes[i + 1]);
        }

        if (textContent !== "") newElement.textContent = textContent;

        if (innerHTML !== "") newElement.innerHTML = innerHTML;

        parent.appendChild(newElement);

        return newElement;
    }
}

module.exports = Utility;
