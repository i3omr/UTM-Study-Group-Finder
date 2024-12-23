"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  deleteGroup,
  updateGroup 
} from "@/app/actions";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  course: string;
  description: string;
  members: Member[];
  createdAt: Date;
}

export function AdminGroupsTable({ groups }: { groups: Group[] }) {
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteGroup = async (groupId: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      await deleteGroup(groupId);
    }
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name || '',
      course: group.course || '',
      description: group.description || '',
    });
    setIsDialogOpen(true);
  };

  const handleSaveGroup = async () => {
    if (!editingGroup) return;
    
    setIsSubmitting(true);
    try {
      const result = await updateGroup(editingGroup.id, {
        name: formData.name,
        course: formData.course,
        description: formData.description,
      });

      if (result.success) {
        setIsDialogOpen(false);
        setEditingGroup(null);
        alert('Group updated successfully');
      } else {
        alert(result.error || 'Failed to update group');
      }
    } catch (error) {
      console.error('Error updating group:', error);
      alert('Failed to update group');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Groups Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.course}</TableCell>
              <TableCell>{group.members?.length || 0}</TableCell>
              <TableCell>{new Date(group.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditGroup(group)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            {editingGroup && (
              <div className="mt-4">
                <Label>Current Members ({editingGroup.members?.length || 0})</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {editingGroup.members?.map((member) => (
                    <div key={member.id} className="flex items-center justify-between rounded-md border p-2">
                      <span>{member.name} ({member.email})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveGroup}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 