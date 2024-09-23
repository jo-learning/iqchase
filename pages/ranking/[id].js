// pages/index.js
import React, { useState, useEffect } from 'react';
import RankingsList from '../../components/rankinglist';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

const fakeRankingsData = [
  { name: 'Yohanns', score: 3 },
];

export default function Home() {
    const [rankingsData, setRankingsData] = useState(fakeRankingsData);
    const router = useRouter();
    const { id } = router.query
    useEffect(()=>{
        const fetchdata = async() =>{
            const res = await fetch(`/api/score/getscore/${id}`)
            const data = await res.json();
            if (res.ok){
                console.log(data)
                setRankingsData(data.score);
            }
            else{
                console.log(data)
            }
        }
        fetchdata();
    },[router]);
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
