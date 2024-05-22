// src/app/post/page.js
"use client";

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/PostPage.module.css';
import SidePane from '../../app/dashboard/SidePane'; // Import the SidePane component
import SocialContext from '@/contexts/socialContext';


export default function PostPage() {
  const [caption, setCaption] = useState('');
  const [mediaUrl, setmediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const { connections, setConnections } = useContext(SocialContext);
  const [scheduleType, setScheduleType] = useState('once'); // 'once' or 'custom'
  const [scheduleTime, setScheduleTime] = useState(''); // For one-time schedule
  const [customSchedule, setCustomSchedule] = useState({
    days: [], // Array of days like ['Monday', 'Wednesday']
    time: '' // Time in UTC format
  });
  // console.log(connections);

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
        const base64String = reader.result.split(',')[1];
        const fileType = file.type;
        console.log(fileType.split('/'));
        // console.log('Base64Image: ',base64Image);
        try {
          const response = await fetch('/api/upload', {
  
            method: 'POST',
            
            body: JSON.stringify({ fileType, base64String }),
            
            });
          const data = await response.json();
          // console.log('Filename:', data.fileName);
          setmediaUrl(`https://oneclickcapstone.blob.core.windows.net/user-uploads/${data.fileName}`);
          setUploadStatus('Media uploaded successfully!');
        } catch (error) {
          console.error('Error uploading media:', error);
          setUploadStatus('Error uploading media.');
        } finally {
          setIsUploading(false);
        }
      };
    };
    fileInput.click();
  };



  const handlePost = async () => {
    
    const activePlatforms = Object.entries(connections)
    .filter(([key, value]) => value === true)
    .map(([key, value]) => key);

    // console.log(activePlatforms);
    if (!mediaUrl) {
      console.error("No image URL available for posting.");
      return;
    }
    const payload = {
      post: caption,
      mediaUrls: [mediaUrl], // Use the mediaUrl state
      platforms: activePlatforms
    };

    console.log('Sending payload:', JSON.stringify(payload));

    try {
      const AYRSHARE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_AYRSHARE_ACCESS_TOKEN;
      console.log(AYRSHARE_ACCESS_TOKEN);
      const response = await fetch("https://app.ayrshare.com/api/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AYRSHARE_ACCESS_TOKEN}`,
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


  const handleSchedule = async () => {
    
    const activePlatforms = Object.entries(connections)
    .filter(([key, value]) => value === true)
    .map(([key, value]) => key);

    // console.log(activePlatforms);
    if (!mediaUrl) {
      console.error("No image URL available for posting.");
      return;
    }
    const payload = {
      post: caption,
      mediaUrls: [mediaUrl], // Use the mediaUrl state
      platforms: activePlatforms
    };

    console.log('Sending payload:', JSON.stringify(payload));

    try {
      // const response = await fetch("https://app.ayrshare.com/api/post", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + process.env.AYRSHARE_ACCESS_TOKEN,
      //   },
      //   body: JSON.stringify(payload),
      // });

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
  // console.log(connections);
  return (
    <div className={styles.container}>
      <SidePane /> {/* Add the SidePane component */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>The Posting Page</h1>
        <div className={styles.postBox}>
          <div className={styles.iconFrame}>
            {mediaUrl ? (
              <img src={mediaUrl} alt="Uploaded" className={styles.uploadedImage} />
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
              {isUploading ? 'Uploading...' : 'Upload Media'}
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
