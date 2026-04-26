import { X } from "lucide-react";
import React from "react";

const ViewPackageDetails = ({ pkg, onClose }) => {
    if (!pkg) return null;

    return (
        <div className="fixed rounded-2xl inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-secondary">
                        {pkg.title}
                    </h2>
                    <button onClick={onClose} className="text-red-500 p-2 rounded bg-red-100 cursor-pointer">
                        <X size={18} />
                    </button>
                </div>

                {/* Image */}
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                />

                {/* Basic Info */}
                <div className="space-y-2 text-sm text-text">
                    <p><span className="font-semibold">Category:</span> {pkg.category}</p>
                    <p><span className="font-semibold">Location:</span> {pkg.location}</p>
                    <p><span className="font-semibold text-primary">Price:</span> ${pkg.price}</p>
                    <p><span className="font-semibold">Start:</span> {pkg.startDate}</p>
                    <p><span className="font-semibold">End:</span> {pkg.endDate}</p>
                </div>

                {/* Description */}
                <div className="mt-4">
                    <h3 className="font-semibold text-secondary mb-1">Description</h3>
                    <p className="text-sm text-text">{pkg.description}</p>
                </div>

                {/* Included */}
                <div className="mt-4">
                    <h3 className="font-semibold text-secondary mb-1">Included</h3>
                    <ul className="list-disc pl-5 text-sm text-text">
                        {pkg.included?.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Excluded */}
                <div className="mt-4">
                    <h3 className="font-semibold text-secondary mb-1">Excluded</h3>
                    <ul className="list-disc pl-5 text-sm text-text">
                        {pkg.excluded?.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Itinerary */}
                <div className="mt-4">
                    <h3 className="font-semibold text-secondary mb-1">Itinerary</h3>
                    <div className="space-y-2">
                        {pkg.itinerary?.map((day, i) => (
                            <div key={i} className="border p-3 rounded-lg">
                                <p className="font-semibold">
                                    Day {day.day}: {day.title}
                                </p>
                                <p className="text-sm text-text">{day.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewPackageDetails;