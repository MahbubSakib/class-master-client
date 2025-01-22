import partner1 from "../../assets/partner1.png";
import partner2 from "../../assets/partner2.jpeg";
import partner3 from "../../assets/partner3.png";
import partner4 from "../../assets/partner4.jpeg";

const Partners = () => {
    const partners = [
        {
            id: 1,
            logo: partner1, // Replace with the image path or URL
            name: 'MGI Group',
            description: 'Collaborating to deliver quality education worldwide.',
        },
        {
            id: 2,
            logo: partner2,
            name: 'AKIJ Group',
            description: 'Innovating solutions for a brighter future.',
        },
        {
            id: 3,
            logo: partner3,
            name: 'Walton',
            description: 'Supporting lifelong learning and career success.',
        },
        {
            id: 4,
            logo: partner4,
            name: 'ACI',
            description: 'Pioneering research and development initiatives.',
        },
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-primary mb-6">Our Partners & Collaborators</h2>
                <p className="text-lg text-text mb-10">
                    We are honored to partner with organizations that share our vision of empowering education and innovation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-20 w-20 object-contain mb-4"
                            />
                            <h3 className="font-semibold text-xl">{partner.name}</h3>
                            <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
