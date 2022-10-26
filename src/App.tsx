import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, createContext } from 'react';
import "./index.css";
import MemoryCards from './MemoryCards';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export const statsContext = createContext({openedCards:0, wonGames:0, timer:0, random:0});

//For re-rendering the page
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1);
}


function App() {
  const [play, setPlay] = useState(true);
  const [cardNum, setCardNum] = useState(0);
  const [selection, setSelection] = useState(false);
  const [menu, setMenu] = useState(false);
  const forceUpdate = useForceUpdate();

  //After choosing card number the layout 
  //of previous game was stayed so rendering was required
  useEffect(() => {
    forceUpdate()
  },[selection]);

  //Storing the game data
  const stats = {openedCards:0, wonGames:0, timer:0, random: Math.floor((3 * Math.random()))};
  if (localStorage.getItem("openedCards") !== null) {
    stats.openedCards = Number(localStorage.getItem("openedCards"))
  }
  if (localStorage.getItem("wonGames") !== null) {
    stats.wonGames = Number(localStorage.getItem("wonGames"))
  }
  
  window.onclick = () => {document.getElementById("cards")!.innerHTML = stats.openedCards.toString();}
setTimeout(() => {
  if (localStorage.getItem("best-time") !== null) {
    document.getElementById("best-time")!.innerHTML = localStorage.getItem("best-time")!;
  }
  else {
    document.getElementById("best-time")!.innerHTML = ""
  }
  let seconds = 0;
  const timer = setInterval(() => {

    if (stats.timer === 1) {
      seconds++;
      document.getElementById("timer")!.innerHTML = seconds.toString()
    }
    else if (stats.timer === 2){
      if (localStorage.getItem("best-time") !== null && Number(localStorage.getItem("best-time")) > seconds) {
        document.getElementById("best-time")!.innerHTML = seconds.toString();
        localStorage.setItem("best-time",seconds.toString());
      }
      else if (localStorage.getItem("best-time") == null) {
        document.getElementById("best-time")!.innerHTML = seconds.toString();
        localStorage.setItem("best-time",seconds.toString());
      }
    }
  },1000)},500)

  return (
    <statsContext.Provider value={stats}>
    <div className='w-full h-full'>
      <div className='flex flex-wrap w-full justify-around p-3'>
        <div className='bg-teal-500 text-black font-serif text-2xl p-3 text-center rounded-lg m-1'>Opened Cards:<p id='cards'>{stats.openedCards}</p></div>
        <div className='bg-teal-500 text-black font-serif text-2xl p-3 text-center rounded-lg m-1'>Games Won:<p id='cards'>{stats.wonGames}</p></div>
        <div className='bg-teal-500 text-black font-serif text-2xl p-3 text-center rounded-lg m-1'>Time:<p id='timer'>{stats.timer}</p></div>
        <div className='bg-teal-500 text-black font-serif text-2xl p-3 text-center rounded-lg m-1'>Best Time:<p id='best-time'></p></div>
      </div>
      {play && 
      <button onClick={() => {setPlay(false); setSelection(true);}} 
      className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
      bg-teal-500 p-4 px-8 text-4xl hover:bg-teal-700 duration-[400ms] hover:text-white
      rounded-xl">Start</button>}

      {selection && 
      <div className='flex flex-wrap absolute mx-auto justify-around top-[50%] self-center translate-y-[-50%] left-[50%] translate-x-[-50%]'>
        <h1 className='w-full text-center text-4xl m-3 border-4 p-3 border-teal-700 font-serif'>Select The Number Of Cards:</h1>
        <button onClick={() => {setSelection(false); setCardNum(16); setMenu(true)}} className=" bg-teal-500 p-4 px-8 m-3 text-4xl hover:bg-teal-700 duration-[400ms] hover:text-white
      rounded-xl shadow-md">16</button>
        <button onClick={() => {setSelection(false); setCardNum(20); setMenu(true)}} className=" bg-teal-500 p-4 px-8 m-3 text-4xl hover:bg-teal-700 duration-[400ms] hover:text-white
      rounded-xl shadow-md">20</button>
        <button onClick={() => {setSelection(false); setCardNum(24); setMenu(true)}} className=" bg-teal-500 p-4 px-8 m-3 text-4xl hover:bg-teal-700 duration-[400ms] hover:text-white
      rounded-xl shadow-md">24</button>
        <button onClick={() => {setSelection(false); setCardNum(30); setMenu(true)}} className=" bg-teal-500 p-4 px-8 m-3 text-4xl hover:bg-teal-700 duration-[400ms] hover:text-white
      rounded-xl shadow-md">30</button>
      </div>}
      
      {cardNum === 16 && 
      <div>
        <MemoryCards num={16}/>
      </div>}

      {cardNum === 20 && 
      <div>
        <MemoryCards num={20}/>
      </div>}

      {cardNum === 24 && 
      <div>
        <MemoryCards num={24}/>
      </div>}

      {cardNum === 30 && 
      <div>
        <MemoryCards num={30}/>
      </div>}

      {menu && 
        <button onClick={() => {setCardNum(0);setPlay(true);setMenu(false);stats.timer = 0}} 
        className="p-3 bg-teal-700 text-white rounded-full m-3 hover:bg-teal-900 duration-500">
          <FontAwesomeIcon icon={solid("home")}/>
        </button>
      }
    </div>
    </statsContext.Provider>
  );
}

export default App;
