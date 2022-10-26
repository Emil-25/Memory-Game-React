import { brands, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import MemoryCard from './MemoryCard'
import data from './data'

interface Cards {
    num: number;
}
function shuffleArray(array:React.ReactElement[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let classname = "flex flex-wrap justify-evenly md:w-[70%] sm:w-[80%] h-auto mx-auto"

export default function MemoryCards(props:Cards) {
    let array;

    switch (props.num) {
        case 16:
        array = data.card16;
        shuffleArray(array); //if not shuffled same cards would be placed side-by-side
        return (
            <div className={classname}>
                {array.map((icon) =>  
                    <MemoryCard img={icon[0]} key={icon[1]+"C"}/>
                )}
            </div>
        )
        case 20:
        array = data.card20;
        shuffleArray(array);
        return (
            <div className={classname}>
                {array.map((icon) =>  
                    <MemoryCard img={icon[0]} key={icon[1]+"C"}/>
                )}
            </div>
        )
        case 24:
        array = data.card24;
        shuffleArray(array);
        return (
            <div className={classname}>
                {array.map((icon) =>  
                    <MemoryCard img={icon[0]} key={icon[1]+"C"}/>
                )}
            </div>
        )
        case 30:
        array = data.card30;
        shuffleArray(array);
        return (
            <div className={classname}>
                {array.map((icon) =>  
                    <MemoryCard img={icon[0]} key={icon[1]+"C"}/>
                )}
            </div>
        )
        default:
            array = data.card30;
            return (
                <div className={classname}>
                    {array.map((icon) =>  
                        <MemoryCard img={icon[0]} key={icon[1]+"C"}/>
                    )}
                </div>
            )
}
}
