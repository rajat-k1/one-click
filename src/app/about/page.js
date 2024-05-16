// src/app/about/page.js
import Image from 'next/image';
import styles from '../../styles/About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>About OneClick</h1>
        <p>Your ultimate tool for managing Instagram and other social media accounts efficiently.</p>
      </header>
      <section className={styles.team}>
        <h2>Team InfluInsights</h2>
        <div className={styles.teamMembers}>
          <div className={styles.member}>
            <Image src="/images/rajat-dp.png" alt="Rajat Shailendra Kulkarni" width={200} height={200} className={styles.avatar} />
            <h3>Rajat Shailendra Kulkarni</h3>
            <p>Co-Founder & Developer</p>
          </div>
          <div className={styles.member}>
            <Image src="/images/shaishav-dp.png" alt="Shaishav Tayde" width={200} height={200} className={styles.avatar} />
            <h3>Shaishav Tayde</h3>
            <p>Co-Founder & Designer</p>
          </div>
          <div className={styles.member}>
            <Image src="/images/aziz-dp.png" alt="Aziz Rangwala" width={200} height={200} className={styles.avatar} />
            <h3>Aziz Rangwala</h3>
            <p>Co-Founder & Developer</p>
          </div>
        </div>
      </section>
      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>At OneClick, our mission is to simplify social media management for influencers and brands, allowing them to focus on what they do best—creating amazing content.</p>
      </section>
      <section className={styles.values}>
        <h2>Our Values</h2>
        <ul>
          <li>Innovation: Continuously improving our platform to meet the evolving needs of our users.</li>
          <li>Efficiency: Helping users save time by providing powerful tools for managing multiple accounts.</li>
          <li>User-Centric Design: Prioritizing the needs and feedback of our users in every decision we make.</li>
        </ul>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2024 OneClick. All rights reserved.</p>
      </footer>
    </div>
  );
}
