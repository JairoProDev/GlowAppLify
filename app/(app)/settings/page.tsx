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
import { Moon, Sun, Monitor, User, Bell, Database, Trash2, Download, Languages } from "lucide-react"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function SettingsPage() {
    const {
        profile,
        theme: storeTheme,
        notificationsEnabled,
        setTheme: setStoreTheme,
        updateProfile,
        toggleNotifications
    } = useSettingsStore()

    const { language, setLanguage, t } = useLanguage()

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
            toast.error(language === 'es' ? 'Por favor selecciona un archivo de imagen' : 'Please select an image file')
            return
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error(language === 'es' ? 'La imagen debe ser menor a 2MB' : 'Image size should be less than 2MB')
            return
        }

        setIsUploadingAvatar(true)
        try {
            // Convert to base64
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                updateProfile({ avatarUrl: base64String })
                toast.success(language === 'es' ? 'Avatar actualizado' : 'Avatar updated successfully')
                setIsUploadingAvatar(false)
            }
            reader.onerror = () => {
                toast.error(language === 'es' ? 'Error al leer la imagen' : 'Failed to read image')
                setIsUploadingAvatar(false)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.error('Avatar upload error:', error)
            toast.error(language === 'es' ? 'Error al subir avatar' : 'Failed to upload avatar')
            setIsUploadingAvatar(false)
        }
    }

    const handleProfileSave = () => {
        updateProfile({ name, email })
        toast.success(t('settings.profile') + " " + (language === 'es' ? 'actualizado' : 'updated'))
    }

    const handleThemeChange = (t_theme: 'light' | 'dark' | 'system') => {
        setStoreTheme(t_theme)
        setNextTheme(t_theme) // Sync with next-themes if used, or manage class manually
        toast.success(`${language === 'es' ? 'Tema cambiado a' : 'Theme set to'} ${t_theme}`)
    }

    const handleLanguageChange = (lang: 'en' | 'es') => {
        setLanguage(lang)
        toast.success(`${language === 'es' ? 'Idioma cambiado a' : 'Language set to'} ${lang === 'es' ? 'Español' : 'English'}`)
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
        toast.success(language === 'es' ? "Respaldo descargado" : "Backup downloaded")
    }

    const handleClearData = () => {
        const confirmMsg = language === 'es'
            ? "¿Estás seguro? ¡Esto borrará todos tus datos!"
            : "Are you sure? This will wipe all your data!"

        if (confirm(confirmMsg)) {
            localStorage.clear();
            window.location.reload();
        }
    }

    return (
        <div className="container mx-auto py-6 max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
                <p className="text-muted-foreground">{t('settings.subtitle')}</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start h-auto p-1 bg-secondary/30">
                    <TabsTrigger value="general">{t('settings.general')}</TabsTrigger>
                    <TabsTrigger value="account">{t('settings.account')}</TabsTrigger>
                    <TabsTrigger value="appearance">{t('settings.appearance')}</TabsTrigger>
                    <TabsTrigger value="data" className="text-destructive data-[state=active]:text-destructive">{t('settings.data')}</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> {t('settings.notifications')}</CardTitle>
                            <CardDescription>{t('settings.notifications_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('settings.push_notifications')}</Label>
                                <p className="text-sm text-muted-foreground">{t('settings.push_notifications_desc')}</p>
                            </div>
                            <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Languages className="h-5 w-5" /> {t('settings.language')}</CardTitle>
                            <CardDescription>{language === 'es' ? 'Selecciona tu idioma preferido.' : 'Select your preferred language.'}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${language === 'es' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleLanguageChange('es')}
                            >
                                <span className="text-2xl">🇪🇸</span>
                                <span className="font-medium">Español</span>
                            </div>
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${language === 'en' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleLanguageChange('en')}
                            >
                                <span className="text-2xl">🇺🇸</span>
                                <span className="font-medium">English</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> {t('settings.profile')}</CardTitle>
                            <CardDescription>{t('settings.profile_desc')}</CardDescription>
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
                                        {isUploadingAvatar ? t('settings.uploading') : t('settings.change_avatar')}
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {t('settings.max_size')}
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t('settings.display_name')}</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t('settings.email')}</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleProfileSave}>{t('daily.celebration.done')}</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('settings.theme_prefs')}</CardTitle>
                            <CardDescription>{t('settings.theme_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'light' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('light')}
                            >
                                <Sun className="h-8 w-8" />
                                <span className="font-medium">{t('settings.light_mode')}</span>
                            </div>
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'dark' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <Moon className="h-8 w-8" />
                                <span className="font-medium">{t('settings.dark_mode')}</span>
                            </div>
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:bg-accent transition-all ${storeTheme === 'system' ? 'border-primary bg-accent' : 'border-transparent'}`}
                                onClick={() => handleThemeChange('system')}
                            >
                                <Monitor className="h-8 w-8" />
                                <span className="font-medium">{t('settings.system_mode')}</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" /> {t('settings.data_mgmt')}</CardTitle>
                            <CardDescription>{t('settings.data_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                                <div>
                                    <h4 className="font-medium">{t('settings.export_data')}</h4>
                                    <p className="text-sm text-muted-foreground">{t('settings.export_desc')}</p>
                                </div>
                                <Button variant="outline" onClick={handleExportData}>
                                    <Download className="h-4 w-4 mr-2" /> {t('settings.export_button')}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                <div>
                                    <h4 className="font-medium text-destructive">{t('settings.danger_zone')}</h4>
                                    <p className="text-sm text-muted-foreground">{t('settings.danger_desc')}</p>
                                </div>
                                <Button variant="destructive" onClick={handleClearData}>
                                    <Trash2 className="h-4 w-4 mr-2" /> {t('settings.clear_data')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

