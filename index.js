const makesTemplateSource = document.querySelector(".makesTemplate")
const makesTemplate = Handlebars.compile(makesTemplateSource.innerHTML)
const carsElem = document.querySelector('.myCars');

const colorElem = document.querySelector(".selectColor");
const brandElem = document.querySelector(".selectBrand");
const filterButton = document.querySelector(".filterBtn");
const displayElem = document.querySelector(".display");

const carFilterTemplateElem = document.querySelector(".carFilterTemplate");
const carFilterTemplate = Handlebars.compile(carFilterTemplateElem.innerHTML);
var filteredCars = [];

     filterButton.addEventListener('click', function () {
          var make = brandElem.value
          var  color = colorElem.value

        axios.get("http://api-tutor.herokuapp.com/v1/cars/make/" + make + "/color/" + color)
         .then(function (result) {
             console.log(result.data)
           let data = result.data;
                filteredCars.push(data)

            console.log(filteredCars)
             displayElem.innerHTML = carFilterTemplate({
                 filteredCars : data
             })
         }) 
     })


axios.get('https://api-tutor.herokuapp.com/v1/colors')

.then(function(response){
        console.log(response.data);
        const colorsElem = document.querySelector(".colors")
        colorsElem.innerHTML = makesTemplate({
            makes: response.data
        })
 });

 axios.get('https://api-tutor.herokuapp.com/v1/makes')

 .then(function(response){
    console.log(response.data);
    const makesElem = document.querySelector(".makes")
    makesElem.innerHTML = makesTemplate({
        makes: response.data
    })
 });

 axios.get('https://api-tutor.herokuapp.com/v1/cars')
 
 .then(function(response){
     
    response.data.forEach((model,index )=> {
        console.log(model);
        if (index<30) {
           const list = document.createElement('tr') 

           const td = document.createElement('td');
           const myList = document.createTextNode(`${model.make}`) 
           list.appendChild(td);
           list.appendChild(td);
           td.appendChild(myList)
           //
           const tColor = document.createElement('td');
           const myColor = document.createTextNode(`${model.color}`) 
           tColor.appendChild(myColor)
           list.appendChild(tColor)
           carsElem.appendChild(list)

           //
           const tPrice = document.createElement('td');
           const myPrice = document.createTextNode(`${model.price}`) 
           tPrice.appendChild(myPrice)
           list.appendChild(tPrice)

           //
           const tModel = document.createElement('td');
           const myModel = document.createTextNode(`${model.model}`) 
           tModel.appendChild(myModel)
           list.appendChild(tModel)
          // 
          const tReg = document.createElement('td');
           const myReg = document.createTextNode(`${model.reg_number}`) 
           tReg.appendChild(myReg)
           list.appendChild(tReg)
        }
    });
    
 });