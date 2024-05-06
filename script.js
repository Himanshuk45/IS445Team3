document.getElementById('refreshButton').addEventListener('click', fetchData);

function fetchData() {
    fetch('https://water.weather.gov/resources/tmp/long_range_river_flood_risk_data.csv')
    .then(response => response.text())
    .then(data => {
        // Parse and process the CSV data
        // For simplicity, let's just display the raw data
        document.getElementById('dataContainer').innerText = data;
    })
    .catch(error => console.error('Error fetching data:', error));
}
