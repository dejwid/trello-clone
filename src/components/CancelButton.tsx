import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CancelButton({onClick}:{onClick:() => void}) {
  return (
    <button
      className="mt-4 w-full flex gap-2 items-center justify-center uppercase text-sm text-gray-400"
      onClick={onClick}>
      <FontAwesomeIcon icon={faClose}/>
      Cancel edit
    </button>
  );
}