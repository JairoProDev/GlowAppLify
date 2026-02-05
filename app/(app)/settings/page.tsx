"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useSettingsStore } from "@/lib/store/settings-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, Monitor, User, Bell, Database, Trash2, Download } from "lucide-react"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const {
        profile,
        theme: storeTheme,
        notificationsEnabled,
        setTheme: setStoreTheme,
        updateProfile,
        toggleNotifications
    } = useSettingsStore()

    // Local state for form management
    const [name, setName] = useState(profile.name)
    const [email, setEmail] = useState(profile.email)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const { setTheme: setNextTheme } = useTheme()

    // Sync component state with store on mount
    useEffect(() => {
        setName(profile.name)
        setEmail(profile.email)
    }, [profile])

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB')
            return
        }

        setIsUploadingAvatar(true)
        try {
            // Convert to base64
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                updateProfile({ avatarUrl: base64String })
                toast.success('Avatar updated successfully')
                setIsUploadingAvatar(false)
            }
            reader.onerror = () => {
                toast.error('Failed to read image')
                setIsUploadingAvatar(false)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.error('Avatar upload error:', error)
            toast.error('Failed to upload avatar')
            setIsUploadingAvatar(false)
        }
    }

    const handleProfileSave = () => {
        updateProfile({ name, email })
        toast.success("Profile updated successfully")
    }

    const handleThemeChange = (t: 'light' | 'dark' | 'system') => {
        setStoreTheme(t)
        setNextTheme(t) // Sync with next-themes if used, or manage class manually
        toast.success(`Theme set to ${t}`)
    }

    const handleExportData = () => {
        // Collecting data from localStorage for MVP export
        const data = {
            settings: localStorage.getItem('glow-settings-storage'),
            tasks: localStorage.getItem('glow-tasks-storage'),
            notes: localStorage.getItem('glow-notes-store'),
            journal: localStorage.getItem('glow-journal-store'),
            routines: localStorage.getItem('glow-routine-store'),
            board: localStorage.getItem('execution_board_v1')
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "glow_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Backup downloaded")
    }

    const handleClearData = () => {
        if (confirm("Are you sure? This will wipe all your data!")) {
            localStorage.clear();
            window.location.reload();
        }
    }

    return (
        <div className="container mx-auto py-6 max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start h-auto p-1 bg-secondary/30">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="data" className="text-destructive data-[state=active]:text-destructive">Data Zone</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
                            <CardDescription>Configure how you receive alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive daily summaries and habit reminders.</p>
                            </div>
                            <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Profile</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profile.avatarUrl} />
                                    <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                    <Button
                                        variant="outline"
                                        disabled={isUploadingAvatar}
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                    >
                                        {isUploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Max size: 2MB
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleProfileSave}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Preferences</CardTitle>
                            <CardDescription>Select the theme for the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'light' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('light')}
                            >
                                <Sun className="h-8 w-8" />
                                <span className="font-medium">Light</span>
                            </div>
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'dark' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <Moon className="h-8 w-8" />
                                <span className="font-medium">Dark</span>
                            </div>
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'system' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('system')}
                            >
                                <Monitor className="h-8 w-8" />
                                <span className="font-medium">System</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" /> Data Management</CardTitle>
                            <CardDescription>Control your local data.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                                <div>
                                    <h4 className="font-medium">Export Data</h4>
                                    <p className="text-sm text-muted-foreground">Download a JSON copy of all your boards, tasks, and notes.</p>
                                </div>
                                <Button variant="outline" onClick={handleExportData}>
                                    <Download className="h-4 w-4 mr-2" /> Export
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                <div>
                                    <h4 className="font-medium text-destructive">Danger Zone</h4>
                                    <p className="text-sm text-muted-foreground">Permanently delete all local data. This cannot be undone.</p>
                                </div>
                                <Button variant="destructive" onClick={handleClearData}>
                                    <Trash2 className="h-4 w-4 mr-2" /> Clear All Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
