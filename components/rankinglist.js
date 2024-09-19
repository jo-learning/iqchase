// components/RankingsList.js
import React from 'react';

const RankingsList = ({ rankings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Rankings</h2>
      <div className="border-t border-gray-300">
        <ul className="divide-y divide-gray-200">
          {rankings.map((ranking, index) => (
            <li key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <span className={`text-xl font-semibold ${index < 3 ? 'text-yellow-500' : 'text-gray-700'}`}>
                  {index + 1}.
                </span>
                <span className="text-lg font-medium text-gray-700">{ranking.name}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{ranking.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingsList;
