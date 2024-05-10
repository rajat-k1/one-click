// components/SharesChart.js
import React, { useEffect } from 'react';

const SharesChart = ({ data }) => {
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
            chartData.addColumn('number', 'Shares');

            chartData.addRows(data);

            const options = {
                title: 'Shares per Post',
                hAxis: { title: 'Post Number' },
                vAxis: { title: 'Shares' },
                chartType: 'AreaChart'
            };

            const chart = new window.google.visualization.AreaChart(document.getElementById('shares_chart'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();
    }, [data]);

    return <div id="shares_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default SharesChart;
