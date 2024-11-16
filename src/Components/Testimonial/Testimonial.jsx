import "./TestimonialCSS.css"

function TestimonialSection() {
  const testimonials = [
    {
      name: "John Doe",
      location: "New York, USA",
      feedback: "This travel experience was absolutely amazing! The itinerary was well-organized, and the accommodations were fantastic. Highly recommended!",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Jane Smith",
      location: "Sydney, Australia",
      feedback: "The trip exceeded my expectations! The destinations were stunning, and the guides were incredibly knowledgeable and friendly.",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Carlos Rivera",
      location: "Madrid, Spain",
      feedback: "An unforgettable journey! Everything was seamless, from the bookings to the tours. I can't wait to book my next trip.",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center card"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
              <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
