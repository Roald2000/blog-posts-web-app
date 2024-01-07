import { createPortal } from "react-dom";

export default function Teleporter({
  destination = "#portal_destination",
  children,
}) {
  return createPortal(children, document.querySelector(destination));
}
