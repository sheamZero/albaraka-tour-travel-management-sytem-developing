import Container from "../../components/Shared/Container";
import Swal from "sweetalert2";
import { Clock, Star } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import Itinerary from "../../components/PackageDetails/Itinerary/Itinerary";
import IncludedExcluded from "../../components/PackageDetails/IncludedExcluded/IncludedExcluded";
import CustomerReviews from "../../components/PackageDetails/CustomerReviews/CustomerReviews";
import { useGetSinglePackage } from "../../hooks/usePackage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getDuration from "../../utils/getTourDuration";
import { useGetReviewsByPackageId } from "../../hooks/useReview";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import BreadCrumb from "../../components/PackageDetails/BreadCrumb/BreadCrumb";
import { usePackageBooking } from "../../hooks/useBooking";

const PackageDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: singlePackage = [], isLoading } = useGetSinglePackage(id);
  const { data: reviews = [], isLoading: reviewLoading } = useGetReviewsByPackageId(id);
  const { mutate: packageBooking, isPending } = usePackageBooking();
  const navigate = useNavigate();
  const location = useLocation();

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const duration = getDuration(singlePackage.startDate, singlePackage.endDate);

  const handleBookingPackage = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        title: "You need to be logged in!",
        text: "Please sign in to book this package.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#E2852E",
        cancelButtonColor: "#ABE0F0",
        padding: "2rem",
        width: 400,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location }, replace: true });
        }
      });
      return;
    }

    const { category, endDate, startDate, image, included, excluded, itinerary, price, location: packageLoaction, _id, title } = singlePackage;

    const bookingData = {
      packageId: _id,
      category,
      startDate,
      endDate,
      image,
      included,
      excluded,
      itinerary,
      price: price,
      totalPrice: price * numberOfPeople,
      numberOfPeople: numberOfPeople,
      location: packageLoaction,
      title,
      userEmail: user.email,
      userName: user.displayName,
      bookingDate: new Date()
    };

    console.log("booking data", bookingData);


    Swal.fire({
      title: "Do you want to Book this package?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!"
    })
      .then((result) => {
        if (result.isConfirmed) {

          packageBooking(bookingData, {
            onSuccess: (data) => {
              if (data.insertedId) {

                Swal.fire({
                  title: "Success!",
                  text: "Successfully booked a package!",
                  icon: "success",
                  confirmButtonColor: "#facc15",
                  padding: "1.5rem",
                  width: 400,
                })
                  .then(() => {
                    navigate("/dashboard/user/my-bookings");
                  });
              }
            },
            onError: (error) => {
              Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#facc15",
                padding: "1.5rem",
                width: 400,
              });
            }
          });
        }
      });




  };

  if (isLoading || reviewLoading) return <p>loading......</p>;

  return (
    <section className="py-6">
      <Container>

        {/* Breadcrumb */}
        <BreadCrumb
          title={singlePackage.title}
        />

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
                <div className="p-5 border-b bg-linear-to-r from-primary/5 to-transparent">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <h2 className="text-3xl font-bold text-primary">
                    ${singlePackage.price}
                  </h2>
                  <p className="text-xs text-gray-500">per person</p>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <form onSubmit={handleBookingPackage}>
                    {/* Number of People Input */}
                    <div className="space-y-2">
                      <label htmlFor="numberOfPeople" className="text-sm font-medium text-gray-700">
                        Number of People
                      </label>
                      <input
                        type="number"
                        id="numberOfPeople"
                        min="1"
                        max="20"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                      <p className="text-sm font-semibold text-primary my-1">
                        Total: ${(singlePackage.price * numberOfPeople).toFixed(2)}
                      </p>
                    </div>

                    {/* Trust points */}
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>✔ No payment today</p>
                      <p>✔ Free cancellation</p>
                      <p>✔ Instant confirmation</p>
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary text-white mt-1 py-3 rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Booking..." : "Book Now"}
                    </button>
                  </form>

                  {/* Secondary note */}
                  <p className="text-xs text-center text-gray-400">
                    You won't be charged yet
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* MOBILE STICKY BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <form onSubmit={handleBookingPackage} className="bg-white border-t shadow-lg px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Price Info */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="text-xl font-bold text-primary">
                ${(singlePackage.price * numberOfPeople).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">for {numberOfPeople} person(s)</p>
            </div>

            {/* People Input with Stepper Buttons */}
            <div className="flex items-center gap-1">
              {/* Minus Button */}
              <button
                type="button"
                disabled={numberOfPeople == "1"}
                onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <span className="text-lg font-semibold">-</span>
              </button>

              {/* Input Field */}
              <div className="w-14">
                <input
                  type="number"
                  id="numberOfPeople"
                  min="1"
                  max="20"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-1 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Plus Button */}
              <button
                type="button"
                onClick={() => setNumberOfPeople(Math.min(20, numberOfPeople + 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </div>

            {/* Book Button */}
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white px-5 py-2 rounded-lg font-semibold whitespace-nowrap hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
            >
              {isPending ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PackageDetails;