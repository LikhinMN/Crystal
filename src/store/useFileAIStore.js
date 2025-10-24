import { create } from "zustand";

export const useFileAIStore = create((set) => ({
    uploadedFile: null, // { url, fileId, name, size, type }
    progress: 0,
    isUploading: false,
    activeTransformation: null, // raw param string like "e-bgremove"
    transformedImageUrl: null,
    isTransforming: false,
    error: null,

    setUploadedFile: (file) => set({ uploadedFile: file }),
    setProgress: (p) => set({ progress: p }),
    setIsUploading: (v) => set({ isUploading: v }),
    setActiveTransformation: (t) => set({ activeTransformation: t }),
    setTransformedImageUrl: (u) => set({ transformedImageUrl: u }),
    setIsTransforming: (v) => set({ isTransforming: v }),
    setError: (e) => set({ error: e }),

    reset: () =>
        set({
            uploadedFile: null,
            progress: 0,
            isUploading: false,
            activeTransformation: null,
            transformedImageUrl: null,
            isTransforming: false,
            error: null,
        }),
}));

export default useFileAIStore;
