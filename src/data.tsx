import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';



const classname = "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]";


type ArrayCard = [IconProp,string];
type ReactKey = [React.ReactElement,string];

const arrcards:ArrayCard[] = [
    [solid('anchor'),'anchor'],
    [solid('apple-whole'),'apple-whole'],
    [brands('bitcoin'),'bitcoin'],
    [solid('face-grin'),'face-grin'],
    [solid('face-surprise'),'face-surprise'],
    [brands('android'),'android'],
    [brands('autoprefixer'),'autoprefixer'],
    [solid('battery-three-quarters'),'battery-three-quarters'],
    [solid('battery-full'),'battery-full'],
    [solid('bomb'),'bomb'],
    [solid('bone'),'bone'],
    [brands('bootstrap'),'bootstrap'],
    [solid('compass'),'compass'],
    [brands('dev'),'dev'],
    [solid('diamond'),'diamond'],
    [brands('docker'),'docker'],
    [brands('free-code-camp'),'free-code-camp'],
    [solid('code'),'code']
]

 const data = {
    card16: [],
    card20: [],
    card24: [],
    card30: [] 
}
function shuffleArray(array:ArrayCard[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//1-Shuffling the whole array
//2-Depending on the number of cards chosen by user, that number of cards
//will be taken from shuffled array and added to new empty array
//3-As there should be 2 same card in the game, 2 of them were added to the new array
//with different Reactkey
const placeRandomly = (arrc:ArrayCard[], arr:ReactKey[], number:number) => {
    shuffleArray(arrc);
    for (let icon of arrc) {
        if (arr.length < number) {
            arr.push([<FontAwesomeIcon icon={icon[0]} className={classname} key={icon[1]}/>,icon[1] + "1"]);
            arr.push([<FontAwesomeIcon icon={icon[0]} className={classname} key={icon[1]}/>,icon[1] + "2"]);
        }
    }
}

window.onload = () => {
    placeRandomly(arrcards,data.card16,16);                      
    placeRandomly(arrcards,data.card20,20);                      
    placeRandomly(arrcards,data.card24,24);                      
    placeRandomly(arrcards,data.card30,30);                  
}
    
export default data;