
const OurTeam = () => {

    const team = [
        { name: "Sarah Johnson", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Michael Chen", role: "Head of Operations", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Emily Rodriguez", role: "Travel Specialist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "David Kim", role: "Customer Experience", image: "https://randomuser.me/api/portraits/men/75.jpg" }
    ]


    return (
        <section>
            <div className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-secondary mb-2">Meet Our Team</h2>
                    <p className="text-text/60">Passionate experts dedicated to your travel needs</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-center group">
                            <div className="relative overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-secondary text-lg">{member.name}</h3>
                                <p className="text-primary text-sm">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;