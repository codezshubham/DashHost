const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16 md:px-20">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          About DashHost
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-300">
          DashHost is your all-in-one client, domain, and hosting management platform designed to streamline your workflow, keep your data secure, and ensure you never miss a renewal.
        </p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
            At DashHost, our mission is to empower freelancers, agencies, and IT professionals with simple yet powerful tools to manage clients’ digital assets effortlessly. We believe managing domains and hosting should be secure, intuitive, and reliable — so you can focus on growing your business.
          </p>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 max-w-3xl">
            <li><strong>Security First:</strong> We protect your data with industry-leading encryption and role-based access controls.</li>
            <li><strong>User-Centric Design:</strong> Intuitive interfaces designed to save you time and frustration.</li>
            <li><strong>Reliability:</strong> Timely renewal reminders to keep your clients’ services active and worry-free.</li>
            <li><strong>Transparency:</strong> Clear pricing, no hidden fees, and honest communication.</li>
            <li><strong>Continuous Improvement:</strong> We listen to user feedback to keep innovating and delivering value.</li>
          </ul>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <h3 className="text-xl font-semibold mb-1">Shubham Kumar</h3>
              <p className="text-indigo-600 font-medium mb-2">Founder & Developer</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Passionate about building smart, user-friendly tools to help professionals thrive in a digital world.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Ananya Singh</h3>
              <p className="text-indigo-600 font-medium mb-2">Product Manager</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Dedicated to delivering seamless user experiences and ensuring DashHost meets your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Rohit Verma</h3>
              <p className="text-indigo-600 font-medium mb-2">Support Lead</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Here to help you anytime — ensuring your DashHost experience is smooth and hassle-free.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
