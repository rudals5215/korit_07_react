import HelloProps from "./types/type";

function ByeComponent({ name }: HelloProps) {
  // 객체 구조분해 part 참조
  return (
    <>
      <h1>Bye {name} ! </h1>
    </>
  );
}

export default ByeComponent;