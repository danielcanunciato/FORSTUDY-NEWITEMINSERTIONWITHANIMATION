import "./App.css"

import { useState } from "react";

const returnRandomColour = () => {
  const COLORS = ["red", "blue", "lime", "green", "gold", "orange"]

  // And the color is:
  return COLORS[Math.floor(Math.random()*COLORS.length)]
}

export default function App() {

  const words = [
    "Sword",
    "Moon",
    "Lantern",
    "Dragon",
    "Key",
    "Crystal",
    "Book",
    "Shield",
    "Crown",
    "Potion",
    "Thunder",
    "Compass",
    "Feather",
    "Clock",
    "Mirror",
    "Hammer",
    "Shadow",
    "Ring",
    "Rose",
    "Map",
    "Gem",
    "Mask",
    "Anchor",
    "Machine"
  ];

  const [disabled, setDisabled] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [items, setItems] = useState([]);
  const MAX = 23
  const __DISAPPEAR_TIME = 1.75;

  const createNewBlock = () => {
    if (disabled) { return; }

    const newID = items.length > 0 ? (items[items.length-1]+1) : 0

    if (items.length === MAX) {
      setDisabled(true);
    }

    console.log(`New block of ID ${newID}`)

    return setItems(prev=>[...prev, newID])
  }

  const clearBlocks = () => {
    setRemoving(true);
    setDisabled(true);

    setTimeout(()=>{setRemoving(false);setDisabled(false);setItems([]);}, __DISAPPEAR_TIME*1000)

    return console.log("Cleared blocks")
  }

  return (
    <>

      <p>{items.length <= MAX ? `ITEMS: ${items.length}` : `LIMIT REACHED`}</p>
      <button 
        className={`add-item ${items.length > MAX ? "btn-disabled" : removing ? "btn-disabled" : ""}`}
        disabled={disabled}
        onClick={createNewBlock}
      >
            Add new item
      </button>

      <button 
        className={`add-item ${removing && "btn-disabled"}`}
        onClick={clearBlocks}
      >
        Clear blocks
      </button>
    
      <div className="items-grid">

        {
          items.map((item, i) => (
            <div 
              key={i}
              className={`item-content ${removing && "item-remove"}`}
              style={{borderColor: `${returnRandomColour()}`}}
            >

                <h1 className="item-name">
                  W:{words[item]}
                </h1>
                <p style={{marginTop: "-20px"}}>ID: {item}</p>

            </div>
          ))
        }

      </div>
    
    </>
  )
}