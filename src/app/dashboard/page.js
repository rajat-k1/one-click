"use client";
// src/app/dashboard/page.js
import React, { useEffect, useState } from 'react';
import FollowersChart from './FollowersChart';
import NumberCounter from './NumberCounter';
import LineChart from './LineChart';
import CommentsChart from './CommentsChart'; // New component
import SavesChart from './SavesChart';       // New component
import SharesChart from './SharesChart';     // New component
import ViewsChart from './ViewsChart';       // New component
import SidePane from './SidePane';
import { SocialProvider } from '@/contexts/socialContext';
import KpiCard from './KpiCard';
import fetchAyrshareData from '../../utils/fetchAyrshareData';
import './Dashboard.module.css'
import AudienceByCityChart from './AudiencebyCitychart';

export default function DashboardPage() {
  const postData = [
    ['1', 200],
    ['2', 150],
    ['3', 300],
    ['4', 230]
  ];

const postData1 = {
    "Aj": 324,
    "scfd": 33,
    "dvrdf": 245,
    "gef": 23,
    "efe": 234
};

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

  const likeCount = [50]
  const impressionsCount = [50]
  const commentsCount = [50]
  const reachCount = [50]



 /*   
 ---------------------------------------------------------------------
 LOGIC TO GET THE DATA FROM JSON OUTPUT INTO FRONT END OF THE APP

 ---------------------------------------------------------------------
  const [likeCount, setLikeCount] = useState(null);
  const [impressionsCount, setImpressionsCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const [reachCount, setReachCount] = useState(null);

  useEffect(() => {
      const getData = async () => {
          const apiData = await fetchAyrshareData();
          const likeCount = apiData.instagram.analytics.likeCount;
          const impressionsCount = apiData.instagram.analytics.impressionsCount;
          const commentsCount = apiData.instagram.analytics.commentsCount;
          const reachCount = apiData.instagram.analytics.reachCount;
          const audienceByCity = apiData.instagram.analytics.audienceCity;


          setLikeCount(likeCount);
          setImpressionsCount(impressionsCount);
          setCommentsCount(commentsCount);
          setReachCount(reachCount);
          setAudienceByCity(audienceByCity);
      };
      getData();
  }, []);

  if (likeCount === null || impressionsCount === null || commentsCount === null || reachCount === null) {
      return <p>Loading...</p>;
  }

  */
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px auto', height: '100vh' }}>
      <SidePane />
      <div className="dashboard-container">
        <div className="column">
          <div className="column-title">
            <img src='../../p' alt="Instagram Logo" />
            <span>Instagram</span>
          </div>
          <div className="kpi-card-container">
            <KpiCard title="Like Count" value={likeCount} />
            <KpiCard title="Comment Count" value={commentsCount} />
            <KpiCard title="Impression Count" value={impressionsCount} />
            <KpiCard title="Reach Count" value={reachCount} />
          </div>
          <div>
          <AudienceByCityChart data={postData1} />
        </div>
        </div>
      </div>
    </div>
  );
}

/*
<div>
          <FollowersChart />
        </div>
        <div>
          <NumberCounter totalLikes={6982} />
        </div>
        <div>
          <LineChart data={postData} />
        <div>
          <CommentsChart data={postData1} />
        </div>
          <SavesChart data={postData2} />
        </div>
        <div>
          <SharesChart data={postData3} />
        </div>
        <div>
          <ViewsChart data={postData4} />
        </div>
*/