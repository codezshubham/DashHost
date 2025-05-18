import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ananya Sharma",
    title: "Freelance Web Developer",
    quote:
      "DashHost has completely transformed how I manage my clients. The reminders, intuitive UI, and fast support save me hours every month.",
    rating: 5,
  },
  {
    name: "Rajiv Mehta",
    title: "Founder, WebWave Agency",
    quote:
      "Managing dozens of domains was overwhelming. DashHost brings order, efficiency, and peace of mind. A must-have for agencies!",
    rating: 4,
  },
  {
    name: "Priya Iyer",
    title: "Tech Consultant",
    quote:
      "I was skeptical at first, but the trial changed my mind. It's clean, fast, and perfect for managing multiple clients' assets.",
    rating: 5,
  },
];

const renderStars = (count) => "⭐".repeat(count) + "☆".repeat(5 - count);

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="bg-white dark:bg-gray-950 py-20 px-6 md:px-20 transition duration-300"
      id="testimonials"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          What Our Users Are Saying
        </h2>

        <div className="relative">
          {/* Slide */}
          <div className="transition-all duration-500 ease-in-out">
            <div
              key={currentIndex}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-300 text-base italic mb-4">
                “{testimonials[currentIndex].quote}”
              </p>
              <div className="text-yellow-500 text-lg mb-2">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-indigo-600 dark:bg-indigo-400 scale-110"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
