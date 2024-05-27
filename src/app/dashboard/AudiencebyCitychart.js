// components/AudienceByCityChart.js
import React, { useEffect } from 'react';
import './ChartVisuals.css'; // Import the CSS file

const AudienceByCityChart = ({ data }) => {
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    console.log('Google Charts script loaded');
                    window.google.charts.load('current', { packages: ['corechart'] });
                    window.google.charts.setOnLoadCallback(drawChart);
                };
                document.body.appendChild(script);
            } else {
                window.google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            const topCities = Object.entries(data)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            console.log('Top Cities:', topCities); // Log to verify top cities data

            const chartData = new window.google.visualization.DataTable();
            chartData.addColumn('string', 'City');
            chartData.addColumn('number', 'Count');

            topCities.forEach(([city, count]) => {
                chartData.addRow([city, count]);
            });

            const options = {
                title: 'Top 5 Cities by Audience Count',
                hAxis: { title: 'City' },
                vAxis: { title: 'Count' },
                chartArea: { width: '50%' },
            };

            const chart = new window.google.visualization.ColumnChart(document.getElementById('audience_by_city_chart'));
            chart.draw(chartData, options);
            console.log('Chart drawn'); // Log to confirm chart drawing
        };

        loadGoogleCharts();
    }, [data]);

    return (
        <div>
            <div className="chart-title">Top 5 Cities by Audience Count</div>
            <div id="audience_by_city_chart" style={{ width: '40%', height: '100%' }}></div>
        </div>
    );
};

export default AudienceByCityChart;
