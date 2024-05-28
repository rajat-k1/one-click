"use client"; // This directive ensures the component is treated as a client component

import React, { useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Use the correct import for the app directory
import styles from '../../styles/SidePane.module.css'; // Ensure this path is correct
import SocialContext from '@/contexts/socialContext';
import useAppStore from '@/stores/appstore';



export default function SidePane() {
    // const { connections, setConnections } = useContext(SocialContext);
    const {darkMode, setMode, mediaUrl, setmediaUrl, connections, setConnections } = useAppStore();

    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname

    const toggleConnection = (platform) => {
        const conn = {
            ...connections,
            [platform]: !connections[platform]
        }
        setConnections(conn);
        
    };

    const handleCreatePost = () => {
        const conn = {
            facebook: false,
            instagram: false,
            twitter: false,
            linkedin: false,
        }
        setConnections(conn)
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
            <div className={styles.logo} onClick={() => toggleConnection('youtube')}>
                <img
                    src="/images/youtube-logo.png"
                    alt="YouTube"
                    className={connections.youtube ? styles.connected : styles.disconnected}
                />
            </div>
            {pathname !== '/post' && (
                <button className={styles.createPostButton} onClick={handleCreatePost}>
                    Create Post
                </button>
            )}
        </div>
    );
}
