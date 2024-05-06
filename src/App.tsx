//libraries
import { useState } from "react";

//components
import Component1 from "./Component1";
import Component2 from "./Component2";

//styles
import "./App.css";

//hooks
import useFetch from "./hooks/useFetch";

function App() {
  //states
  const [count, setCount] = useState<number>(0);

  //hooks
  const a = useFetch(
    `https://animechan.xyz/api/random/`,
    { count },
    false,
    "app"
  );
  console.debug("a: ", a);

  //renderer
  return (
    <>
      <Component1 />
      <Component2 />
    </>
  );
}

export default App;
