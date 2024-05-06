//libraries
import { useState } from "react";

//hooks
import useFetch from "./hooks/useFetch";

function App() {
  //states
  const [count, setCount] = useState<number>(0);

  //hooks
  const b = useFetch(
    `https://animechan.xyz/api/random/`,
    { count },
    false,
    "component1"
  );
  console.debug("b: ", b);

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
