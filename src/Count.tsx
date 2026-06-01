import { useState } from 'react'

import './Count.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")

  function changeCount(amt: number) {
    setCount(prev => Math.max(0, prev + amt));
  }

  function resetCount() {
    setCount(0);
  }

  function getMessage() {
    if (count < 50) {
      return "";
    } else if (count < 100) {
      return "Cool counting!";
    } else if (count < 150) {
      return "Much count!";
    } else if (count < 200) {
      return "Wow such count!";
    }
  }

  return (
    <div className="page-container">
      <div className="main-container">

        <h1 className="title">
          Cool Button of Counting!
        </h1>

        <div className="button-row">
          <button className="button buttonCount" onClick={() => changeCount(1)}>
            Increase
          </button>
          <button className="button buttonCount" onClick={() => changeCount(-1)}>
            Decrease
          </button>
        </div>

        <p className="count">Count: {count}</p>

        <div className="messageArea">
          {<p>{getMessage()}</p>}
        </div>

        <button className="button buttonReset" onClick={resetCount}>
          Reset
        </button>

      </div>
    </div>
  )
}

export default App
