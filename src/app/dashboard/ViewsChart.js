// components/ViewsChart.js
import React, { useEffect } from 'react';

const ViewsChart = ({ data }) => {
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', { packages: ['table'] });
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
            chartData.addColumn('number', 'Views');

            chartData.addRows(data);

            const options = {
                title: 'Views per Post',
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            const chart = new window.google.visualization.Table(document.getElementById('views_chart'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();
    }, [data]);

    return <div id="views_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default ViewsChart;
