import image from '../../Asset/Trialsec.jpg';

const TrialSection = () => {
  return (
    <section className="bg-indigo-600 dark:bg-indigo-800 py-16 px-6 md:px-20 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-white">
            Try DashHost Free for 14 Days
          </h2>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 dark:text-indigo-200">
            Experience powerful client and domain management tools—no credit card required.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-indigo-600 dark:text-indigo-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300"
          >
            Start Free Trial
          </a>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={image}
            alt="Trial illustration"
            className="w-full max-w-md rounded-xl shadow-lg dark:shadow-none"
          />
        </div>
      </div>
    </section>
  );
};

export default TrialSection;
