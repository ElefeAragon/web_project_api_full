import successIcon from "../images/Success.png";
import failIcon from "../images/Fail.png";

function InfoTooltip({ isOpen, isSuccess, onClose, errorMessage }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup popup_opened" onClick={onClose}>
      <div
        className="popup__container_type_tooltip"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="popup__close" onClick={onClose} />

        <img
          src={isSuccess ? successIcon : failIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="popup__icon"
        />

        <h2 className="popup__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : errorMessage || "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;