class Utility {
    static randomString(length = 10, options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123467890") {
        let id = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = this.randomInt(options.length);
            id += this.randomChar(options);
        }
        return id;
    }

    static randomChar(options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        const randomIndex = this.randomInt(options.length);
        const randomChar = options[randomIndex];
        return randomChar;
    }

    static randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static removeChildElements(parent) {
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    static createElement({ tag = "div", styles = {}, hoverStyles = {}, attributes = [], textContent = "", innerHTML = "", parent = "" } = {}) {
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

    static assignFunction({ elements, functionToAssign, event = "click" } = {}) {
        elements.forEach((element, index) => {
            element.addEventListener(event, () => {
                functionToAssign(element, index);
            });
        });
    }

    static capitalize(string) {
        const firstLetter = string[0].toUpperCase();
        const otherLetters = string.slice(1, string.length).toLowerCase();
        return firstLetter + otherLetters;
    }
}

module.exports = Utility;
