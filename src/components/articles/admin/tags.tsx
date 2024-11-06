import React, { useState } from 'react'

export default function Tags({ tagsData, onChange }: { tagsData?: string[] | null, onChange?: (value: string[]) => void }) {
    const [tags, setTags] = useState(tagsData || []);

    // Function to add tags
    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const newTag = event.currentTarget.value.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags((prevTags) => [...prevTags, newTag]);
            onChange?.([...tags, newTag]); // Update form value
            //form.setValue('tags', [...tags, newTag]); 
        }
        event.currentTarget.value = ''; // Clear input
        }
    };

    // Function to remove tags
    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
        onChange?.(updatedTags); // Update form value
    };
    return (
        <div className="border rounded px-2 py-1 flex items-center flex-wrap">
            {tags.map((tag, index) => (
                <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 flex items-center"
                >
                {tag}
                <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-500"
                >
                    &times;
                </button>
                </span>
            ))}
            <input
                type="text"
                placeholder="Add a tag"
                onKeyDown={handleAddTag}
                className="border-none focus:outline-none focus:ring-0 px-2"
            />
        </div>
    )
}
