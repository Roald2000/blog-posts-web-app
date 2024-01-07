import { useEffect, useState } from "react";

const ResponseDiv = ({ message, state = false }) => {
  const fState = "text-error-content bg-error";
  const tState = "text-success-content bg-success";

  const [currentState, setCurrentState] = useState(null);

  useEffect(() => {
    if (!state) {
      setCurrentState(fState);
    } else {
      setCurrentState(tState);
    }
  }, [state]);

  return (
    <div className={`${currentState} p-2 rounded-md my-3 w-full`}>
      <p>{message}</p>
    </div>
  );
};

export default ResponseDiv;
