import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePackage } from "../../hooks/usePackage";

const EditPackageModal = ({ open, setOpen, pkg }) => {
    const { mutate: updatePkg, isPending } = useUpdatePackage();
    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm();

    const {
        fields: includedFields,
        append: appendIncluded,
        remove: removeIncluded,
    } = useFieldArray({
        control,
        name: "included",
    });

    const {
        fields: excludedFields,
        append: appendExcluded,
        remove: removeExcluded,
    } = useFieldArray({
        control,
        name: "excluded",
    });

    const {
        fields: itineraryFields,
        append: appendItinerary,
        remove: removeItinerary,
    } = useFieldArray({
        control,
        name: "itinerary",
    });

    useEffect(() => {
        if (pkg) {
            reset({
                title: pkg.title || "",
                category: pkg.category || "",
                location: pkg.location || "",
                price: pkg.price || "",
                startDate: pkg.startDate || "",
                endDate: pkg.endDate || "",
                description: pkg.description || "",
                included: pkg.included || [],
                excluded: pkg.excluded || [],
                itinerary: pkg.itinerary || [],
            });
        }
    }, [pkg, reset]);

    const onSubmit = (data) => {
        console.log("UPDATED DATA:", data);

        updatePkg({ id: pkg._id, data })


        setOpen(false);
    };

    if (!pkg) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-6">

                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-secondary">
                        Edit Package
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <img
                            src={pkg.image}
                            className="w-full h-52 object-cover rounded-xl"
                        />

                        <div>
                            <label className="text-sm font-semibold text-secondary">Title</label>
                            <Input {...register("title")} />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-secondary">Category</label>
                            <Input {...register("category")} />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-secondary">Location</label>
                            <Input {...register("location")} />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-secondary">Price</label>
                            <Input type="number" {...register("price")} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-semibold text-secondary">Start Date</label>
                                <Input type="date" {...register("startDate")} />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-secondary">End Date</label>
                                <Input type="date" {...register("endDate")} />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-secondary">Description</label>
                            <textarea
                                {...register("description")}
                                rows={5}
                                className="w-full border rounded-xl p-3 text-sm"
                            />
                        </div>

                    </div>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-secondary mb-2">Included</h3>

                            {includedFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 mb-2">
                                    <Input {...register(`included.${index}`)} />
                                    <Button type="button" onClick={() => removeIncluded(index)}>X</Button>
                                </div>
                            ))}

                            <Button type="button" onClick={() => appendIncluded("")}>
                                + Add Included
                            </Button>
                        </div>

                        <div>
                            <h3 className="font-semibold text-secondary mb-2">Excluded</h3>

                            {excludedFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 mb-2">
                                    <Input {...register(`excluded.${index}`)} />
                                    <Button type="button" onClick={() => removeExcluded(index)}>X</Button>
                                </div>
                            ))}

                            <Button type="button" onClick={() => appendExcluded("")}>
                                + Add Excluded
                            </Button>
                        </div>

                        <div>
                            <h3 className="font-semibold text-secondary mb-2">Itinerary</h3>

                            {itineraryFields.map((field, index) => (
                                <div key={field.id} className="border p-3 rounded-xl mb-3 space-y-2">

                                    <div className="grid grid-cols-2 gap-2">
                                        <Input placeholder="Day" {...register(`itinerary.${index}.day`)} />
                                        <Input placeholder="Title" {...register(`itinerary.${index}.title`)} />
                                    </div>

                                    <textarea
                                        placeholder="Description"
                                        {...register(`itinerary.${index}.description`)}
                                        className="w-full border rounded-lg p-2 text-sm"
                                    />

                                    <Button type="button" onClick={() => removeItinerary(index)}>
                                        Remove
                                    </Button>

                                </div>
                            ))}

                            <Button
                                type="button"
                                onClick={() =>
                                    appendItinerary({ day: "", title: "", description: "" })
                                }
                            >
                                + Add Day
                            </Button>
                        </div>

                    </div>

                    <div className="col-span-2 flex justify-end gap-3 border-t mt-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Package"}
                        </Button>
                    </div>

                </form>

            </DialogContent>
        </Dialog>
    );
};

export default EditPackageModal;