import { useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    setAvatarError(e.target.validationMessage);
    setIsValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    onUpdateAvatar({ avatar })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input"
          id="avatar-link"
          name="avatar"
          placeholder="Enlace de la imagen"
          type="url"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
        <span className="popup__error" id="avatar-link-error">{avatarError}</span>
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