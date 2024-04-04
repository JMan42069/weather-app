const weatherKey = '8face7fe9e39459a9a725714240802'

export async function fetchWeatherInfo(arg){
  return new Promise((result, reject) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${arg}&aqi=no`)
      .then(response => {
        if (response.ok){
          return response.json();
        }
        throw new Error('Error fetching data');
      })
      .then(data => result(data))
      .catch(error => reject(error));
  });
}