// app/components/GroupCard.js
'use client'; // Mark this as a Client Component

import { useState } from 'react';

export default function GroupCard({ group }) {
  const [joined, setJoined] = useState(false);

  const handleJoinGroup = () => {
    setJoined(true);
    alert(`You have joined the group: ${group.name}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-600">{group.name || "Untitled Group"}</h2>
      <p className="text-sm text-gray-500">Topic: {group.topic || "No topic specified"}</p>
      <p className="mt-2 text-gray-700">{group.description || "No description available"}</p>
      <div className="mt-4 space-y-2">
        <button
          onClick={handleJoinGroup}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          {joined ? 'Joined' : 'Join Group'}
        </button>
        <button
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 font-semibold"
        >
          Hide Group
        </button>
      </div>
    </div>
  );
}