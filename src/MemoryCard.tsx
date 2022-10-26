import React, { useRef, useState, useContext } from 'react'
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { statsContext } from "./App"

interface Card {
  img: React.ReactElement
}

let pairs:React.Key[] = [];

export default function MemoryCard(props:Card) {

  const stats = useContext(statsContext);

  const flipcard = useRef<HTMLDivElement | null>(null);
  const flipcardInner = useRef<HTMLDivElement | null>(null);
  const front = useRef<HTMLDivElement | null>(null);
  const back = useRef<HTMLDivElement | null>(null);

  let flipcardElements = Array.from(document.querySelectorAll(".flipcard"));
  let turned:Element[];  

  if (flipcard.current !== null) {
    flipcard.current.onclick = (e) => {
      e.preventDefault();
      stats.timer = 1;
      flipcardInner.current?.classList.add("turned");                            //clicked card turned
      flipcardElements.forEach((e) => {e.classList.add("parent-blocked")})  //every card blocked
      turned = Array.from(document.querySelectorAll(".turned"));              //every turned card
      props.img.key !== null ? pairs.push(props.img.key) : pairs.push("none");
      if (pairs.length === 2) {
        if(pairs[0] === pairs[1]) {
          stats.openedCards = stats.openedCards + 2;
          turned.forEach((e) => {
            e.classList.add("pairs-turned");                         //making sure found cards are not disturbed anymore
            e.parentElement?.classList.add("pairs-parents-blocked"); // and created extra classes for them
            e.parentElement?.classList.remove("parent-blocked");     
          })
        }
        setTimeout(() => {turned.forEach((e) => {e.classList.remove("turned");})},501);         // with setTimeout user will not be able to interact with game until card closes
        pairs = [];                                                                             //put 501 to prevent possible bugs
      }
      setTimeout(() => {flipcardElements.forEach((e) => {e.classList.remove("parent-blocked")})},501);
      if (flipcardElements.length === Array.from(document.querySelectorAll(".pairs-turned")).length) {
        stats.wonGames++;
        stats.timer = 2;
      }
      localStorage.setItem("openedCards",stats.openedCards.toString());
      localStorage.setItem("wonGames",stats.wonGames.toString());
    }
    
  }

  const bgFront = ["bg-red-600", "bg-amber-400", "bg-lime-600"];
  const bgBack = ["bg-sky-800", "bg-emerald-700", "bg-purple-700"];
  const icons = [solid("database"), solid("ghost"), solid("certificate")]

  front.current?.classList.add(bgFront[stats.random])
  back.current?.classList.add(bgBack[stats.random])

  return (
    <div ref={flipcard} className="border-2 border-black flipcard bg-transparent justify-center aspect-[3/4] inline-block sm:m-1 lg:w-[10%] md:w-[15%] sm:w-[14%] w-[18%]">  
        <div ref={flipcardInner} className='flipcard-inner w-full h-full duration-500 relative'>
            <div ref={front} className='backface absolute bg- w-full h-full text-center md:text-[3.5rem] sm:text-[3rem] xs:text-[2.7rem] text-[2rem] '>
              <FontAwesomeIcon icon={icons[stats.random]} className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'/>
            </div>
            <div ref={back} className='backface absolute rotate-y-180 w-full h-full md:text-[3.5rem] sm:text-[3rem] xs:text-[2.7rem] text-[2rem] '>
              {props.img}
            </div>
        </div>
    </div>
  )
}
