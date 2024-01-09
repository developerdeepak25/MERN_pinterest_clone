import { useEffect, useState } from "react";

export const useFormValidation = (initial, inputObj) => {
  const [errorMsg, setErrorMsg] = useState(initial);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    let timeId;
    if (errorMsg) {
      timeId = setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
    }
    return () => clearTimeout(timeId);
  }, [errorMsg]);

  useEffect(() => {
    const isNotValid = Object.values(inputObj).some(
      (input) => input.trim() === ""
    );
    // console.log('isNotValid', isNotValid);
    setSubmitDisabled(isNotValid);
  }, [inputObj]);

  return [submitDisabled, errorMsg, setErrorMsg];
};
