
function Card({localImageAddress}) {
  return (
    <>
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img
            src={localImageAddress}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">
            Shoes!
            <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            <div className="badge badge-outline">Hotel</div>
            <div className="badge badge-outline">5 Star</div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Card