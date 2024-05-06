function init() {
    // URL of the CORS proxy service
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // URL of the CSV file
    const csvUrl = 'https://water.weather.gov/resources/tmp/long_range_river_flood_risk_data.csv';

    // Fetch the CSV file via the CORS proxy
    fetch(corsProxyUrl + csvUrl)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch CSV file');
            }
            return response.text();
        })
        .then(csvData => {
            // Parse the CSV data
            const rows = csvData.split('\n');
            const headers = rows[0].split(',');
            const columnIndex = headers.indexOf('minor');
            const columnData = [];

            // Extract the 'minor' column data
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].split(',');
                const value = parseFloat(row[columnIndex]);
                if (!isNaN(value)) {
                    columnData.push(value);
                }
            }

            // Plot the histogram using Chart.js
            const ctx = document.getElementById('histogram').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Array.from({ length: columnData.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Minor',
                        data: columnData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: { title: { display: true, text: 'Index' } },
                        y: { title: { display: true, text: 'Value' } }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV file:', error);
        });
}

// Call the init function after DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
