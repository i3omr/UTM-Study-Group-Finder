"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import table components from your UI library
import { Button } from "@/components/ui/button"; // Import Button component

type Group = {
  id: string;
  course: string;
  name: string;
  description: string | null; // description can be null
};

interface StudentcoursetableProps {
  groups: Group[];
}

export const Studentcoursetable: React.FC<StudentcoursetableProps> = ({ groups }) => {
  const router = useRouter(); // Initialize the router

  // State to manage sorting configuration
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Group; // Explicitly use keys of the Group type
    direction: "ascending" | "descending"; // Sorting direction (ascending or descending)
  }>({
    key: "course", // Default column to sort by
    direction: "ascending", // Default sorting direction
  });

  // Function to sort data based on the selected column and direction
  const sortedGroups = [...groups].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Toggle sorting direction when a column header is clicked
  const handleSort = (key: keyof Group) => {
    setSortConfig((prevState) => {
      if (prevState.key === key) {
        // If the same column is clicked, toggle the direction
        return {
          key,
          direction: prevState.direction === "ascending" ? "descending" : "ascending",
        };
      }
      // If a new column is clicked, default to ascending direction
      return {
        key,
        direction: "ascending",
      };
    });
  };

  // Function to handle the "View" button click
  const handleView = (groupId: string) => {
    router.push(`/group/${groupId}`); // Redirect to the group-specific page
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("course")} className="font-bold">
              Course Name
              {sortConfig.key === "course" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead onClick={() => handleSort("name")} className="font-bold">
              Group Name
              {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead onClick={() => handleSort("description")} className="font-bold">
              Group Description
              {sortConfig.key === "description" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </TableHead>
            <TableHead className="font-bold">Actions</TableHead> {/* Add a new column for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGroups.length > 0 ? (
            sortedGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.course}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description ?? "No description available"}</TableCell>
                <TableCell>
                  {/* Add a "View" button */}
                  <Button onClick={() => handleView(group.id)} className="text-blue-500 bg-white hover:bg-gray-300">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No groups available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
