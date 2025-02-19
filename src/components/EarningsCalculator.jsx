import React, { useState } from 'react';

const EarningsCalculator = () => {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const taskRate = 20; // Rate per task (in dollars)

  const calculateEarnings = () => {
    return tasksCompleted / taskRate;
  };

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">Estimate Your Earnings</h2>
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-6">
          <label htmlFor="tasks" className="block text-lg font-medium text-gray-700 mb-2">Tasks Completed:</label>
          <input
            type="number"
            id="tasks"
            value={tasksCompleted}
            onChange={(e) => setTasksCompleted(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-800">
            Estimated Earnings: ${calculateEarnings()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EarningsCalculator;
