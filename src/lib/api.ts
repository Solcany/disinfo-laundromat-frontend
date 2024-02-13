export async function apiTest() {
    //event.preventDefault();

    const formData = {
      url: "https://www.breitbart.com/politics/2024/02/12/sens-vance-lee-and-johnson-join-elon-and-vivek-to-slam-endless-funding-for-ukraine/",
      engines : ['google'],
    };

    try {
      const response = await fetch('https://www.disinfo.id/parse-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        console.log(data);
      } else {
        // Handle error response
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error fetching data:', error);
    }
  }
