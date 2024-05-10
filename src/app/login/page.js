"use client";
import styles from '../../styles/Login.module.css'; // Ensure this path is correct
import Image from 'next/image';

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Image src="/images/one-click-logo.png" alt="One-Click Logo" width={200} height={200} />
            </div>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Sign In</h1>
                <button className={styles.socialButton} onClick={() => window.location.href="/api/auth/login"}>
                    <Image src="/images/google-icon.png" alt="Sign in with Google" width={30} height={30} />
                    Sign in with Google
                </button>
                <button className={styles.socialButton}>
                    <Image src="/images/apple-icon.png" alt="Sign in with Apple" width={30} height={30} />
                    Sign in with Apple
                </button>
                <div className={styles.or}>OR</div>
                <input type="email" placeholder="Email" className={styles.inputField} />
                <input type="password" placeholder="Password" className={styles.inputField} />
                <div className={styles.forgotPassword}>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
                <button className={styles.button}>Sign In</button>
                <p className={styles.footerText}>Not a Member yet? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
}
