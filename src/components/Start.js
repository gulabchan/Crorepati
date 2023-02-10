import { useRef } from "react";

const Start = ({ setUsername }) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  return (
    <div className="start">
      <h1>CROREPATI CLONE</h1>
      <h2>- Gulab Chand </h2>
      <input
        placeholder="Enter your name"
        className="startInput"
        ref={inputRef}
      ></input>
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
};

export default Start;
