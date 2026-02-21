
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import apiService from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { XIcon } from '../components/icons/Icons';

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({ skills: [], interests: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      if (!profile.skills.includes(skillInput.trim())) {
        setProfile(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiService.updateProfile(profile);
      // Add a success message/toast here in a real app
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Skills & Interests</CardTitle>
          <CardDescription>Help us understand your strengths and passions to recommend the best career paths for you.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading profile...</p>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium mb-2">Skills</label>
                  <p className="text-sm text-slate-500 mb-2">Type a skill and press Enter to add it.</p>
                  <div className="flex flex-wrap gap-2 p-2 border border-slate-300 dark:border-slate-600 rounded-md min-h-[40px]">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="rounded-full hover:bg-slate-400/20 p-0.5">
                          <XIcon className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    <Input
                      id="skills"
                      type="text"
                      className="flex-grow border-none focus:ring-0 focus:outline-none p-0 h-auto bg-transparent"
                      placeholder="e.g., JavaScript"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium mb-2">Interests</label>
                  <Input
                    id="interests"
                    placeholder="e.g., Artificial Intelligence, Graphic Design (comma separated)"
                    value={profile.interests.join(', ')}
                    onChange={(e) => setProfile(p => ({...p, interests: e.target.value.split(',').map(s => s.trim())}))}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
