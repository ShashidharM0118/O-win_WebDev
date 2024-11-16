function Card({ localImageAddress, title, description, tags, badgeText }) {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={localImageAddress}
            alt={title}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            {badgeText && <div className="badge badge-secondary">{badgeText}</div>}
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            {tags.map((tag, index) => (
              <div key={index} className="badge badge-outline">{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
