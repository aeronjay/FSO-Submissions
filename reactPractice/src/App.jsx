import { useState } from "react"

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleRightClicks = () => {
    const newRight = clicks.right + 1;
    const newClicks = {
      ...clicks,
      right: newRight
    }
    setClicks(newClicks);
    setAll(allClicks.concat('R'));
    setTotal(clicks.left + newRight);
  }
  const handleLeftClicks = () => {
    const newLeft = clicks.left + 1;
    const newClicks = {
      ...clicks,
      left: newLeft
    }
    setClicks(newClicks);
    setAll(allClicks.concat('L'));
    setTotal(newLeft + clicks.right);

  }
  
  return (
    <>
      {clicks.left}
      <Button handleClick={handleLeftClicks} name={"left"}/> 
      <Button handleClick={handleRightClicks} name={"right"}/> 
      {clicks.right}
      <History allClicks={allClicks}/>
      <p>total {total} </p>
    </>
  ) 
}
const Button = ({handleClick, name}) => <button onClick={handleClick}>{name} </button>
const History = (props) => {
  if(props.allClicks.length === 0){
    return (
      <div>
          This App is used by pressing them buttonsz
      </div>
    )
  }
  return (
    <div>
      {props.allClicks.join(" ")}
    </div>
  )
}

export default App
