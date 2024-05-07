//libraries
import { useState } from "react";

//hooks
import useFetch from "./hooks/useFetch";

function App() {
  //states
  const [count, setCount] = useState<number>(0);

  //hooks
  const b = useFetch(`https://animechan.xyz/api/random/`, { count }, false);
  const bb = useFetch(`https://animechan.xyz/api/quotes`, { count }, false);

  console.debug("b: ", b);
  console.debug("bb: ", bb);

  //renderer
  return (
    <>
      <div className="card">
        component 1
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
