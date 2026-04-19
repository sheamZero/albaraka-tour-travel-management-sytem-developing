import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import PackageCard from "../../components/Shared/PackageCard";
import { useGetAllPackage } from "../../hooks/usePackage";

const Packages = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllPackage({page, limit:3});

  if (isLoading) return <p>loading.......</p>;

  const packages = data?.data || [];
  const totalPages = data?.totalPages || 1;

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
          {packages.map((item, index) => (
            <PackageCard
              key={item._id}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-10 gap-2">

          <button
            onClick={() => setPage(prev => prev - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </Container>
    </section>
  );
};

export default Packages;