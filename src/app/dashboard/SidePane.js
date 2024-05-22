"use client"; // This directive ensures the component is treated as a client component

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct import for the app directory
import styles from '../../styles/SidePane.module.css'; // Ensure this path is correct
import SocialContext from '@/contexts/socialContext';



export default function SidePane() {
    const { connections, setConnections } = useContext(SocialContext);

    const router = useRouter();

    const toggleConnection = (platform) => {

        setConnections(prevState => ({
            ...prevState,
            [platform]: !prevState[platform]
        }));
        
    };

    const handleCreatePost = () => {
        router.push('/post');
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoLarge}>
                <img src="/images/one-click-logo.png" alt="One-Click" />
            </div>
            <p className={styles.connectText}>Connect your Socials!</p>
            <div className={styles.logo} onClick={() => toggleConnection('facebook')}>
                <img
                    src="/images/facebook-logo.png"
                    alt="Facebook"
                    className={connections.facebook ? styles.connected : styles.disconnected}
                />
            </div>
            <div className={styles.logo} onClick={() => toggleConnection('instagram')}>
                <img
                    src="/images/instagram-logo.png"
                    alt="Instagram"
                    className={connections.instagram ? styles.connected : styles.disconnected}
                />
            </div>
            <div className={styles.logo} onClick={() => toggleConnection('twitter')}>
                <img
                    src="/images/twitter-logo.png"
                    alt="Twitter"
                    className={connections.twitter ? styles.connected : styles.disconnected}
                />
            </div>
            <div className={styles.logo} onClick={() => toggleConnection('linkedin')}>
                <img
                    src="/images/linkedin-logo.png"
                    alt="LinkedIn"
                    className={connections.linkedin ? styles.connected : styles.disconnected}
                />
            </div>
            <button className={styles.createPostButton} onClick={handleCreatePost}>
                Create Post
            </button>
        </div>
    );
}
