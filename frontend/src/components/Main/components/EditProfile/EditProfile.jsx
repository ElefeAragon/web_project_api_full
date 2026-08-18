import { useState, useEffect } from "react";

export default function EditProfile({ currentUser, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(currentUser?.name || "");
    setAbout(currentUser?.about || "");
  }, [currentUser]);

  function checkFormValidity(nameInput, aboutInput) {
    setIsValid(nameInput.validity.valid && aboutInput.validity.valid);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    checkFormValidity(e.target, document.getElementById("profile-about"));
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
    setAboutError(e.target.validationMessage);
    checkFormValidity(document.getElementById("profile-name"), e.target);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    onUpdateUser({ name, about })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name"
          name="name"
          placeholder="Nombre"
          type="text"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="profile-name-error">{nameError}</span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          id="profile-about"
          name="description"
          placeholder="Acerca de mí"
          type="text"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={handleAboutChange}
        />
        <span className="popup__error" id="profile-about-error">{aboutError}</span>
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