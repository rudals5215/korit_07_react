import { useEffect, useState } from "react";

function Counter2 () {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  // useEffect는 호출되었지만 callback 함수는 호출되지 않았다.
  useEffect(() => {console.log('Hello ! Changed the state, count!')}, [count2]);

  return (
    <>
      <p> Counter2 : {count} </p>
      <button onClick={() => setCount((preCount) => preCount + 1)}>
        증가
      </button>
    </>
  );
}

export default Counter2