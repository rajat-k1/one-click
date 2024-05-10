// components/LineChart.js
import React, { useEffect } from 'react';

const LineChart = ({ data }) => {
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
            chartData.addColumn('number', 'Likes');

            // Add data to the chart
            chartData.addRows(data);

            const options = {
                title: 'Likes per Post',
                hAxis: { title: 'Post Number' },
                vAxis: { title: 'Likes' },
                legend: 'none'
            };

            const chart = new window.google.visualization.LineChart(document.getElementById('line_chart'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();
    }, [data]);

    return <div id="line_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default LineChart;
