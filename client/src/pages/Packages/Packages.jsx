
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import PackageCard from "../../components/Shared/PackageCard";
import { useGetAllPackage } from "../../hooks/usePackage";

const Packages = () => {
  // const packages = [
  //   {
  //     id: 1,
  //     title: "Beach Paradise",
  //     location: "Maldives",
  //     duration: "7 Days / 6 Nights",
  //     price: 1299,
  //     rating: 4.8,
  //     image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  //     description: "Experience the ultimate beach getaway with pristine sandy shores, crystal-clear waters, and luxurious accommodations.",
  //     included: ["Flights", "Hotel", "Breakfast", "Transfers"]
  //   },
  //   {
  //     id: 2,
  //     title: "Mountain Adventure",
  //     location: "Swiss Alps",
  //     duration: "10 Days / 9 Nights",
  //     price: 1899,
  //     rating: 4.9,
  //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  //     description: "Conquer the majestic Swiss Alps with guided treks, cable car rides, and stunning mountain views.",
  //     included: ["Guide", "Accommodation", "Meals", "Equipment"]
  //   },
  //   {
  //     id: 3,
  //     title: "City Explorer",
  //     location: "Paris, France",
  //     duration: "5 Days / 4 Nights",
  //     price: 899,
  //     rating: 4.7,
  //     image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  //     description: "Discover the romance of Paris with Eiffel Tower visits, Louvre museum tours, and Seine river cruises.",
  //     included: ["City Tour", "Hotel", "Breakfast", "Museum Pass"]
  //   },
  //   {
  //     id: 4,
  //     title: "Safari Expedition",
  //     location: "Kenya",
  //     duration: "8 Days / 7 Nights",
  //     price: 2499,
  //     rating: 4.9,
  //     image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
  //     description: "Witness the incredible wildlife of Africa with game drives, luxury camps, and breathtaking sunsets.",
  //     included: ["Safari Tours", "Accommodation", "All Meals", "Park Fees"]
  //   },
  //   {
  //     id: 5,
  //     title: "Cultural Heritage",
  //     location: "Japan",
  //     duration: "12 Days / 11 Nights",
  //     price: 2199,
  //     rating: 4.8,
  //     image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
  //     description: "Immerse yourself in Japanese culture with temple visits, tea ceremonies, and traditional cuisine.",
  //     included: ["Guide", "Hotels", "Some Meals", "Transport", "Transport"]
  //   },
  //   {
  //     id: 6,
  //     title: "Tropical Escape",
  //     location: "Bali, Indonesia",
  //     duration: "6 Days / 5 Nights",
  //     price: 749,
  //     rating: 4.6,
  //     image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  //     description: "Relax in paradise with rice terrace walks, spa treatments, and beautiful beach sunsets.",
  //     included: ["Hotel", "Breakfast", "Spa Session", "Transfers"]
  //   }
  // ];


  const { data: packages = [], isLoading: isPackageLoading } = useGetAllPackage();

  console.log("pakg", packages)

  if (isPackageLoading) return <p>loading.......</p>

  return (
    <section className='py-10 bg-white'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            All Tour Packages
          </h2>

        </motion.div>

        {/* packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {
            packages.map((item, index) => (
              // single card
              <PackageCard
                item={item}
                index={index}
              >
              </PackageCard>
            ))
          }
        </div>

      </Container>
    </section>
  )
}

export default Packages