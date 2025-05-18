import {
  ShieldCheck,
  Globe,
  AlarmClock,
  Users,
  Pencil,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Client Management",
    icon: <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    description:
      "Organize and manage all your clients' domain and hosting data from one secure dashboard.",
  },
  {
    title: "Domain & Hosting Tracking",
    icon: <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    description:
      "Track domain names, hosting services, start dates, expiry dates, and more.",
  },
  {
    title: "Renewal Reminders",
    icon: (
      <AlarmClock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
    ),
    description:
      "Get timely alerts before renewals to avoid downtime or expired services.",
  },
  {
    title: "Secure & Centralized",
    icon: (
      <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
    ),
    description:
      "All your client data is stored securely with role-based access control.",
  },
  {
    title: "Easy Editing & Updates",
    icon: <Pencil className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    description:
      "Quickly update domains, hostings, and client details with an intuitive interface.",
  },
  {
    title: "Analytics (Coming Soon)",
    icon: <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    description:
      "Visualize renewals, client growth, and service usage trends at a glance.",
  },
];

const FeatureSection = () => {
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-20"
      id="features"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Powerful Features to Manage Your Clients
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          DashHost helps you stay on top of domains, hosting, and renewals—
          securely and efficiently.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-2xl p-6 text-left hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
