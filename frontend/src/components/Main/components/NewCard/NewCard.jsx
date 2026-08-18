import { useState } from "react";

export default function NewCard({ onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function checkFormValidity(nameInput, linkInput) {
    setIsValid(nameInput.validity.valid && linkInput.validity.valid);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    checkFormValidity(e.target, document.getElementById("card-link"));
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
    checkFormValidity(document.getElementById("card-name"), e.target);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    onAddCard({ name, link })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="card-name-error">{nameError}</span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="card-link-error">{linkError}</span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}