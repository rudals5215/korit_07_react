import HelloProps from "./types/type";

function HelloComponent ({name, age} : HelloProps) {   // 객체 구조분해 part 참조
  return (
    <>
      Hello, {name}, you are {age} years old!
    </>
  )
}

export default HelloComponent;