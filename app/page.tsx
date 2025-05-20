'use client';

import { useEffect, useState } from 'react';
import TopiForm from './components/TopiForm';
import { getAllTopiStories, formatStoryRecords } from '@/lib/pocketbaseService';

interface Story {
  id: string;
  name: string;
  intro: string;
  imageUrl: string;
  created: string;
}

export default function Page() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      const records = await getAllTopiStories();
      const formatted = formatStoryRecords(records);
      setStories(formatted);
      setLoading(false);
    }

    fetchStories();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1E90FF' }}>TopiLore 📖</h1>


      <p style={{ color: '#ffffff' }}>
  Submit your Topi’s story below to join the community lorebook.
</p>

      </div>

      <TopiForm />

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Community Stories</h2>

        {loading ? (
          <p>Loading stories...</p>
        ) : stories.length === 0 ? (
          <p>No stories yet. Be the first to write one!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stories.map((story) => (
            <li
            key={story.id}
            style={{
              marginBottom: '2rem',
              padding: '1rem',
              border: '1px solid #b3d4fc',
              borderRadius: '10px',
              backgroundColor: '#e8f4fd', // soft light blue
            }}
          >
          
               {story.imageUrl && (
  <img
    src={story.imageUrl}
    alt={story.name}
    style={{
      width: '100%',
      height: 'auto',
      maxHeight: '180px',
      objectFit: 'contain',
      borderRadius: '8px',
      marginBottom: '1rem',
      backgroundColor: '#fff',
    }}
  />
)}

<strong
  style={{
    fontSize: '1.4rem',
    color: '#111',
    fontWeight: '700',
    display: 'block',
    marginBottom: '0.5rem',
  }}
>
  {story.name}
</strong>


<p
  style={{
    marginTop: '0.25rem',
    fontSize: '1.1rem',
    color: '#222',
    lineHeight: '1.6',
    whiteSpace: 'pre-line',
  }}
>
  {story.intro}
</p>

<p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
  Submitted on {new Date(story.created).toLocaleDateString()}
</p>

              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
