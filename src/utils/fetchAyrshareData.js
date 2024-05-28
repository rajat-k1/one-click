// utils/fetchAyrshareData.js

async function fetchAyrshareData() {
    const response = await fetch('https://app.ayrshare.com/api/analytics/social', {
        method: 'POST', // Change to POST method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AYRSHARE_ACCESS_TOKEN}`,
          },
        body: JSON.stringify({
            'platforms': ['instagram', 'facebook'] // Add platforms array to the body
        })
    });
    const data = await response.json();
    return data;
}

export default fetchAyrshareData;