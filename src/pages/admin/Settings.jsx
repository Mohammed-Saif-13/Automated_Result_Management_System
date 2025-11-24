import { useState } from 'react';
import { User, Lock, Bell, Palette, Database } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useUIStore } from '@/stores/useUIStore';

const Settings = () => {
    const { user } = useAuth();
    const toast = useToast();
    const { theme, toggleTheme } = useUIStore();
    const [activeTab, setActiveTab] = useState('profile');

    const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '',
        },
    });

    const { register: registerPassword, handleSubmit: handlePasswordSubmit, watch, reset } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onProfileSubmit = (data) => {
        toast.success('Profile updated successfully!');
    };

    const onPasswordSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        toast.success('Password changed successfully!');
        reset();
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'backup', label: 'Backup', icon: Database },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                <div className="lg:w-64">
                    <Card padding="sm">
                        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Profile Information</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        {...registerProfile('name')}
                                        required
                                    />

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        {...registerProfile('email')}
                                        required
                                    />

                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        {...registerProfile('phone')}
                                        placeholder="1234567890"
                                    />

                                    <div className="flex justify-end">
                                        <Button type="submit">
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </Card.Content>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Change Password</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        {...registerPassword('currentPassword')}
                                        required
                                    />

                                    <Input
                                        label="New Password"
                                        type="password"
                                        {...registerPassword('newPassword')}
                                        helperText="Must be at least 8 characters"
                                        required
                                    />

                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        {...registerPassword('confirmPassword')}
                                        required
                                    />

                                    <div className="flex justify-end">
                                        <Button type="submit">
                                            Update Password
                                        </Button>
                                    </div>
                                </form>
                            </Card.Content>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Notification Preferences</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Receive email updates about results
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Get push notifications on new activities
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Receive weekly performance summary
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    )}

                    {activeTab === 'appearance' && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Appearance Settings</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Theme
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => theme === 'dark' && toggleTheme()}
                                                className={`p-4 border-2 rounded-lg transition-all ${theme === 'light'
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-300 dark:border-gray-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white border border-gray-300 rounded-lg"></div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">Light</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Bright theme</p>
                                                    </div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => theme === 'light' && toggleTheme()}
                                                className={`p-4 border-2 rounded-lg transition-all ${theme === 'dark'
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-300 dark:border-gray-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg"></div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">Dark</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Dark theme</p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    )}

                    {activeTab === 'backup' && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Backup & Restore</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <div className="space-y-6">
                                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                        <p className="text-sm text-primary-900 dark:text-primary-300">
                                            Last backup: January 15, 2024 at 10:30 AM
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <Button fullWidth>
                                            <Database size={18} className="mr-2" />
                                            Create Backup
                                        </Button>

                                        <Button variant="outline" fullWidth>
                                            Restore from Backup
                                        </Button>

                                        <Button variant="outline" fullWidth>
                                            Download Database
                                        </Button>
                                    </div>

                                    <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                                        <p className="text-sm text-warning-900 dark:text-warning-300">
                                            ⚠️ Restoring from backup will overwrite current data. Make sure to backup before restoring.
                                        </p>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;