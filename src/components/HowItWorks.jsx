import React from "react";

const steps = [
  { step: 1, description: "Sign up to create an account on the platform." },
  {
    step: 2,
    description: "Browse and select available tasks you can complete.",
  },
  {
    step: 3,
    description: "Complete the task and submit your work for review.",
  },
  {
    step: 4,
    description: "Earn money and withdraw once your task is approved.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-white ">
      <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
      <div className="text-center mx-auto">
        <ul className="space-y-6 text-center " >
          {steps.map((step) => (
            <li key={step.step} className="flex items-start space-x-4">
              <span className="text-3xl font-semibold text-center  text-primary">
                {step.step}
              </span>
              <p className="text-lg text-gray-700 text-center ">{step.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorks;
