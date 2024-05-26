// src/app/dashboard/page.js
"use client";

import React from 'react';
import FollowersChart from './FollowersChart';
import NumberCounter from './NumberCounter';
import LineChart from './LineChart';
import CommentsChart from './CommentsChart';
import SavesChart from './SavesChart';
import SharesChart from './SharesChart';
import ViewsChart from './ViewsChart';
import SidePane from './SidePane';
import styles from '../../styles/Dashboard.module.css';

export default function DashboardPage() {
  const postData = [
    ['1', 200],
    ['2', 150],
    ['3', 300],
    ['4', 230]
  ];

  const postData1 = [
    ['1', 324],
    ['2', 33],
    ['3', 245],
    ['4', 23]
  ];

  const postData2 = [
    ['1', 23],
    ['2', 4],
    ['3', 1],
    ['4', 18]
  ];

  const postData3 = [
    ['1', 20],
    ['2', 13],
    ['3', 45],
    ['4', 70]
  ];

  const postData4 = [
    ['1', 200],
    ['2', 150],
    ['3', 300],
    ['4', 230]
  ];

  return (
    <div className={styles.dashboardContainer}>
      <SidePane />
      <div className={styles.mainContent}>
        <div className={styles.chartsGrid}>
          <div>
            <FollowersChart />
          </div>
          <div>
            <NumberCounter totalLikes={6982} />
          </div>
          <div>
            <LineChart data={postData} />
          </div>
          <div>
            <CommentsChart data={postData1} />
          </div>
          <div>
            <SavesChart data={postData2} />
          </div>
          <div>
            <SharesChart data={postData3} />
          </div>
          <div>
            <ViewsChart data={postData4} />
          </div>
        </div>
      </div>
    </div>
  );
}
