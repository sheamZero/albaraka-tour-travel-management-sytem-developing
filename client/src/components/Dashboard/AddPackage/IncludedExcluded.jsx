import { useFieldArray } from "react-hook-form";
import { CheckCircle, XCircle, Plus, Trash2 } from "lucide-react";

const IncludedExcluded = ({ register, control, errors }) => {
    const {
        fields: includedFields,
        append: appendIncluded,
        remove: removeIncluded,
    } = useFieldArray({
        control,
        name: "included",
        defaultValues: [{ value: "" }], // Start with one empty item
    });

    const {
        fields: excludedFields,
        append: appendExcluded,
        remove: removeExcluded,
    } = useFieldArray({
        control,
        name: "excluded",
        defaultValues: [{ value: "" }], // Start with one empty item
    });

    const addIncludedItem = () => {
        appendIncluded({ value: "" });
    };

    const addExcludedItem = () => {
        appendExcluded({ value: "" });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Included */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-3 bg-green-50 border-b border-green-200">
                    <h3 className="font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        What's Included
                    </h3>
                </div>
                <div className="p-4">
                    {
                        includedFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2">
                                <input
                                    {...register(`included.${index}.value`, {
                                        required: "This field is required",
                                    })}
                                    placeholder={`Included item ${index + 1}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {
                                    index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeIncluded(index)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                    {
                        errors?.included?.map?.((error, index) => (
                            error?.value && (
                                <p key={index} className="text-red-500 text-sm mt-1">
                                    {error.value.message}
                                </p>
                            )
                        ))
                    }
                    <button
                        type="button"
                        onClick={addIncludedItem}
                        className="mt-2 text-primary hover:text-primary-dark flex items-center gap-1 text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Excluded */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-3 bg-red-50 border-b border-red-200">
                    <h3 className="font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        What's Excluded
                    </h3>
                </div>
                <div className="p-4">
                    {excludedFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`excluded.${index}.value`, {
                                    required: "This field is required",
                                })}
                                placeholder={`Excluded item ${index + 1}`}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeExcluded(index)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    {errors?.excluded?.map?.((error, index) => (
                        error?.value && (
                            <p key={index} className="text-red-500 text-sm mt-1">
                                {error.value.message}
                            </p>
                        )
                    ))}
                    <button
                        type="button"
                        onClick={addExcludedItem}
                        className="mt-2 text-primary hover:text-primary-dark flex items-center gap-1 text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncludedExcluded;