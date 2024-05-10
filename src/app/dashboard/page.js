"use client";
// src/app/dashboard/page.js
import FollowersChart from './FollowersChart';
import NumberCounter from './NumberCounter';
import LineChart from './LineChart';
import CommentsChart from './CommentsChart'; // New component
import SavesChart from './SavesChart';       // New component
import SharesChart from './SharesChart';     // New component
import ViewsChart from './ViewsChart';       // New component
import SidePane from './SidePane';

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
    <div style={{ display: 'grid', gridTemplateColumns: '250px auto', height: '100vh' }}>
    <SidePane />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
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
  );
}
