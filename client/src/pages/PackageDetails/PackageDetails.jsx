import Container from "../../components/Shared/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock, Star } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import Itinerary from "../../components/PackageDetails/Itinerary/Itinerary";
import IncludedExcluded from "../../components/PackageDetails/IncludedExcluded/IncludedExcluded";
import CustomerReviews from "../../components/PackageDetails/CustomerReviews/CustomerReviews";
import { useGetSinglePackage } from "../../hooks/usePackage";
import { useParams } from "react-router-dom";
import getDuration from "../../utils/getTourDuration";
import { useGetReviewsByPackageId } from "../../hooks/useReview";

const PackageDetails = () => {
  const { id } = useParams();
  const { data: singlePackage = [], isLoading } = useGetSinglePackage(id);
  const { data: reviews = [], isLoading: reviewLoading } = useGetReviewsByPackageId(id);

  const duration = getDuration(
    singlePackage.startDate,
    singlePackage.endDate
  );

  if (isLoading || reviewLoading) return <p>loading......</p>;

  return (
    <section className="py-6">
      <Container>

        {/* Breadcrumb */}
        <div className="pb-4 relative overflow-hidden">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/packages">Packages</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  {singlePackage.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Image */}
        <div className="w-full h-100 md:h-150">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src={singlePackage.image}
            alt=""
          />
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            {/* title + rating */}
            <div className="flex flex-wrap justify-between items-start mt-5">
              <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                {singlePackage.title}
              </h1>

              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">
                  {singlePackage.rating}
                </span>
                <span className="text-gray-500">
                  ({singlePackage.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* location + duration */}
            <div className="flex flex-wrap items-center gap-10 text-gray-600 my-4">
              <div className="flex items-center gap-2">
                <FaLocationArrow />
                <span>{singlePackage.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{duration}</span>
              </div>
            </div>

            {/* overview */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-text/80 leading-relaxed">
                {singlePackage.description}
              </p>
            </div>

            {/* itinerary */}
            <Itinerary itinerary={singlePackage.itinerary} />

            {/* included excluded */}
            <IncludedExcluded
              included={singlePackage.included}
              excluded={singlePackage.excluded}
            />

            {/* reviews */}
            <CustomerReviews reviews={reviews} />
          </div>

          {/* RIGHT SIDEBAR (BOOKING CARD) */}
        <div className="hidden lg:block">
  <div className="sticky top-24 z-40">
    <div className="border rounded-2xl bg-white shadow-xl overflow-hidden">

      {/* Price Header */}
      <div className="p-5 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <p className="text-sm text-gray-500">Starting from</p>
        <h2 className="text-3xl font-bold text-primary">
          ${singlePackage.price}
        </h2>
        <p className="text-xs text-gray-500">per person</p>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        {/* Trust points */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>✔ No payment today</p>
          <p>✔ Free cancellation</p>
          <p>✔ Instant confirmation</p>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition">
          Book Now
        </button>

        {/* Secondary note */}
        <p className="text-xs text-center text-gray-400">
          You won’t be charged yet
        </p>
      </div>

    </div>
  </div>
</div>

        </div>
      </Container>
      {/* MOBILE STICKY BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white border-t shadow-lg px-4 py-3 flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-lg font-bold text-primary">
              ${singlePackage.price}
            </p>
          </div>

          <button className="bg-primary text-white px-5 py-2 rounded-lg font-semibold">
            Book Now
          </button>

        </div>
      </div>
    </section>
  );
};

export default PackageDetails;