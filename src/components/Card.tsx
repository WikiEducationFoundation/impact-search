import "./Card.scss";

export default function Card({ title, description }: CardProps) {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  description: string;
}
