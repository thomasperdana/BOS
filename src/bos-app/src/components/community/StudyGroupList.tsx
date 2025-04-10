import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Link from 'next/link';
import { storage as puterStorage } from '../../lib/puter';
import { StudyGroup } from '../../lib/types';

const StudyGroupList: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOnlyMyGroups, setShowOnlyMyGroups] = useState(false);
  
  // Load study groups when component mounts
  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch groups from a database
        // For now, we'll use Puter.js storage
        const savedGroups = await puterStorage.loadData('community:study-groups');
        
        if (savedGroups) {
          setGroups(savedGroups);
          
          if (user) {
            const userGroups = savedGroups.filter((group: StudyGroup) => 
              group.members.includes(user.id) || group.admins.includes(user.id)
            );
            setMyGroups(userGroups);
          }
        } else {
          // Create default study groups if none exist
          const defaultGroups: StudyGroup[] = [
            {
              id: '1',
              name: 'New Believers Group',
              description: 'A study group for those new to the faith',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              members: [],
              admins: ['system'],
              meetingSchedule: {
                day: 'Monday',
                time: '19:00',
                frequency: 'weekly',
                timezone: 'America/New_York'
              },
              currentStudy: {
                book: 'John',
                chapter: 1
              },
              isPrivate: false,
              requiresApproval: true
            },
            {
              id: '2',
              name: 'Psalms Deep Dive',
              description: 'An in-depth study of the Psalms',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              members: [],
              admins: ['system'],
              meetingSchedule: {
                day: 'Wednesday',
                time: '20:00',
                frequency: 'weekly',
                timezone: 'America/New_York'
              },
              currentStudy: {
                book: 'Psalms',
                chapter: 1
              },
              isPrivate: false,
              requiresApproval: false
            },
            {
              id: '3',
              name: 'Apologetics Study',
              description: 'Learning to defend the faith',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              members: [],
              admins: ['system'],
              meetingSchedule: {
                day: 'Friday',
                time: '18:30',
                frequency: 'biweekly',
                timezone: 'America/New_York'
              },
              currentStudy: {
                theme: 'Defending the Resurrection'
              },
              isPrivate: false,
              requiresApproval: true
            }
          ];
          
          await puterStorage.saveData('community:study-groups', defaultGroups);
          setGroups(defaultGroups);
        }
      } catch (err) {
        console.error('Failed to load study groups:', err);
        setError('Failed to load study groups');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGroups();
  }, [user]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format meeting schedule
  const formatMeetingSchedule = (group: StudyGroup) => {
    if (!group.meetingSchedule) return 'No schedule set';
    
    const { day, time, frequency, timezone } = group.meetingSchedule;
    return `${day}s at ${time} (${frequency}, ${timezone})`;
  };
  
  // Format current study
  const formatCurrentStudy = (group: StudyGroup) => {
    if (!group.currentStudy) return 'No current study';
    
    if (group.currentStudy.book) {
      return group.currentStudy.chapter
        ? `${group.currentStudy.book} ${group.currentStudy.chapter}`
        : group.currentStudy.book;
    } else if (group.currentStudy.theme) {
      return group.currentStudy.theme;
    }
    
    return 'No current study';
  };
  
  // Handle joining a group
  const handleJoinGroup = async (groupId: string) => {
    if (!isAuthenticated || !user) {
      setError('Please sign in to join a study group');
      return;
    }
    
    try {
      const groupToJoin = groups.find(g => g.id === groupId);
      
      if (!groupToJoin) {
        setError('Group not found');
        return;
      }
      
      // Check if user is already a member
      if (groupToJoin.members.includes(user.id) || groupToJoin.admins.includes(user.id)) {
        setError('You are already a member of this group');
        return;
      }
      
      // Add user to group members
      const updatedGroup = {
        ...groupToJoin,
        members: [...groupToJoin.members, user.id]
      };
      
      // Update groups list
      const updatedGroups = groups.map(g => g.id === groupId ? updatedGroup : g);
      
      // Save to storage
      await puterStorage.saveData('community:study-groups', updatedGroups);
      
      // Update state
      setGroups(updatedGroups);
      setMyGroups([...myGroups, updatedGroup]);
      
      // Show success message
      setError('Successfully joined the group!');
    } catch (err) {
      console.error('Failed to join group:', err);
      setError('Failed to join the study group');
    }
  };
  
  // Filter groups based on showOnlyMyGroups
  const displayedGroups = showOnlyMyGroups ? myGroups : groups;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Bible Study Groups</h2>
        
        {isAuthenticated && (
          <Link href="/community/groups/new">
            <Button variant="primary" size="sm">
              Create Group
            </Button>
          </Link>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {isAuthenticated && (
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="show-my-groups"
            checked={showOnlyMyGroups}
            onChange={() => setShowOnlyMyGroups(!showOnlyMyGroups)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="show-my-groups" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Show only my groups
          </label>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading study groups...</p>
        </div>
      ) : displayedGroups.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            {showOnlyMyGroups
              ? "You haven't joined any study groups yet."
              : "No study groups found."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {displayedGroups.map((group) => {
            const isMember = user && (group.members.includes(user.id) || group.admins.includes(user.id));
            
            return (
              <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/community/groups/${group.id}`}>
                      <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        {group.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {group.description}
                    </p>
                  </div>
                  
                  {isAuthenticated && !isMember && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      Join Group
                    </Button>
                  )}
                  
                  {isMember && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Member
                    </span>
                  )}
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Schedule:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{formatMeetingSchedule(group)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Current Study:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{formatCurrentStudy(group)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Members:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{group.members.length + group.admins.length}</span>
                  </div>
                </div>
                
                {group.isPrivate && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                      Private Group
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-md font-medium mb-2 dark:text-white">About Study Groups</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bible study groups are a great way to connect with other believers and grow in your faith.
          Join an existing group or create your own to start studying the Bible together.
        </p>
      </div>
    </div>
  );
};

export default StudyGroupList;
