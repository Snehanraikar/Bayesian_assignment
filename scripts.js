document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
  
    if (searchBtn) { // Ensure the button element exists
      searchBtn.addEventListener('click', function () {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const cabin = document.getElementById('cabin').value;
  
        const requestData = {
          origin: origin,
          destination: destination,
          partnerPrograms: [
            'Air Canada',
            'United Airlines',
            'KLM',
            'Qantas',
            'American Airlines',
            'Etihad Airways',
            'Alaska Airlines',
            'Qatar Airways',
            'LifeMiles'
          ],
          stops: 2,
          departureTimeFrom: '2024-07-09T00:00:00Z',
          departureTimeTo: '2024-10-07T00:00:00Z',
          isOldData: false,
          limit: 302,
          offset: 0,
          cabinSelection: [cabin],
          date: new Date().toISOString()
        };
  
        // Make API request
        fetch('https://cardgpt.in/apitest', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
          },
          body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
          const resultsContainer = document.getElementById('resultsContainer');
          resultsContainer.innerHTML = ''; // Clear previous results
  
          data.data.forEach(item => {
            const partnerProgram = item.partner_program;
            const minBusinessMiles = item.min_business_miles || 'N/A';
            const minBusinessTax = item.min_business_tax || 'N/A';
            const minEconomyMiles = item.min_economy_miles || 'N/A';
            const minEconomyTax = item.min_economy_tax || 'N/A';
            const minFirstMiles = item.min_first_miles || 'N/A';
            const minFirstTax = item.min_first_tax || 'N/A';
  
            const boxHTML = `
              <div class="box">
                <img src="logo.jpg" alt="logo" style="width: 100px">
                <h3>${partnerProgram}</h3>
                <p>${origin} -> ${destination}</p>
                <p>2024-07-09 - 2024-10-07</p>
                <p class="price">${minBusinessMiles} <span>+ $${minBusinessTax}</span></p>
                <h6>Min Business Miles</h6>
                <p class="price">${minEconomyMiles} <span>+ $${minEconomyTax}</span></p>
                <h6>Min Economy Miles</h6>
                <p class="price">${minFirstMiles} <span>+ $${minFirstTax}</span></p>
                <h6>Min First Miles</h6>
              </div>
            `;
  
            resultsContainer.insertAdjacentHTML('beforeend', boxHTML);
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('An error occurred. Please try again later.');
        });
      });
    } else {
      console.error('Search button not found');
    }
  });
  