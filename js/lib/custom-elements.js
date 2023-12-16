class CreateCustomElements {
    #counter = -1;
    constructor(partOfSpeech, word) {
        this.partOfSpeech = partOfSpeech;
        this.word = word;
    }

    createWordElement() {
        return `<h1 class="display-6 mt-3" id="word">${this.word}</h1>`;
    };

    #createRoundedDiv(content) {
        return `<div class="border rounded border-1 border-secondary mt-2 p-4">${content}</div>`
    }

    createDefinitionElement(definition) {
        this.#counter += 1;
        const pos = `<p class="lead fs-5 fst-italic">${this.partOfSpeech[this.#counter]}</p>`;
        const def = `<p class="pt-1">${definition}</p>`;
        return this.#createRoundedDiv(pos.concat(def));
    }
}