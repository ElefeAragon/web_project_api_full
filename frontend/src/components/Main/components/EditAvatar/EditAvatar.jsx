export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input"
          id="avatar-link"
          name="avatar"
          placeholder="Enlace de la imagen"
          type="url"
          required
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
