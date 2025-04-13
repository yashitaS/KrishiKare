import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-6 text-center">
        Welcome to KrishiKare
      </h1>
      <img
        src="/assets/farmer.png"
        alt="Farmer"
        className="w-48 h-48 mb-8"
      />
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Login
        </button>
        <button className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded-lg hover:bg-green-100 transition">
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
