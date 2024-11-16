import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer"
import HotelCards from "../../Components/Hotel Cards/HotelCards";
import GridLayout from "../../Components/GridLayout/GridLayout";
import Testimonial from "../../Components/Testimonial/Testimonial"
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HotelCards />
            <GridLayout />
            <Testimonial />
            <Footer></Footer>
        </div>
    );
};

export default Home;