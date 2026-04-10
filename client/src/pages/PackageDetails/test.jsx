import { Link, useLocation, useParams } from "react-router-dom"
import Container from "../../components/Shared/Container";
import { useState, useEffect } from "react";

const PackageDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [singlePackage, setSinglePackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Try to get data from location state first (if coming from list page)
  const locationState = location.state?.packageData;

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        
        // If we have data from location state, use it immediately
        if (locationState && locationState.id === parseInt(id)) {
          setSinglePackage(locationState);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API/database
        // const response = await fetch(`/api/packages/${id}`);
        // if (!response.ok) throw new Error('Package not found');
        // const data = await response.json();
        
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - replace with actual API call
        const mockPackage = {
          id: parseInt(id),
          title: "Beach Paradise",
          location: "Maldives",
          duration: "7 Days / 6 Nights",
          price: 1299,
          rating: 4.8,
          reviewCount: 128,
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
          ],
          description: "Experience the ultimate beach getaway with pristine sandy shores, crystal-clear waters, and luxurious accommodations. This paradise destination offers the perfect blend of relaxation and adventure, with world-class amenities and breathtaking views that will leave you speechless.",
          longDescription: "Nestled in the heart of the Indian Ocean, this beach paradise offers an unforgettable experience for travelers seeking both relaxation and adventure. The resort features overwater bungalows, private beaches, and exceptional dining options. Enjoy snorkeling in vibrant coral reefs, sunset cruises, and rejuvenating spa treatments. With warm tropical weather year-round and friendly local hospitality, this destination promises memories that will last a lifetime.",
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
        
        setSinglePackage(mockPackage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id, locationState]);

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-10">
        <Container>
          <div className="animate-pulse">
            <div className="w-full h-[400px] md:h-[600px] bg-gray-200 rounded-2xl"></div>
            <div className="mt-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Package</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              to="/packages" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              ← Back to Packages
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (!singlePackage) return null;

  return (
    <section className="py-10">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/packages" className="hover:text-primary">Packages</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{singlePackage.title}</span>
        </div>

        {/* Hero Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 md:row-span-2">
            <img 
              className="w-full h-[300px] md:h-[500px] rounded-xl object-cover cursor-pointer hover:opacity-95 transition-opacity" 
              src={singlePackage.image} 
              alt={singlePackage.title}
            />
          </div>
          {
          singlePackage.gallery?.slice(1, 4).map((img, idx) => (
            <div key={idx} className="hidden md:block">
              <img 
                className="w-full h-[242px] rounded-xl object-cover cursor-pointer hover:opacity-95 transition-opacity" 
                src={img} 
                alt={`${singlePackage.title} view ${idx + 2}`}
              />
            </div>
          ))
          }
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Package Info */}
          <div className="lg:col-span-2">
            {/* Title & Basic Info */}
            <div className="mb-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                  {singlePackage.title}
                </h1>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{singlePackage.rating}</span>
                  <span className="text-gray-500">({singlePackage.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{singlePackage.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{singlePackage.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{singlePackage.longDescription || singlePackage.description}</p>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {singlePackage.itinerary?.map((item) => (
                  <div key={item.day} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                      Day {item.day}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Included
                </h3>
                <ul className="space-y-2">
                  {singlePackage.included?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Excluded
                </h3>
                <ul className="space-y-2">
                  {singlePackage.excluded?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-600 mt-1">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {singlePackage.reviews?.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">
                  ${singlePackage.price}
                  <span className="text-base font-normal text-gray-500">/person</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Includes taxes & fees</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    {singlePackage.availableDates?.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    defaultValue="1"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3">
                Book Now
              </button>
              
              <button className="w-full border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                Send Inquiry
              </button>

              <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
                <p className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-12a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm10-10a4 4 0 00-8 0v4a4 4 0 008 0v-4z" />
                  </svg>
                  Secure Booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PackageDetails;