async function fetchData() {
  await fetch('https://backend-5bno.onrender.com/user/getById?id=2')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Fetch Error:', error);
    });
}

fetchData();

const interval = 10 * 60 * 10000;
setInterval(fetchData, interval);
