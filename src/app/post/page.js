// src/app/post/page.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/PostPage.module.css';
import SidePane from '../../app/dashboard/SidePane'; // Import the SidePane component

export default function PostPage() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setIsUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        try {
          const response = await axios.post('/api/imgur/upload', { image: base64String });
          setImageUrl(response.data.link);
          setUploadStatus('Image uploaded successfully!');
        } catch (error) {
          console.error('Error uploading image:', error);
          setUploadStatus('Error uploading image.');
        } finally {
          setIsUploading(false);
        }
      };
    };
    fileInput.click();
  };

  const handlePost = async () => {
    if (!imageUrl) {
      console.error("No image URL available for posting.");
      return;
    }

    const payload = {
      post: caption,
      mediaUrls: [imageUrl], // Use the imageUrl state
      platforms: ['instagram', 'facebook', 'twitter']
    };

    console.log('Sending payload:', JSON.stringify(payload));

    try {
      const response = await fetch("https://app.ayrshare.com/api/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer S14K8TY-3H049ZA-MSHYMTH-0SN4DM5'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('POST request successful:', data);
    } catch (error) {
      console.error('Server Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <SidePane /> {/* Add the SidePane component */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>The Posting Page</h1>
        <div className={styles.postBox}>
          <div className={styles.iconFrame}>
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded" className={styles.uploadedImage} />
            ) : (
              <>
                <Image src="/images/post-icon.png" alt="Post Icon" width={50} height={50} />
                <p className={styles.uploadText}>Upload Media!</p>
              </>
            )}
          </div>
          <textarea
            className={styles.captionTextArea}
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.uploadButton} onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button className={styles.postButton} onClick={handlePost}>
              Post
            </button>
          </div>
          {uploadStatus && <p className={styles.uploadStatus}>{uploadStatus}</p>}
        </div>
        <div className={styles.footer}>
          <p className={styles.description}>Post to all your connected social media accounts with OneClick.</p>
        </div>
      </div>
    </div>
  );
}
