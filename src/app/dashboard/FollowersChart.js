// src/app/dashboard/FollowersChart.js
import React, { useEffect } from 'react';

const FollowersChart = () => {
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', {'packages':['corechart', 'bar']});
                    window.google.charts.setOnLoadCallback(drawChart);
                }
                document.body.appendChild(script);
            } else {
                window.google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            const data = new window.google.visualization.DataTable();
            data.addColumn('string', 'Day');
            data.addColumn('number', 'Followers Gained');

            // Replace this with your actual data
            data.addRows([
                ['2024-04-01', 20],
                ['2024-04-02', 40],
                ['2024-04-03', 50],
                ['2024-04-04', 30],
                ['2024-04-05', 80]
            ]);

            const options = {
                title: 'Daily Followers Gained',
                hAxis: {title: 'Day',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0},
                chartArea: {width: '50%', height: '70%'}
            };

            const chart = new window.google.visualization.BarChart(document.getElementById('followers_chart'));
            chart.draw(data, options);
        };

        loadGoogleCharts();
    }, []);

    return <div id="followers_chart" style={{width: '100%', height: '500px'}}></div>;
}

export default FollowersChart;