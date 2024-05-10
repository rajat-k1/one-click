// components/SidePane.js
import React from 'react';
import styles from '../../styles/SidePane.module.css'; // Assume you have CSS module setup

export default function SidePane() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/images/one-click-logo.png" alt="One-Click" /> {/* Replace with actual paths */}
            </div>
            <div className={styles.logo}>
                <img src="/images/facebook-logo.png" alt="Facebook" /> {/* Replace with actual paths */}
                <span>Disconnected</span>
            </div>
            <div className={styles.logo}>
                <img src="/images/instagram-logo.png" alt="Instagram" />
                <span>Connected</span>
            </div>
            <div className={styles.logo}>
                <img src="/images/twitter-logo.png" alt="Twitter" />
                <span>Disconnected</span>
            </div>
        </div>
    );
}
