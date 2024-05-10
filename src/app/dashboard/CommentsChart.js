// components/CommentsChart.js
import React, { useEffect } from 'react';

const CommentsChart = ({ data }) => {
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
            chartData.addColumn('number', 'Comments');

            chartData.addRows(data);

            const options = {
                title: 'Comments per Post',
                legend: 'none',
                hAxis: { title: 'Post Number' },
                vAxis: { title: 'Comments' },
                chartType: 'ColumnChart'
            };

            const chart = new window.google.visualization.ColumnChart(document.getElementById('comments_chart'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();
    }, [data]);

    return <div id="comments_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default CommentsChart;
