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
      fetch('https://goweather.herokuapp.com/weather/' + select.value).then(function (element1) {
         return element1.json(); //преобразовал в массив 
      }).then(function (data1) {
         // полученые данные происваиваю элементам html
         temperatureValue.innerHTML = data1.temperature
         city.innerHTML = select.value
         windValue.innerHTML = data1.wind
         descriptionValue.innerHTML = data1.description
         let a = data1.temperature.replace(/[^0-9 -]/g, '')//убираю лишние символы у значения температуры 
         if (a > 20) {
            form.style.background = "#FFFFCC";
         }
         else if (0 <= a <= 20) {
            form.style.background = "#FFFFFF";
         }
         if (a < 0) {
            form.style.background = "#CCFFFF";
         }
         sessionStorage.setItem('storageForm', form.style.background);
         sessionStorage.setItem('storageCity', select.value);
         sessionStorage.setItem('storageTemp', data1.temperature);
         sessionStorage.setItem('storageWind', data1.wind);
         sessionStorage.setItem('storageDis', data1.description);
         sessionStorage.setItem('storageSelect', select.value);

         // обновление данных страницы каждую минуту 
         setInterval(() => {
            if (select.value) {
               this(select.value)
            }
         }, 60000)
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
