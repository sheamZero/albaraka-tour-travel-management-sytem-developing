import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../components/Shared/Container";
import { useEffect, useState } from "react";
import PackageCard from "../../components/Shared/PackageCard";
import { Mountain, Umbrella, Landmark, PawPrint } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { usePackagesByCategory } from "../../hooks/usePackage";

const Categories = () => {
         const [searchParams] = useSearchParams();
    const categoryFromURL = searchParams.get("category") || "beach";

    const [activeTab, setActiveTab] = useState(categoryFromURL);
    // const [activeTab, setActiveTab] = useState("beach");

    const { data: packages = [], isLoading } = usePackagesByCategory(activeTab);

    const categories = [
        { id: "beach", name: "Beach", icon: Umbrella },
        { id: "adventure", name: "Adventure", icon: Mountain },
        { id: "cultural", name: "Cultural", icon: Landmark },
        { id: "wildlife", name: "Wildlife", icon: PawPrint }
    ];


    useEffect(() => {
        setActiveTab(categoryFromURL);
    }, [categoryFromURL]);

    return (
        <section className="min-h-screen py-12 bg-gray-50">
            <Container>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                >


                    <div className="flex justify-center mb-10 px-2">
                        <TabsList className="flex gap-2 bg-gray-100 pl-20 md:p-3 rounded-full overflow-x-auto w-full max-w-full md:w-auto">

                            {
                                categories.map((cat) => {
                                    const Icon = cat.icon;

                                    return (
                                        <TabsTrigger
                                            key={cat.id}
                                            value={cat.id}
                                            className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                                        >
                                            <Icon size={16} />
                                            {cat.name}
                                        </TabsTrigger>
                                    );
                                })
                            }

                        </TabsList>
                    </div>

                    {/* Content */}
                    <TabsContent value={activeTab}>

                        {isLoading ? (
                            <p className="text-center">Loading...</p>
                        ) : packages.length === 0 ? (
                            <p className="text-center">No packages found</p>
                        ) : (
                            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {packages.map((item, index) => (
                                    <PackageCard key={item._id} item={item} index={index} />
                                ))}
                            </div>
                        )}

                    </TabsContent>

                </Tabs>

            </Container>
        </section>
    );
};

export default Categories;