const makesTemplateSource = document.querySelector(".makesTemplate")
const makesTemplate = Handlebars.compile(makesTemplateSource.innerHTML)
const carsElem = document.querySelector('.model');

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
        if (index<30) {
           const list = document.createElement('li') 
           list.innerHTML =`<li>${model.make}</li>`
           carsElem.appendChild(list);
        }
    });
    
 });