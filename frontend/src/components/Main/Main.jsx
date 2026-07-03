import { useState } from "react";

import Popup from "./components/Popup/Popup";
import NewCard from "./components/NewCard/NewCard";
import EditProfile from "./components/EditProfile/EditProfile";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

const cards = [
  {
    isLiked: false,
    _id: "1",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    isLiked: false,
    _id: "2",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);

  const { currentUser } = useCurrentUser();

  // POPUPS
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  // HANDLERS
  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      {/* PROFILE */}
      <section className="profile page__section">
        {/* AVATAR */}
        <div
          className="profile__avatar-container"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            className="profile__image"
            src={
              currentUser?.avatar ||
              "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/default-avatar.jpg"
            }
            alt="Avatar"
          />
          <div className="profile__overlay"></div>
        </div>

        {/* INFO */}
        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser?.name || "Jacques Cousteau"}
          </h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">
            {currentUser?.about || "Explorador"}
          </p>
        </div>

        {/* ADD CARD */}
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      {/* CARDS */}
      <section className="cards page__section">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>

      {/* POPUP */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
