export default function EditProfile() {
  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      id="edit-profile-form"
      noValidate
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
        />
        <span className="popup__error" id="profile-name-error"></span>
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
        />
        <span className="popup__error" id="profile-about-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
