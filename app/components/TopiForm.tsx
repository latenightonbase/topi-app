'use client';

import { submitTopiStory } from '@/lib/pocketbaseService';




import { useState } from 'react';

export default function TopiForm({ onSuccess }: { onSuccess?: () => void }) {

  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!name || !intro || !image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
  
    try {
      await submitTopiStory({ name, intro, image });
      alert('Topi story submitted successfully!');
      setName('');
      setIntro('');
      setImage(null);
    } catch (error) {
      alert('There was an error submitting your story.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <input
        type="text"
        placeholder="Topi Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          display: 'block',
          marginBottom: '1rem',
          padding: '0.75rem',
          width: '100%',
          backgroundColor: '#fff',
          color: '#111',
          fontWeight: '600',
          

          fontSize: '16px',
          border: '2px solid #ccc',
          borderRadius: '6px',
        }}
      />
      <textarea
        placeholder="Topi Intro"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        required
        style={{
          display: 'block',
          marginBottom: '1rem',
          padding: '0.75rem',
          width: '100%',
          backgroundColor: '#fff',
          color: '#111',
fontWeight: '600',

          fontSize: '16px',
          border: '2px solid #ccc',
          borderRadius: '6px',
          minHeight: '100px',
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(file);
        }}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button
        type="submit"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'blue',
          color: 'white',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
        }}
      >
        Submit Topi
      </button>
    </form>
  );
}
