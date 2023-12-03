// Get the chart container
const chartContainer = document.querySelector('.chart');

// Function to load data synchronously using XMLHttpRequest
function fetchData() {
  const request = new XMLHttpRequest();
  request.open('GET', 'data.json', false); // Make the request synchronous
  request.send(null);

  if (request.status === 200) {
    return JSON.parse(request.responseText);
  } else {
    console.error('Error fetching data');
    return null;
  }
}

// Function to generate the chart based on the fetched data
function generateChart() {
  const data = fetchData();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });


  if (data) {
    data.forEach(item => {
      const { day, amount } = item;
    
      console.log(day);
      // Create elements
      const barWithLegend = document.createElement('div');
      barWithLegend.classList.add('bar-with-legend');

      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${2*amount}px`; // Set the height based on the amount

      const dayLabel = document.createElement('div');
      dayLabel.textContent = day;

      if (day.toLowerCase() === today.toLowerCase()) {
        bar.classList.add('c-cyan');
      }
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = `$${amount.toFixed(2)}`; // Display amount with a dollar sign

      // Append elements
      bar.appendChild(tooltip);
      barWithLegend.appendChild(bar);
      barWithLegend.appendChild(dayLabel);
      chartContainer.appendChild(barWithLegend);
    });
  }
}

// Call the function to generate the chart
generateChart();

