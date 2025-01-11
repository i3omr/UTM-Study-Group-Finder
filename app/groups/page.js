// app/page.js
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mydashboardsidebar } from "@/components/mydashboardsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [hiddenGroups, setHiddenGroups] = useState({});
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [viewMembers, setViewMembers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch current user data first
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include'
        });
        
        const data = await response.json();

        if (!response.ok) {
          console.error('Failed to get user:', data.error);
          return;
        }

        setCurrentUser(data);
        // After getting user, fetch groups
        fetchGroups();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch groups from the database
    const fetchGroups = async () => {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    };

    fetchCurrentUser();
  }, []);

  // Helper function to check if user is member of a group
  const isUserMemberOfGroup = (group) => {
    return currentUser && group.members.some(member => member.id === currentUser.id);
  };

  const handleJoinGroup = async (groupId) => {
    try {
      if (!currentUser?.id) {
        alert('Please log in to join groups');
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId: currentUser.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join group');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );
      
      alert('You have joined the group!');
    } catch (error) {
      console.error('Error joining group:', error);
      alert(error.message || 'Failed to join group. Please try again.');
    }
  };

  const handleExitGroup = async (groupId) => {
    try {
      if (!currentUser?.id) {
        alert('Please log in to perform this action');
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/exit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId: currentUser.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to exit group');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );
      
      alert('You have exited the group!');
    } catch (error) {
      console.error('Error exiting group:', error);
      alert(error.message || 'Failed to exit group. Please try again.');
    }
  };

  const handleHideGroup = (groupId) => {
    setHiddenGroups((prev) => ({ ...prev, [groupId]: true }));
  };

  const handleAddEvent = async (groupId) => {
    try {
      const eventTitle = prompt("Enter the event title:");
      const eventDate = prompt("Enter the event date (YYYY-MM-DD):");
      
      if (!eventTitle || !eventDate) {
        alert("Event title and date are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventTitle, eventDate }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add event');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert(error.message || 'Failed to add event. Please try again.');
    }
  };

  const handleDeleteEvent = async (groupId, eventIndex) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/events/${eventIndex}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert("Event deleted successfully!");
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(error.message || 'Failed to delete event. Please try again.');
    }
  };

  const handleEditEvent = async (groupId, eventIndex) => {
    try {
      const eventTitle = prompt("Edit the event title:");
      const eventDate = prompt("Edit the event date (YYYY-MM-DD):");
      
      if (!eventTitle || !eventDate) {
        alert("Event title and date are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/events/${eventIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventTitle, eventDate }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update event');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert(error.message || 'Failed to update event. Please try again.');
    }
  };

  const handleDeleteResource = async (groupId, resourceIndex) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/resources/${resourceIndex}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete resource');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert("Resource deleted successfully!");
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert(error.message || 'Failed to delete resource. Please try again.');
    }
  };

  const handleEditResource = async (groupId, resourceIndex) => {
    try {
      const resourceName = prompt("Edit the name of the resource:");
      const resourceLink = prompt("Edit the link to the resource:");
      
      if (!resourceName || !resourceLink) {
        alert("Resource name and link are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/resources/${resourceIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resourceName, resourceLink }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update resource');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('Resource updated successfully!');
    } catch (error) {
      console.error('Error updating resource:', error);
      alert(error.message || 'Failed to update resource. Please try again.');
    }
  };

  const handleUploadResource = async (groupId) => {
    try {
      const resourceName = prompt("Enter the name of the resource:");
      const resourceLink = prompt("Enter the link to the resource:");
      
      if (!resourceName || !resourceLink) {
        alert("Resource name and link are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resourceName, resourceLink }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add resource');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('Resource uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert(error.message || 'Failed to upload resource. Please try again.');
    }
  };

  const handleUploadFile = async (groupId) => {
    try {
      const resourceName = prompt("Enter the name of the file:");
      const resourceType = prompt("Enter the type of file (e.g., PDF, PPT, DOC):");
      const resourceLink = prompt("Enter the link to the file:");
      
      if (!resourceName || !resourceType || !resourceLink) {
        alert("All fields are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          resourceName, 
          resourceType,
          resourceLink,
          resourceCategory: 'file'
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add file');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error.message || 'Failed to upload file. Please try again.');
    }
  };

  const handleAddLink = async (groupId) => {
    try {
      const resourceName = prompt("Enter the name of the link:");
      const resourceLink = prompt("Enter the URL:");
      
      if (!resourceName || !resourceLink) {
        alert("Both name and URL are required.");
        return;
      }

      const response = await fetch(`/api/groups/${groupId}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          resourceName, 
          resourceLink,
          resourceCategory: 'link'
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add link');
      }

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? data : group
        )
      );

      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding link:', error);
      alert(error.message || 'Failed to add link. Please try again.');
    }
  };

  const handleViewMembers = (group) => {
    if (!group.members || group.members.length === 0) {
      alert("No members to display for this group.");
      return;
    }
    setViewMembers(group);
  };

  const toggleGroupDetails = (groupId) => {
    setExpandedGroupId((prev) => (prev === groupId ? null : groupId));
  };


  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Mydashboardsidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <h1 className="text-2xl font-semibold">Groups</h1>
              <div className="ml-auto flex items-center gap-4">
                <Link
                  href={{ pathname: "/create" }}
                  className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
                >
                  Create New Group
                </Link>
              </div>
            </div>
          </div>

          <main className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {Array.isArray(groups) && groups.map((group) =>
                !hiddenGroups[group.id] && (
                  <div
                    key={group.id}
                    className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
                  >
                    {currentUser?.role === 'admin' && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-gray-600 hover:text-black"
                          title="Delete Group"
                        >
                          
                        </button>
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-black">{group.course || "Untitled Group"}</h2>
                    <p className="text-sm text-gray-500">Topic: {group.topic || "No topic specified"}</p>
                    <p className="mt-2 text-gray-700">{group.description || "No description available"}</p>
                    <button
                      onClick={() => toggleGroupDetails(group.id)}
                      className="mt-2 text-gray-600 underline hover:text-black"
                    >
                      {expandedGroupId === group.id ? "Hide Details" : "View Details"}
                    </button>
                    {expandedGroupId === group.id && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">Scheduled Study Sessions</h3>
                        <ul className="space-y-2">
                          {group.events && group.events.length > 0 ? (
                            group.events.map((event, index) => (
                              <li key={index} className="border-b py-2">
                                {event.title} - {event.date}
                                {isUserMemberOfGroup(group) && (
                                  <>
                                    <button
                                      onClick={() => handleEditEvent(group.id, index)}
                                      className="ml-4 text-sm text-gray-600 underline"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEvent(group.id, index)}
                                      className="ml-4 text-sm text-red-600 underline"
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-500">No events scheduled.</p>
                          )}
                        </ul>

                        <h3 className="text-lg font-semibold mt-4">Shared Resource</h3>
<ul className="space-y-2">
  {group.resources && group.resources.length > 0 ? (
    group.resources.map((resource, index) => (
      <li key={index} className="border-b py-2">
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {resource.name}
        </a>
        {isUserMemberOfGroup(group) && (
          <>
            <button
              onClick={() => handleEditResource(group.id, index)}
              className="ml-4 text-sm text-gray-600 underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteResource(group.id, index)}
              className="ml-4 text-sm text-red-600 underline"
            >
              Delete
            </button>
          </>
        )}
      </li>
    ))
  ) : (
    <p className="text-gray-500">No shared resource added.</p>
  )}
</ul>

                        <h3 className="text-lg font-semibold mt-4">Group Members</h3>
                        <ul className="space-y-2">
                          {group.members && group.members.length > 0 ? (
                            group.members.map((member) => (
                              <li key={member.id} className="border-b py-2">
                                {member.name} - {member.role}
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-500">No members yet.</p>
                          )}
                        </ul>
                      </div>
                    )}
                    <div className="mt-4 space-y-2">
                      {!isUserMemberOfGroup(group) ? (
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 font-semibold"
                        >
                          Join Group
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleExitGroup(group.id)}
                            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 font-semibold"
                          >
                            Exit Group
                          </button>
                          <button
                            onClick={() => handleAddEvent(group.id)}
                            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 font-semibold"
                          >
                            Add Event
                          </button>
                          <button
                            onClick={() => handleUploadResource(group.id)}
                            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 font-semibold"
                          >
                            Upload Resource
                          </button>
                          <button
                            onClick={() => handleViewMembers(group)}
                            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 font-semibold"
                          >
                            View Members
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleHideGroup(group.id)}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 font-semibold"
                      >
                        Hide Group
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </main>
        </div>

        {viewMembers && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-md">
              <h2 className="text-xl font-semibold text-black mb-4">Members of {viewMembers.course}</h2>
              <ul className="space-y-2">
                {viewMembers.members.map((member) => (
                  <li key={member.id} className="flex justify-between border-b py-2">
                    <span>{member.name}</span>
                    <span className="text-gray-500 text-sm">{member.role}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setViewMembers(null)}
                className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}