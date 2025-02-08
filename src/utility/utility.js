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

    static storageAvailable(type) {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }
}

module.exports = Utility;
