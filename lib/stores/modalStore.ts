
"use client";

import { create } from 'zustand';
import { ReactNode } from 'react';

export type DeepDiveType = 'science' | 'technology' | 'methodology' | 'interactive';

export interface DeepDiveData {
    id: string;
    type: DeepDiveType;
    title: string;
    subtitle?: string;
    description: string;
    scientificBasis?: string; // The "Science" explanation
    technicalDetail?: string; // The "Tech" explanation
    visualComponent?: ReactNode; // A custom component to render
    stats?: { label: string; value: string }[];
    ctaText?: string;
    ctaAction?: () => void;
}

interface ModalStore {
    isOpen: boolean;
    content: DeepDiveData | null;
    openModal: (content: DeepDiveData) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    content: null,
    openModal: (content) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
}));
