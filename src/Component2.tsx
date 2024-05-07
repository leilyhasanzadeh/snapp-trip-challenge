//libraries
import { useState } from "react";

//styles
import "./App.css";

//hooks
import useFetch from "./hooks/useFetch";

function App() {
  //states
  const [count, setCount] = useState<number>(0);

  //hooks
  const c = useFetch(`https://animechan.xyz/api/random/`, { count }, false);
  const cc = useFetch(`https://animechan.xyz/api/quotes`, { count }, false);

  console.debug("c: ", c);
  console.debug("cc: ", cc);

  //renderer
  return (
    <>
      <div className="card">
        component 2
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
