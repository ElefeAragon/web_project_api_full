import { useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
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
          onChange={(e) => setAvatar(e.target.value)}
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}