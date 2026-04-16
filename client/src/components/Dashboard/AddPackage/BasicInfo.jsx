import { useEffect, useState } from "react";
import { Clock, DollarSign, Globe, MapPin, Image as ImageIcon, Trash2 } from "lucide-react";

const BasicInfo = ({ register, errors, watch, setValue }) => {

    const [imagePreview, setImagePreview] = useState(null);

    const imageFile = watch("image");

    console.log("image file", imageFile)

    // Generate preview when file changes
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }, [imageFile]);

    // Remove image
    const handleRemoveImage = () => {
        setImagePreview(null);
        setValue("image", null);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-linear-to-r from-primary/5 to-transparent border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Basic Information
                    </h3>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Title */}
                        <div >
                            <label className="block text-base font-medium text-text mb-1">
                                Package Title *
                            </label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                placeholder="e.g., Tropical Paradise Escape"
                                className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-base font-medium text-text mb-1">
                                Location *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    {...register("location", { required: "Location is required" })}
                                    placeholder="e.g., Maldives, Bali, Thailand"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            {errors.location && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-base font-medium text-text mb-1">
                                Duration
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    {...register("duration")}
                                    placeholder="e.g., 7 Days / 6 Nights"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-base font-medium text-text mb-1">
                                Price (USD) *
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="number"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 1,
                                            message: "Price must be greater than 0"
                                        }
                                    })}
                                    placeholder="e.g., 1299"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        {/* image upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Package Image *
                            </label>

                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors">
                                <div className="space-y-1 text-center">

                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-40 w-auto rounded-lg object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />

                                            <div className="flex text-sm text-gray-600">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                                    <span>Upload an image</span>

                                                    <input
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        {...register("image", {
                                                            required: "Image is required"
                                                        })}
                                                    />
                                                </label>

                                                <p className="pl-1">or drag and drop</p>
                                            </div>

                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-text mb-1">
                                Description *
                            </label>

                            <textarea
                                {...register("description", {
                                    required: "Description is required"
                                })}
                                rows="5"
                                placeholder="Describe the package details, highlights, and what makes it special..."
                                className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BasicInfo;