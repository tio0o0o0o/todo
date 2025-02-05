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

    static createElement({ tag = "div", styles = {}, attributes = [], textContent = "", innerHTML = "", parent = "" } = {}) {
        const element = document.createElement(tag);
        if (Object.keys(styles).length !== 0) Object.assign(element.style, styles);
        if (attributes.length !== 0) {
            for(let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        if (textContent) element.textContent = textContent;
        if (innerHTML) element.innerHTML = innerHTML;
        if (parent) parent.appendChild(element);

        return element;
    }

    static getColumnPosition(position, columnLength) {
        return position % columnLength;
    }
}

module.exports = Utility;
