export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;

  const imagePopup = {
    title: null, // 👈 IMPORTANTE (sin título)
    children: <img src={link} alt={name} className="popup__image" />,
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
        />
      </div>
    </li>
  );
}
