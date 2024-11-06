interface ImageFile {
    id: string;
    url: string;
    file: File;
    name: string;
    alt: string;
    caption: string;
    isDirty?: boolean;
}

interface SaveChangeResponse {
    success: boolean;
    message?: string;
}
import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Grip, Star, StarOff, Pencil, Copy, Check, Save, AlertCircle } from 'lucide-react';

import Image from 'next/image';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
  
const ImageUploader: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [featuredImageId, setFeaturedImageId] = useState<string | null>(null);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
    
        const fileArray = Array.from(files);
        
        fileArray.forEach(file => {
          const imageUrl = URL.createObjectURL(file);
          setImages(prev => [...prev, {
            id: `${Date.now()}-${Math.random()}`,
            url: imageUrl,
            file: file,
            name: file.name,
            alt: file.name,
            caption: '',
            isDirty: true
          }]);
        });
        setHasUnsavedChanges(true);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(index);
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
        setDraggedItem(null);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();
        
        if (draggedItem === null) return;
        
        const newImages = [...images];
        const draggedImage = newImages[draggedItem];
        
        // Remove dragged item
        newImages.splice(draggedItem, 1);
        // Insert at new position
        newImages.splice(dropIndex, 0, draggedImage);
        
        setImages(newImages);
        setHasUnsavedChanges(true);
    };

    const handleDelete = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
        if (featuredImageId === id) {
          setFeaturedImageId(null);
        }
        setHasUnsavedChanges(true);
    };

    const handleInputChange = (
        id: string, 
        field: 'alt' | 'caption', 
        value: string
    ) => {
        setImages(prev => prev.map(img => 
          img.id === id 
            ? { ...img, [field]: value, isDirty: true } 
            : img
        ));
        setHasUnsavedChanges(true);
    };

    // const handleEdit = (id: string, newAlt: string) => {
    //     setImages(prev => prev.map(img => 
    //     img.id === id ? { ...img, alt: newAlt } : img
    //     ));
    //     setEditingId(null);
    // };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(url);
        setTimeout(() => setCopiedId(null), 2000);
      };
    
    const toggleFeatured = (id: string) => {
        setFeaturedImageId(featuredImageId === id ? null : id);
        setHasUnsavedChanges(true);
    };
    
    // Mock API call - replace with your actual API call
    const saveChanges = async (): Promise<SaveChangeResponse> => {
        // Simulate API call
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, message: 'Changes saved successfully' });
          }, 1000);
        });
    };
    
    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveMessage(null);
        
        try {
          // Here you would typically send all changes to your backend:
          // 1. New order of images
          // 2. Featured image
          // 3. Updated alt texts and captions
          const result = await saveChanges();
          
          if (result.success) {
            setImages(prev => prev.map(img => ({ ...img, isDirty: false })));
            setHasUnsavedChanges(false);
            setSaveMessage({ type: 'success', text: result.message || 'Changes saved successfully' });
          } else {
            setSaveMessage({ type: 'error', text: result.message || 'Failed to save changes' });
          }
        } catch (error) {
            console.error('Registration error:', error);
            setSaveMessage({ type: 'error', text: 'An error occurred while saving' });
            throw error;
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="mb-6 flex justify-between items-center">
                <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    type="button"
                >
                    <Upload size={20} />
                    Upload Images
                </Button>
                {hasUnsavedChanges && (
                <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${
                    isSaving 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                    type="button"
                >
                    <Save size={20} />
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                />
            </div>
            {saveMessage && (
                <div className={`mb-4 p-3 rounded ${
                saveMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                <div className="flex items-center gap-2">
                    {saveMessage.type === 'success' ? (
                    <Check size={20} />
                    ) : (
                    <AlertCircle size={20} />
                    )}
                    {saveMessage.text}
                </div>
                </div>
            )}
            {images.length > 0 && 
            <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`flex flex-col items-center p-2 bg-white rounded-lg shadow border ${
                            image.isDirty ? 'border-yellow-300' : 'border-gray-200'
                        }`}
                    >
                        {/* Drag Handle */}
                        <div className="cursor-move self-start mb-2">
                            <Grip className="text-gray-400" size={20} />
                        </div>

                        {/* Image */}
                        <div className="relative w-32 h-32 mb-4">
                            <Image
                            src={image.url}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                            />
                        </div>

                        <div className="space-y-2 px-1">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Alt Text</label>
                                {/* Editable Alt Text */}
                                {editingId === image.id ? (
                                    <input
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => handleInputChange(image.id, 'alt', e.target.value)}
                                    onBlur={() => setEditingId(null)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                        e.key === 'Enter' && handleInputChange(image.id, 'alt', e.currentTarget.value)
                                    }
                                    className="w-full px-2 py-1 border rounded mb-2"
                                    autoFocus
                                    />
                                ) : (
                                    <p className="flex-1 px-1 text-sm break-all leading-none hyphens-auto text-start text-wrap mb-2">{image.alt}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Caption</label>
                                <textarea
                                    value={image.caption}
                                    onChange={(e) => handleInputChange(image.id, 'caption', e.target.value)}
                                    className="mt-1 text-sm w-full px-2 py-1 border rounded"
                                    rows={2}
                                    placeholder="Image caption..."
                                />
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between w-full gap-2">
                            <button
                                onClick={() => toggleFeatured(image.id)}
                                className="p-1 hover:bg-gray-100 rounded"
                                title={featuredImageId === image.id ? "Remove featured" : "Set as featured"}
                                type="button"
                            >
                            {featuredImageId === image.id ? (
                                <Star className="text-yellow-500" size={20} />
                            ) : (
                                <StarOff className="text-gray-400" size={20} />
                            )}
                            </button>

                            <button
                                onClick={() => setEditingId(image.id)}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Edit alt text"
                                type="button"
                            >
                                <Pencil className="text-gray-400" size={20} />
                            </button>

                            <button
                                onClick={() => copyUrl(image.url)}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Copy URL"
                                type="button"
                            >
                                {copiedId === image.url ? (
                                    <Check className="text-green-500" size={20} />
                                ) : (
                                    <Copy className="text-gray-400" size={20} />
                                )}
                            </button>

                            <button
                                onClick={() => handleDelete(image.id)}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Delete"
                                type="button"
                                >
                                <X className="text-red-400" size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </Card>
            }
        </div>
    );
};

export default ImageUploader;