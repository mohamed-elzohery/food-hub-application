import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setValue] = useState("");
  const [inputIsTouched, setTouchedState] = useState(false);

  const { isValid, msg } = validateValue(enteredValue);
  const hasError = !isValid && inputIsTouched;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setTouchedState(true);
  };

  const resetHandler = () => {
    setValue("");
    setTouchedState(false);
  };

  return {
    enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    msg,
    isValid,
    resetHandler,
  };
};

export default useInput;
