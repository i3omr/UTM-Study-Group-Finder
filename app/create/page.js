// app/create/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateGroup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    course: '',
    topic: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          members: [{ id: Date.now(), name: "Ahmed", role: "Admin" }],
          events: [],
          resources: [],
        }),
      });

      if (response.ok) {
        alert('Group created successfully!');
        router.push('/groups');
      } else {
        throw new Error('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="bg-white text-white w-full py-8 text-center">
        <h1 className="text-4xl text-black font-bold">Create New Study Group</h1>
        <p className="mt-2  text-black">Fill in the details to create your study group</p>
      </header>

      <main className="w-full max-w-2xl px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-semibold mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter study topic"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe your study group"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-black  text-white py-2 px-4 rounded-md hover:bg-gray-600 font-semibold"
            >
              Create Group
            </button>
            <Link
              href="/groups"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}