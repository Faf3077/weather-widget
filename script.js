const url = 'https://restcountries.com/v3.1/all';
let select = document.querySelector(".select");
const city = document.querySelector(".city");
const temperatureValue = document.querySelector(".temperature");
const windValue = document.querySelector(".wind");
const descriptionValue = document.querySelector(".description");
let form = document.querySelector(".form-widget");
fetch(url).then(function (element) {
   return element.json(); //преобразовал в массив 
}).then(function (data) {

   // заполняю select городами 
   let output = '';
   data.forEach(function (country) {
      output += `<option class="option">${country.capital}</option>`;
      select.innerHTML = output;
   });

   // сортировка option's по алфавиту 
   var arr = Array.from(select.children).sort((x, y) => {
      return x.text.localeCompare(y.text);
   });
   arr.forEach(x => select.appendChild(x));
   select.selectedIndex = 0;

   select.addEventListener('change', () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${select.value}&appid=5e425b2d5954bd1f8a2d5eb116e4f4a5`).then(function (element1) {
         return element1.json(); //преобразовал в массив 
      }).then(function (cityData) {
         console.log(cityData)
         // заполнение данными элементов в html
            temperatureValue.innerHTML = Math.round(cityData.main.temp - 273) + '°C'
            city.innerHTML = select.value
            windValue.innerHTML =  Math.round(cityData.wind.speed) + ' ' + 'м/с'
            descriptionValue.innerHTML = cityData.weather[0].description

         let tempColor = Math.round(cityData.main.temp - 273)
         if (tempColor > 20) {
            form.style.background = "#FFFFCC";
         }
         else if (0 <= tempColor <= 20) {
            form.style.background = "#FFFFFF";
         }
         if (tempColor < 0) {
            form.style.background = "#CCFFFF";
         }
         sessionStorage.setItem('storageForm', form.style.background);
         sessionStorage.setItem('storageCity', select.value);
         sessionStorage.setItem('storageTemp', cityData.temperature);
         sessionStorage.setItem('storageWind', cityData.wind);
         sessionStorage.setItem('storageDis', cityData.description);
      })
   })
})
let formStyle = sessionStorage.getItem('storageForm');
form.style.background = formStyle;
let town = sessionStorage.getItem('storageCity');
city.innerHTML = town;
let temp = sessionStorage.getItem('storageTemp');
temperatureValue.innerHTML = temp;
let breeze = sessionStorage.getItem('storageWind');
windValue.innerHTML = breeze;
let dis = sessionStorage.getItem('storageDis');
descriptionValue.innerHTML = dis;
