// src/app/dashboard/page.js
"use client";
import React, { useEffect, useState } from 'react';
import FollowersChart from './FollowersChart';
import NumberCounter from './NumberCounter';
import LineChart from './LineChart';
import CommentsChart from './CommentsChart';
import SavesChart from './SavesChart';
import SharesChart from './SharesChart';
import ViewsChart from './ViewsChart';
import SidePane from './SidePane';
import { SocialProvider } from '@/contexts/socialContext';
import KpiCard from './KpiCard';
import fetchAyrshareData from '../../utils/fetchAyrshareData';
import AudienceByCityChart from './AudiencebyCitychart';
import styles from '../../styles/Dashboard.module.css';

export default function DashboardPage() {
  // const postData = [
  //   ['1', 200],
  //   ['2', 150],
  //   ['3', 300],
  //   ['4', 230]
  // ];

  // const postData1 = {
  //   "Aj": 324,
  //   "scfd": 33,
  //   "dvrdf": 245,
  //   "gef": 23,
  //   "efe": 234
  // };

  // const postData2 = [
  //   ['1', 23],
  //   ['2', 4],
  //   ['3', 1],
  //   ['4', 18]
  // ];

  // const postData3 = [
  //   ['1', 20],
  //   ['2', 13],
  //   ['3', 45],
  //   ['4', 70]
  // ];

  // const postData4 = [
  //   ['1', 200],
  //   ['2', 150],
  //   ['3', 300],
  //   ['4', 230]
  // ];

  // const likeCount = [50];
  // const impressionsCount = [50];
  // const commentsCount = [50];
  // const reachCount = [50];

  
  // ---------------------------------------------------------------------
  // LOGIC TO GET THE DATA FROM JSON OUTPUT INTO FRONT END OF THE APP

  // ---------------------------------------------------------------------
  /* Instagram variables */
  const [likeCount, setLikeCount] = useState(null);
  const [impressionsCount, setImpressionsCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const [reachCount, setReachCount] = useState(null);
  const [audienceByCity, setAudienceByCity] = useState(null);

  /* Facebook variables */
  const [facebookpageImpressions, setfacebookpageImpressions] = useState(null);
  const [facebookpageFanAdds, setfacebookpageFanAdds] = useState(null);
  const [facebookpageFanRemoves, setfacebookpageFanRemoves] = useState(null);
  const [facebookpageImpressionsPaid, setfacebookpageImpressionsPaid] = useState(null);
  const [facebookreactions, setfacebookreactions] = useState(null);

  /* Twitter variables */
  const [twitterfollowersCount, settwitterfollowersCount] = useState(null);
  const [twitterfollowingCount, settwitterfollowingCount] = useState(null);
  const [twitterlistedCount, settwitterlistedCount] = useState(null);
  const [twittertweetCount, settwittertweetCount] = useState(null);

  /* YouTube variables */
  const [youtubeaverageViewDuration, setYoutubeVideoCount] = useState(null);
  const [youtubeaverageViewPercentage, setYoutubeViewCount] = useState(null);
  const [youtubelikes, setYoutubeLikeCount] = useState(null);
  const [youtubedislikes, setYoutubeCommentCount] = useState(null);
  const [youtubecomments, setyoutubecomments] = useState(null);
  const [youtubeshares, setyoutubeshares] = useState(null);
  const [youtubeviewCount, setyoutubeviewCount] = useState(null);
  const [youtubeviews, setyoutubeviews] = useState(null);

  useEffect(() => {
    const getData = async () => {
      //Get the dynamic data from the API!
      const apiData = await fetchAyrshareData();

      //Instagram Data
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

      //Facebook Data
      const facebookpageImpressions = apiData.facebook.analytics.pageImpressions;
      const facebookpageFanAdds = apiData.facebook.analytics.pageFanAdds;
      const facebookpageFanRemoves = apiData.facebook.analytics.pageFanRemoves;
      const facebookpageImpressionsPaid = apiData.facebook.analytics.pageImpressionsPaid;
      const facebookreactions = apiData.facebook.analytics.reactions;

      setfacebookpageImpressions(facebookpageImpressions);
      setfacebookpageFanAdds(facebookpageFanAdds);
      setfacebookpageFanRemoves(facebookpageFanRemoves);
      setfacebookpageImpressionsPaid(facebookpageImpressionsPaid);
      setfacebookreactions(facebookreactions);

      //Twitter Data
      const twitterfollowersCount = apiData.twitter.analytics.followersCount;
      const twitterfollowingCount = apiData.twitter.analytics.followingCount;
      const twitterlistedCount = apiData.twitter.analytics.listedCount;
      const twittertweetCount = apiData.twitter.analytics.tweetCount;

      settwitterfollowersCount(twitterfollowersCount);
      settwitterfollowingCount(twitterfollowingCount);
      settwitterlistedCount(twitterlistedCount);
      settwittertweetCount(twittertweetCount);

      //YouTube Data
      const youtubeaverageViewDuration = apiData.youtube.analytics.averageViewDuration;
      const youtubeaverageViewPercentage = apiData.youtube.analytics.averageViewPercentage;
      const youtubelikes = apiData.youtube.analytics.likes;
      const youtubedislikes = apiData.youtube.analytics.dislikes;
      const youtubecomments = apiData.youtube.analytics.comments;
      const youtubeshares = apiData.youtube.analytics.shares;
      const youtubeviewCount = apiData.youtube.analytics.viewCount;
      const youtubeviews = apiData.youtube.analytics.views;
      
      setYoutubeVideoCount(youtubeaverageViewDuration);
      setYoutubeViewCount(youtubeaverageViewPercentage);
      setYoutubeLikeCount(youtubelikes);
      setYoutubeCommentCount(youtubedislikes);
      setyoutubecomments(youtubecomments);
      setyoutubeshares(youtubeshares);
      setyoutubeviewCount(youtubeviewCount);
      setyoutubeviews(youtubeviews);
    };
    getData();
  }, []);

  if (likeCount === null || impressionsCount === null || commentsCount === null || reachCount === null) {
    return <p>Loading...</p>;
  }
  


  const platforms = [
    { name: 'Instagram', logo: '../images/instagram-logo.png' },
    { name: 'Facebook', logo: '../images/facebook-logo.png' },
    { name: 'Twitter', logo: '../images/twitter-logo.png' },
    { name: 'YouTube', logo: '../images/youtube-logo.png' },
  ];


  return (
    <div className={styles.dashboardContainer}>
      <SidePane />
      <div className={styles.mainContent}>
        
        {/* Instagram Section */}
        <div className={styles.kpiContainer}>
          <div className={styles.columnTitle}>
            <img 
              src="../images/instagram-logo.png" 
              alt="Instagram Logo" 
              className={styles.platformLogo} 
            />
            <span>Instagram</span>
          </div>
          <div className={styles.kpiContent}>
            <div className={styles.kpiGrid}>
              <KpiCard title="Like Count" value={likeCount} />
              <KpiCard title="Comment Count" value={commentsCount} />
              <KpiCard title="Impression Count" value={impressionsCount} />
              <KpiCard title="Reach Count" value={reachCount} />
            </div>
            <div className={styles.audienceChartContainer}>
              <AudienceByCityChart data={audienceByCity} />
            </div>
          </div>
        </div>
        
        {/* Facebook Section */}
        <div className={styles.kpiContainer}>
          <div className={styles.columnTitle}>
            <img 
              src="../images/facebook-logo.png" 
              alt="Facebook Logo" 
              className={styles.platformLogo} 
            />
            <span>Facebook</span>
          </div>
          <div className={styles.kpiContent}>
            <div className={styles.kpiGrid}>
              <KpiCard title="Page Impressions" value={facebookpageImpressions} />
              <KpiCard title="Page Fan Ads" value={facebookpageFanAdds} />
              <KpiCard title="Page Fan Removes" value={facebookpageFanRemoves} />
              <KpiCard title="Page Impressions Paid" value={facebookpageImpressionsPaid} />
            </div>
            <div className={styles.audienceChartContainer}>
              {/* <AudienceByCityChart data={facebookreactions} /> */}
            </div>
          </div>
        </div>
        
        {/* Twitter Section */}
        <div className={styles.kpiContainer}>
          <div className={styles.columnTitle}>
            <img 
              src="../images/twitter-logo.png" 
              alt="Twitter Logo" 
              className={styles.platformLogo} 
            />
            <span>X</span>
          </div>
          <div className={styles.kpiContent}>
            <div className={styles.kpiGrid}>
              <KpiCard title="Follower Count" value={twitterfollowersCount} />
              <KpiCard title="Following Count" value={twitterfollowingCount} />
              <KpiCard title="Listed Count" value={twitterlistedCount} />
              <KpiCard title="Tweet Count" value={twittertweetCount} />
            </div>
            <div className={styles.audienceChartContainer}>
              {/* <AudienceByCityChart data={twitterAudienceByCity} /> */}
            </div>
          </div>
        </div>
        
        {/* YouTube Section */}
        <div className={styles.kpiContainer}>
          <div className={styles.columnTitle}>
            <img 
              src="../images/youtube-logo.png" 
              alt="YouTube Logo" 
              className={styles.platformLogo} 
            />
            <span>YouTube</span>
          </div>
          <div className={styles.kpiContent}>
            <div className={styles.kpiGrid}>
              <KpiCard title="Avg view duration" value={youtubeaverageViewDuration} />
              <KpiCard title="Avg view %" value={youtubeaverageViewPercentage} />
              <KpiCard title="Likes" value={youtubelikes} />
              <KpiCard title="Dislikes" value={youtubedislikes} />
              <KpiCard title="Comments" value={youtubecomments} />
              <KpiCard title="Shares" value={youtubeshares} />
              <KpiCard title="View Count" value={youtubeviewCount} />
              <KpiCard title="Views" value={youtubeviews} />
            </div>
            <div className={styles.audienceChartContainer}>
              {/* <AudienceByCityChart data={youtubeAudienceByCity} /> */}
            </div>
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
