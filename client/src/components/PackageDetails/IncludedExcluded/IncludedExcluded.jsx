import { Check, X } from "lucide-react"



const IncludedExcluded = ({ included = [], excluded = [] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Check />
                    Included
                </h3>
                <ul className="space-y-2">
                    {
                        included?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-text/80">
                                <span className="text-green-600 mt-1"><Check size={16} /></span>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="p-4 bg-red-50 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <X size={20} />
                    Excluded
                </h3>
                <ul className="space-y-2">
                    {
                        excluded?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-red-600 mt-1"> <X size={16} /></span>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default IncludedExcluded