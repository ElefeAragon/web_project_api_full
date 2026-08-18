import ImagePopup from "../ImagePopop/ImagePopup";

export default function Card({
  card,
  currentUser,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { name, link, likes, owner } = card;

  const isOwn = owner === currentUser?._id;
  const isLiked = likes?.some((id) => id === currentUser?._id);

  const imagePopup = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />

      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}