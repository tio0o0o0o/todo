export default class Utility {
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
}


