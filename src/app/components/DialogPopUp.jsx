import { useEffect, useRef } from "react";

import * as Icon from "react-icons/ai";

export default function DialogPopUp({
  id,
  className,
  dialogTitle = "Dialog",
  dialogState = false,
  setDialogState,
  render = null,
  renderContent = null,
  children,
}) {
  const dialog = useRef(null);

  useEffect(() => {
    if (!dialogState) {
      dialog.current.close();
      setDialogState(!dialogState);
    } else {
      dialog.current.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialog}
      id={id}
      className={className + " p-2 rounded-lg bg-base-300"}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">{dialogTitle}</h1>
        <Icon.AiFillCloseCircle
          className="cursor-pointer text-[crimson] hover:text-error"
          size={24}
          onClick={() => {
            setDialogState(!dialogState);
            dialog.current.close();
          }}
        />
      </div>
      <div className="divider my-1"></div>
      {!render && children}
      {render(renderContent)}
    </dialog>
  );
}
