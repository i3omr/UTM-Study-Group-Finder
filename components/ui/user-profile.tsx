'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type UserProfileProps = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    bio: string | null;
    groups?: {
      id: string;
      name: string;
      description?: string;
      course?: string;
      major?: string;
    }[];
  };
};

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
    bio: user.bio || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords if either password field is filled
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          bio: formData.bio,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server response:', responseData);
        throw new Error(responseData.error || 'Failed to update profile');
      }

      setFormData({
        name: responseData.name,
        email: responseData.email,
        password: '',
        confirmPassword: '',
        bio: responseData.bio || '',
      });
      
      setIsEditing(false);
      
      toast.success('Profile updated successfully', {
        duration: 3000,
        position: 'top-center',
        dismissible: true,
        action: {
          label: "Close",
          onClick: () => toast.dismiss()
        }
      });
      

    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            ) : (
              <p className="text-sm">{formData.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            ) : (
              <p className="text-sm">{formData.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Academic Interests & Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Share your academic interests and background..."
                className="min-h-[100px] resize-y"
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap">
                {formData.bio || 'No bio provided'}
              </p>
            )}
          </div>

          

          <div className="space-y-2">
            <Label>Role</Label>
            <p className="text-sm capitalize">{user.role}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      password: '',
                      confirmPassword: '',
                      bio: user.bio || '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 