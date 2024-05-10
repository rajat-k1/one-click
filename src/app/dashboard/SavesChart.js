// components/SavesChart.js
import React, { useEffect } from 'react';

const SavesChart = ({ data }) => {
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', { packages: ['corechart'] });
                    window.google.charts.setOnLoadCallback(drawChart);
                }
                document.body.appendChild(script);
            } else {
                window.google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            const chartData = new window.google.visualization.DataTable();
            chartData.addColumn('string', 'Post Number');
            chartData.addColumn('number', 'Saves');

            chartData.addRows(data);

            const options = {
                title: 'Saves per Post',
                pieHole: 0.4,
                chartType: 'PieChart'
            };

            const chart = new window.google.visualization.PieChart(document.getElementById('saves_chart'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();
    }, [data]);

    return <div id="saves_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default SavesChart;
