// components/NumberCounter.js
import React, { useEffect } from 'react';

const NumberCounter = ({ totalLikes }) => {
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', {packages: ['table']});
                    window.google.charts.setOnLoadCallback(drawChart);
                }
                document.body.appendChild(script);
            } else {
                window.google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            const data = new window.google.visualization.DataTable();
            data.addColumn('number', 'Total Likes');
            data.addRows([
                [totalLikes]
            ]);

            const options = {
                showRowNumber: false,
                width: '100%',
                height: '100%',
                fontSize: 40, // Increased font size
                bold: true, // Make the font bold
                allowHtml: true,
                cssClassNames: {
                    tableCell: 'number-counter-cell',
                }
            };

            const chart = new window.google.visualization.Table(document.getElementById('number_counter'));
            chart.draw(data, options);
        };

        loadGoogleCharts();
    }, [totalLikes]);

    return <div id="number_counter" style={{ width: 'auto', height: '500px' }}></div>;
}

export default NumberCounter;
