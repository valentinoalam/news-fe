interface ImageFile {
    id: string;
    url: string;
    file: File;
    name: string;
    alt: string;
}


import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Grip, Star, StarOff, Pencil, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
  
const ImageUploader: React.FC = () => {
const [images, setImages] = useState<ImageFile[]>([]);
const [featuredImageId, setFeaturedImageId] = useState<string | null>(null);
const [draggedItem, setDraggedItem] = useState<number | null>(null);
const [editingId, setEditingId] = useState<string | null>(null);
const [copiedId, setCopiedId] = useState<string | null>(null);

const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    setImages(prev => [...prev, {
        id: `${Date.now()}-${Math.random()}`,
        url: imageUrl,
        file: file,
        name: file.name,
        alt: file.name
    }]);
    });
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
};

const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (featuredImageId === id) {
    setFeaturedImageId(null);
    }
};

const handleEdit = (id: string, newAlt: string) => {
    setImages(prev => prev.map(img => 
    img.id === id ? { ...img, alt: newAlt } : img
    ));
    setEditingId(null);
};

const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(url);
    setTimeout(() => setCopiedId(null), 2000);
};

const toggleFeatured = (id: string) => {
    setFeaturedImageId(featuredImageId === id ? null : id);
};

return (
    <div className="w-full max-w-4xl">
        <div className="mb-6">
            <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="button"
            >
            <Upload size={20} />
            Upload Images
            </Button>
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
            />
        </div>
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
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow border border-gray-200"
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

                {/* Editable Alt Text */}
                {editingId === image.id ? (
                    <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => handleEdit(image.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        e.key === 'Enter' && handleEdit(image.id, e.currentTarget.value)
                    }
                    className="w-full px-2 py-1 border rounded mb-2"
                    autoFocus
                    />
                ) : (
                    <span className="flex-1 break-all hyphens-auto text-center text-wrap mb-2">{image.alt}</span>
                )}

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