"use strict";
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

let $ = (id) => {
    return document.getElementById(id);
};

async function fetchFromDictionaryAPI(url) {
    const response = await fetch(url);
    if(response.ok) {
        const data = await response.json() 
        return data;
    } else throw new Error('Something went wrong!');
    
}

window.addEventListener('load', () => {
    $('searchBtn').addEventListener('click', () => {
        const TextFieldValue = $('inputBox').value.toLowerCase(); 
        const FULL_URL = API_URL.concat(TextFieldValue);
        
        //  Clear word wrapper
        const myNode = $("wordWrapper");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    
        fetchFromDictionaryAPI(FULL_URL).then(data => {
            data.forEach((wordObj) => {
                const word = wordObj.word;
                const meanings = wordObj.meanings;

                let counter = 0;
                
                //  Empty arrays for part of speech and definition
                let pos = [];
                let defin = [];
                let myDef = []; 
                
                //  Extract part of speech
                for(let i=0; i<meanings.length; i++) {
                    pos.push(meanings[i].partOfSpeech);
                }

                //  Extract definitions all definitions
                for(let i=0; i<meanings.length; i++) {
                    for(let j=0; j<meanings[i].definitions.length; j++) {
                        defin.push(meanings[i].definitions[j].definition);
                    }
                    defin.push('|');    //  Separate with a pipe symbol
                }
        
                //  Extract definitions one by one
                for(let i=0; i<meanings.length; i++) {
                    let temp = [];
                    for(let j=counter; j<defin.length; j++) {
                        let el = defin[j];
                        if(el !== '|') {
                            temp.push(el);
                            counter++;
                        } 
                        else {
                            myDef.push(temp);
                            counter++;
                            break;
                        }
                    }
                }
                //  Create object
                const CustomElementsObject = new CreateCustomElements(pos, TextFieldValue);

                $('wordWrapper').insertAdjacentHTML('beforeend', CustomElementsObject.createWordElement());

                for(let i=0; i<pos.length; i++) {
                    myDef[i] = myDef[i].join('\n');
                    myDef[i] = myDef[i].toString().replaceAll('.', '<br>').replaceAll(';', '<br>');
                    console.log(`${pos[i]}:\n${myDef[i]}`);
                    const HTMLDef = CustomElementsObject.createDefinitionElement(myDef[i]);
                    $('result-container').insertAdjacentHTML('beforeend', HTMLDef);
                }

            });
        });
    });
});