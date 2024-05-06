document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('refreshButton').addEventListener('click', fetchDataAndDrawChart);
    fetchDataAndDrawChart(); // Fetch data and draw chart initially
});

function fetchDataAndDrawChart() {
    fetch('https://water.weather.gov/resources/tmp/long_range_river_flood_risk_data.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const lines = data.split('\n');
            const labels = lines[0].split(',').slice(1);
            const datasets = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').slice(1).map(parseFloat);
                const dataset = {
                    label: lines[i].split(',')[0],
                    data: values,
                    borderColor: getRandomColor(),
                    fill: false
                };
                datasets.push(dataset);
            }
            // Draw chart
            drawChart(labels, datasets);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
}

function drawChart(labels, datasets) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart !== undefined) {
        window.myChart.destroy(); // Destroy the previous chart instance
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            title: {
                display: true,
                text: 'Flood Risk Levels Over Time'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Places'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Risk Level'
                    }
                }]
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
