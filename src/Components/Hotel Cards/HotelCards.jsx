import Card from '../Card/Card.jsx';
import Card1Image from "../../assets/Card1Image.jpg";
import Card2Image from "../../assets/Card2Image.jpg";
import Card3Image from "../../assets/Card3Image.jpg";
import Card4Image from "../../assets/Card4Image.jpg";

function HotelCards() {
  return (
    <>
      <div className="flex space-x-10 p-10">
        <Card
          localImageAddress={Card1Image}
          title="Mountain View Resort"
          description="Nestled in the lush valleys of Manali, offering stunning mountain views."
          tags={["Mountain", "Luxury"]}
          badgeText="NEW"
        />
        <Card
          localImageAddress={Card2Image}
          title="Seaside Haven"
          description="A serene retreat by the beach in Goa, perfect for a tranquil getaway."
          tags={["Beach", "5 Star"]}
          badgeText="Popular"
        />
        <Card
          localImageAddress={Card3Image}
          title="Urban Retreat"
          description="Experience modern comfort and luxury in the heart of Bengaluru."
          tags={["Urban", "Comfort"]}
          badgeText="Exclusive"
        />
        <Card
          localImageAddress={Card4Image}
          title="Heritage Palace"
          description="Step into royal luxury at this historic palace in Jaipur."
          tags={["Heritage", "Royal"]}
          badgeText="Top Pick"
        />
      </div>
    </>
  );
}

export default HotelCards;
