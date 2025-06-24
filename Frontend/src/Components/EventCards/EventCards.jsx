import './CardStyles.css';

const EventCards = ({ card, onClick }) => {
    return (
        <div className="card rounded-md">
            <div
                className="card-background"
                style={{ backgroundImage: `url(${card.image})` }}
            ></div>
            <div className="content">
                <h2 className="title">{card.title}</h2>
                <p className="copy">{card.description}</p>
                <button onClick={() => onClick(card)} className="btn">Know More</button>
            </div>
        </div>
    );
};

export default EventCards;
