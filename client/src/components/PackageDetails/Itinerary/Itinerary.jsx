

const Itinerary = ({ itinerary = [] }) => {
    // console.log(itinerary)
    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Itinerary</h2>

            <div className="space-y-4">
                {
                    itinerary.map((item) => (
                        <div key={item.day} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="shrink-0 w-16 h-16 p-2 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                                Day {item.day}
                            </div>

                            <div>
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-text/70 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Itinerary