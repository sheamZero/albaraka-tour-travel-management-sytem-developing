import Hero from "../../components/Home/Hero/Hero";
import Packages from "../../components/Home/Packages/Packages";
import PopularCategories from "../../components/Home/PopularCategories/PopularCategories";
import PopularDestinations from "../../components/Home/PopularDestinations/PopularDestinations";
import ReadyToBookTour from "../../components/Home/ReadyToBookTour/ReadyToBookTour";
import SearchTour from "../../components/Home/SearchTour/SearchTour";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import WhyChooseUs from "../../components/Home/WhyChooseUs/WhyChooseUs";


const Home = () => {
    return (
        <div>
            <Hero />
            {/* <SearchTour /> */}
            {/* <PopularDestinations /> */}
            <PopularCategories />
            <Packages />

            <ReadyToBookTour />

            <WhyChooseUs />
            <Testimonials />
        </div>
    );
};

export default Home;