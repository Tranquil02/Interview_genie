import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";
import LogoIcon from "../svg/lamp.png";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "/month",
      features: [
        "5 AI interviews/month",
        "Basic analytics dashboard",
        "Standard question bank",
        "Email support",
        "Interview recording",
        "Basic feedback reports",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$24.99",
      period: "/month",
      features: [
        "Unlimited interviews",
        "Advanced analytics",
        "Custom scenarios",
        "Priority support",
        "Video recording & analysis",
        "Personalized feedback",
        "Industry-specific training",
        "Mock interview library",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Custom AI training",
        "Team management",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "White-labeling",
        "Advanced reporting",
        "Custom features",
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-1 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 md:px-12 py-4 bg-transparent">
        <div className="flex items-center space-x-1">
          <h1 className="text-xl font-bold text-white">InterviewGenie</h1>
          <img src={LogoIcon} alt="InterviewGenie" className="w-12 h-12" />
        </div>
        <Link
          to="/"
          className="absolute top-4 right-9 p-2 text-gray-100 hover:text-indigo-300 transition-colors duration-200"
        >
          <Home className="h-8 w-8" />
        </Link>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the perfect plan for your interview preparation needs
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-xl transform hover:scale-105 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden"
                  : "bg-gray-200 text-black"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-800">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center space-x-2">
                    <CheckCircle
                      className={`h-5 w-5 ${
                        plan.popular ? "text-white" : "text-blue-500"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
