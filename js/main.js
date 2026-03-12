document.addEventListener('DOMContentLoaded', () => {
    const chartMap = {
        'vbar': drawBarVertical,
        'hbar': drawBarHorizontal,
        'pie': drawPie,
        'line': drawLine,
        'scatter': drawScatter,
        'heatmap': drawHeatmap,
        'map': drawMap,
        'map-thai': drawMapThai,
        'map-thai-provinces': drawMapThaiProvinces,
        'candle': drawCandlestick
    };

    const navLinks = document.querySelectorAll('.nav-link');
    const chartTitle = document.getElementById('chart-title');
    const chartContainerId = 'chart-container';
    const codeDisplay = document.getElementById('code-display');
    const adviceDisplay = document.getElementById('advice-display');

    function loadChart(chartId) {
        const drawFunc = chartMap[chartId];
        if (drawFunc) {
            drawFunc(chartContainerId);
            updateInfo(chartId);
        }
    }

    function updateInfo(chartId) {
        const info = {
            'vbar': {
                title: 'Vertical Bar Chart',
                advice: 'Best for comparing categorical data across different groups. Use tooltips for precise values.',
                file: 'js/charts/bar-vertical.js'
            },
            'hbar': {
                title: 'Horizontal Bar Chart',
                advice: 'Useful when you have long category names that would overlap on the X-axis.',
                file: 'js/charts/bar-horizontal.js'
            },
            'pie': {
                title: 'Pie Chart',
                advice: 'Use sparingly. Only good for showing parts of a whole (up to 5-6 categories).',
                file: 'js/charts/pie.js'
            },
            'line': {
                title: 'Line Chart',
                advice: 'Excellent for showing trends over time or continuous intervals.',
                file: 'js/charts/line.js'
            },
            'scatter': {
                title: 'Scatter Plot',
                advice: 'Perfect for showing correlation between two continuous variables.',
                file: 'js/charts/scatter.js'
            },
            'heatmap': {
                title: 'Heatmap',
                advice: 'Visualize intensity across two categorical dimensions.',
                file: 'js/charts/heatmap.js'
            },
            'map': {
                title: 'World Map',
                advice: 'Geographical visualization using GeoJSON and Mercator projection.',
                file: 'js/charts/map.js'
            },
            'map-thai': {
                title: 'Map of Thailand',
                advice: 'A simple D3.js map of Thailand, showing the national outline. Useful for general geographical context.',
                file: 'js/charts/map-thai.js'
            },
            'map-thai-provinces': {
                title: 'Map of Thailand by Province (Thematic)',
                advice: 'Visualizes data across Thailand\'s provinces, with each province colored based on a sample numerical value. Adapt `provinceData` for your own datasets.',
                file: 'js/charts/map-thai-provinces.js'
            },
            'candle': {
                title: 'Candlestick Chart',
                advice: 'Standard for financial data showing Open, High, Low, and Close values.',
                file: 'js/charts/candlestick.js'
            }
        };

        const current = info[chartId];
        chartTitle.innerText = current.title;
        adviceDisplay.innerText = current.advice;

        // Fetch and display code
        fetch(current.file)
            .then(res => res.text())
            .then(code => {
                codeDisplay.textContent = code;
            });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const chartId = link.getAttribute('data-chart');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            loadChart(chartId);
        });
    });

    // Default chart
    loadChart('vbar');
});
