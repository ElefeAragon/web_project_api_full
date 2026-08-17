import { useState, useEffect } from "react";

import Popup from "./components/Popup/Popup";
import NewCard from "./components/NewCard/NewCard";
import EditProfile from "./components/EditProfile/EditProfile";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  // POPUP
  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // USER
  function handleUpdateUser(data) {
    return api.editUserInfo(data).then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleClosePopup();
    });
  }

  function handleUpdateAvatar(data) {
    return api.setUserAvatar(data).then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleClosePopup();
    });
  }

  // CARDS
  function handleAddCardSubmit(data) {
    return api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes?.some((id) => id === currentUser?._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? updatedCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  }

  // POPUPS
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddCard={handleAddCardSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile currentUser={currentUser} onUpdateUser={handleUpdateUser} />
    ),
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onUpdateAvatar={handleUpdateAvatar} />,
  };

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
              currentUser={currentUser}
              handleOpenPopup={handleOpenPopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
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