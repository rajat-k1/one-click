// src/components/Footer.js
import React from 'react';
import styles from '../styles/Footer.module.css'; // Ensure this path is correct

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftText}>
          <h4>Just a click</h4>
        </div>
        <div className={styles.centerText}>
          <a href="/contact">Contact Us</a>
        </div>
        <div className={styles.rightText}>
          <p>OneClick © 2024</p>
        </div>
      </div>
    </footer>
  );
}
