export default function ImagePopup({ card }) {
  return (
    <>
      <img src={card.link} alt={card.name} className="popup__image" />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}
