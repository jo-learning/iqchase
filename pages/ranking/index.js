// pages/index.js
import React from 'react';
import RankingsList from '../../components/rankinglist';
import Header from '@/components/Header';

const rankingsData = [
  { name: 'Yohanns', score: 3 },
];

export default function Home() {
  return (
    <div>
        <Header />
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-black">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
      
      {/* Rankings List */}
      <RankingsList rankings={rankingsData} />
    </div>
    </div>
    
  );
}
