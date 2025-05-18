import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is DashHost?",
    answer:
      "DashHost is your centralized hub for managing clients, domains, and hosting services. Whether you're a freelancer, agency, or individual, DashHost helps you keep track of all your technical assets in one clean dashboard. With features like renewal alerts, client-wise categorization, and fast access to critical service info, DashHost reduces chaos and boosts efficiency."
  },
  {
    question: "Is DashHost really free for 14 days?",
    answer:
      "Absolutely! Our 14-day trial is designed to give you full access to DashHost’s features without needing to provide credit card details. Explore all tools—from client management to auto reminders—and decide if it suits your workflow. You can upgrade anytime during or after the trial period."
  },
  {
    question: "How do renewal reminders work?",
    answer:
      "DashHost sends timely email notifications and dashboard alerts ahead of any upcoming domain, hosting, or service renewal. You can customize reminder intervals (e.g., 30 days or 7 days before expiry) and assign reminders per client or service. This ensures that neither you nor your clients face unwanted service disruptions."
  },
  {
    question: "Can I manage multiple clients?",
    answer:
      "Yes! DashHost is purpose-built for multi-client environments. Easily switch between client profiles, assign services under their names, and view insights like service expiry timelines. Agencies love our clean segregation, and it saves hours in manual record-keeping."
  },
  {
    question: "Is my data secure?",
    answer:
      "We take security seriously. All data is encrypted both in transit (via HTTPS) and at rest. Your access is protected using secure authentication methods. In addition, DashHost supports role-based access controls so you can manage team permissions with confidence. Backups are taken regularly to prevent data loss."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6 md:px-20" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition duration-300 border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-indigo-600 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
