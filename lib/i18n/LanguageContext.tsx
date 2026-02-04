"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language, TranslationKeys } from './translations'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguage(savedLang)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: TranslationKeys): string => {
        const keys = key.split('.')
        let current: any = translations[language]

        for (const k of keys) {
            if (current[k] === undefined) {
                console.warn(`Translation missing for key: ${key} in language: ${language}`)
                return key
            }
            current = current[k]
        }

        return current as string
    }

    // Always render the provider. 
    // If specific components need to wait for client-side storage sync to avoid flash,
    // they can check a 'isLoaded' flag in context strings or handle it locally, 
    // but the Provider must exist to prevent crashes.

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {/* 
              Optional: To prevent hydration mismatch on text content if language differs, 
              we could render nothing until mounted, but that hurts SEO/LCP. 
              Since default is 'en', we render 'en'. Use effectively.
              To avoid "Text content does not match" errors, we can use 'mounted' 
              to delay rendering conditional text if needed, but for now we prioritize not crashing.
            */}
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
