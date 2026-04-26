import { CalendarCheck, CalendarCheck2, PencilRuler, ScanEye, Trash } from "lucide-react";
import { useDeletePackage, useGetAllPackage } from "../../../../hooks/usePackage";
import { confirmAction } from "../../../../utils/swal";
import ViewPackageDetails from "../../../../components/Modals/ViewPackageDetails";
import { useState } from "react";
import EditPackageModal from "../../../../components/Modals/EditPackageModal";

const AllPackages = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { data, isLoading } = useGetAllPackage();
    const { mutate: deletePackage } = useDeletePackage();

    if (isLoading) return <p>loading....</p>

    const packages = data.data || [];

    const handleDeletePackage = async (id) => {
        if (!id) return;
        try {
            const isConfirm = await confirmAction();
            if (!isConfirm) return;

            deletePackage(id);
        } catch (error) {
            console.error("Delete confirm error:", error);
        }
    };

    const handleViewPackage = (id) => {
        const pkg = packages.find((p) => p._id === id);
        if (!pkg) return;

        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };


    const handleEditPackage = (id) => {
        const pkg = packages.find((p) => p._id === id);
        if (!pkg) return;

        setSelectedPackage(pkg);
        setIsEditOpen(true)
    }

    console.log("from all package", packages)
    return (
        <div className="p-6">
            <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
                        <CalendarCheck2 className="text-primary w-6 h-6" />
                        All Packages
                    </h1>

                    <p className="text-text mt-1">
                        Manage all tour packages and their details from here.
                    </p>
                </div>

                {/* Right (Total Count) */}
                <div className="text-right">
                    <p className="text-sm text-text">Total Packages</p>
                    <h2 className="text-2xl font-bold text-primary">
                        {packages.length}
                    </h2>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm">

                    {/* Header */}
                    <thead className="bg-secondary/10 text-secondary">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Title</th>
                            <th className="px-5 py-3 font-semibold">Category</th>
                            <th className="px-5 py-3 font-semibold">Location</th>
                            <th className="px-5 py-3 font-semibold">Price</th>
                            <th className="px-5 py-3 font-semibold">Start</th>
                            <th className="px-5 py-3 font-semibold">End</th>
                            <th className="px-5 py-3 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="text-text">
                        {packages.map((pkg) => (
                            <tr
                                key={pkg._id}
                                className="border-t border-gray-100 hover:bg-primary/5 transition-colors"
                            >
                                <td className="px-5 py-4 font-medium text-secondary">
                                    {pkg.title}
                                </td>

                                <td className="px-5 py-4 capitalize">
                                    {pkg.category}
                                </td>

                                <td className="px-5 py-4">
                                    {pkg.location}
                                </td>

                                <td className="px-5 py-4 font-semibold text-primary">
                                    ${pkg.price}
                                </td>

                                <td className="px-5 py-4 text-sm">
                                    {pkg.startDate}
                                </td>

                                <td className="px-5 py-4 text-sm">
                                    {pkg.endDate}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex justify-end items-center gap-2">

                                        <button
                                            onClick={() => handleEditPackage(pkg._id)}
                                            className="text-primary bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition">
                                            <PencilRuler size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDeletePackage(pkg._id)}
                                            className="text-red-500 bg-red-100 p-2 rounded-lg hover:bg-red-200 transition">
                                            <Trash size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleViewPackage(pkg._id)}
                                            title="View details"
                                            className="text-secondary bg-secondary/10 p-2 rounded-lg hover:bg-secondary/20 transition"
                                        >
                                            <ScanEye size={18} />
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {isModalOpen && (
                <ViewPackageDetails
                    pkg={selectedPackage}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <EditPackageModal
                open={isEditOpen}
                setOpen={setIsEditOpen}
                pkg={selectedPackage}
            />

        </div>
    );
};

export default AllPackages;