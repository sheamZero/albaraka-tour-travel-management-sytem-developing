// import { Link, useLocation, useParams } from "react-router-dom"
import Container from "../../components/Shared/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {  Clock, Star } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import Itinerary from "../../components/PackageDetails/Itinerary/Itinerary";
import IncludedExcluded from "../../components/PackageDetails/IncludedExcluded/IncludedExcluded";
import CustomerReviews from "../../components/PackageDetails/CustomerReviews/CustomerReviews";



const PackageDetails = () => {

  // load data from the database
  const singlePackage = {
    id: 1,
    title: "Beach Paradise",
    location: "Maldives",
    duration: "7 Days / 6 Nights",
    price: 1299,
    rating: 4.8,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",

    // gallery: [
    //   "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    //   "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    //   "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
    // ],

    description: "Nestled in the heart of the Indian Ocean, this beach paradise offers an unforgettable experience for travelers seeking both relaxation and adventure. The resort features overwater bungalows, private beaches, and exceptional dining options. Enjoy snorkeling in vibrant coral reefs, sunset cruises, and rejuvenating spa treatments. With warm tropical weather year-round and friendly local hospitality, this destination promises memories that will last a lifetime. Experience the ultimate beach getaway with pristine sandy shores, crystal-clear waters, and luxurious accommodations. This paradise destination offers the perfect blend of relaxation and adventure, with world-class amenities and breathtaking views that will leave you speechless.",

    included: ["Round-trip flights", "5-star hotel accommodation", "Daily breakfast & dinner", "Airport transfers", "Welcome drink on arrival", "24/7 concierge service"],
    excluded: ["Travel insurance", "Visa fees", "Optional tours", "Personal expenses", "Alcoholic beverages"],

    itinerary: [
      { day: 1, title: "Arrival & Welcome", description: "Arrive at the airport, transfer to hotel, welcome dinner" },
      { day: 2, title: "Beach Day", description: "Relax on the pristine beaches, water sports activities" },
      { day: 3, title: "Island Exploration", description: "Guided tour of local islands, cultural experience" },
      { day: 4, title: "Adventure Sports", description: "Scuba diving, jet skiing, parasailing" },
      { day: 5, title: "Sunset Cruise", description: "Luxury boat cruise with dinner" },
      { day: 6, title: "Spa & Relaxation", description: "Traditional spa treatments, yoga session" },
      { day: 7, title: "Departure", description: "Breakfast and airport transfer" }
    ],

    availableDates: ["2024-12-15", "2024-12-20", "2025-01-10", "2025-01-25"],

    reviews: [
      { id: 1, user: "John D.", rating: 5, comment: "Amazing experience! Highly recommend.", date: "2024-10-15" },
      { id: 2, user: "Sarah M.", rating: 4.5, comment: "Beautiful location, great service.", date: "2024-10-10" }
    ]
  };



  return (
    <section className="py-6">
      <Container>
        {/* breadcrumb list */}
        <div className="pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-primary" href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-primary" href="/packages">Packages</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">{singlePackage.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* images */}
        <div className="w-full h-100 md:h-150">
          <img className="w-full h-full rounded-2xl object-cover opacity-95 hover:opacity-100 transition-opacity" src={singlePackage.image} alt="" />
        </div>



        {/* details  */}
        <div>

          {/* title, rating, reviews */}
          <div className="flex flex-wrap justify-between items-start mt-5">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">{singlePackage.title}</h1>
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{singlePackage.rating}</span>
              <span className="text-gray-500">({singlePackage.reviewCount} reviews)</span>
            </div>
          </div>

          {/* location, duration */}
          <div className="flex flex-wrap items-center gap-10 text-gray-600 my-4">
            <div className="flex items-center gap-2">
              <FaLocationArrow />
              <span>{singlePackage.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{singlePackage.duration}</span>
            </div>
          </div>

          {/* description */}
          <div className="">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-text/80 leading-relaxed">{singlePackage.description}</p>
          </div>

          {/* itinerary */}
          <Itinerary
            itinerary={singlePackage.itinerary}
          />
          {/* inculded and excluded */}
          <IncludedExcluded
            included={singlePackage.included}
            excluded={singlePackage.excluded}
          />

          {/* Reviews Section */}
          {/* <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

            <div className="space-y-4">
              {
                singlePackage.reviews?.map((review) => (
                  <div key={review.id} className="p-4 border border-primary rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <Rating initialRating={review.rating}></Rating>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>

                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))
              }
            </div>
          </div> */}
          <CustomerReviews
            reviews={singlePackage.reviews}
          />




        </div>

      </Container>
    </section>
  )
}

export default PackageDetails