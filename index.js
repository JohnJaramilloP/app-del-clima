// API - Open Weather Map
// clave api = tutiempo.net : 45Ga4aqXaXavu5o

const d = document;

// Elementos del DOM

let container = d.getElementById("container"),
    selectForm = d.getElementById("select__submit"),
    selectInput = d.getElementById("select__input"),
    temperatureDegrees = d.getElementById("degreenumber"),
    wheaterIcon = d.getElementById("weathericon"),
    temperatureDescription = d.getElementById("inputtemp__description"),
    timeZone = d.getElementById("timezone"),
    date = d.getElementById("date"),
    min = d.getElementById("min"),
    max = d.getElementById("max");



    let cities = [
        {name:"Armenia",value:69762}, 
        {name:"Barrancabermeja",value:69775},
        {name:"Barranquilla",value:69778},
        {name:"Bogotá",value:69791},
        {name:"Bucaramanga",value:69795},
        {name:"Buenaventura",value:69796},
        {name:"Cali",value:69819},
        {name:"Cartagena",value:69839},
        {name:"Cúcuta",value:69907},
        {name:"Girardot",value:70000},
        {name:"Ibagué",value:70038},
        {name:"Ipiales",value:70044},
        {name:"Manizales",value:70126},
        {name:"Medellin", value:70140},
        {name:"Montería",value:70163},
        {name:"Neiva",value:70183},
        {name:"Pereira",value:70232},
        {name:"Popayán",value:70252},
        {name:"Providencia",value:70257},
        {name:"Quibdó",value:70289},
        {name:"San AgustÍn",value:70332},
        {name:"San Andrés",value:70334},
        {name:"Soacha",value:70422},
        {name:"Turbo",value:70497},
        {name:"Valledupar",value:70518},
        {name:"Yumbo",value:70556},
    ]

// Insertar opciones en el menu select

cities.forEach(e => {
    selectInput.insertAdjacentHTML("beforeend", `<option value="${e.value}">${e.name}</option>`)
});



// Funcion principal

const getWeatherData = async (city) => {
    // Request a la API y obtener un objeto que contenga los datos
    try {
        const res = await fetch(`https://api.tutiempo.net/json/?lan=es&apid=45Ga4aqXaXavu5o&lid=${city}`)
        const data = await res.json();

        displayBackgroundImage(data);

        displayData(data);
    } catch (err) {
        // Manejo del error
        let message = "Datos de la fuente no disponibes.";
        temperatureDescription.textContent= `Error: ${message} ${err.status}`;
        container.classList.add("day")
    }

};

// Funciones secundarias

// Cambiar imagen de fondo dia y noche
// Extraer el objeto que contiene los datos del tiempo y convertirlo de forma entendible
// Incluir la hora en el date
const displayBackgroundImage = (obj) => {
    date.textContent = `Fecha: ${obj.hour_hour.hour1.date}`;

    let hour = obj.hour_hour.hour1.hour_data.substring(0,2);

    if (parseInt(hour) > 6 && parseInt(hour) < 18){
        container.classList.remove("night");
        container.classList.add("day")
    } else {
        container.classList.remove("day");
        container.classList.add("night")
    }
};

//     // Mostrar los datos en pantalla
//     displayData(data);

const displayData = (obj) => {

    timeZone.textContent = obj.locality.name;
    const icon = obj.day1.icon; 
    wheaterIcon.innerHTML = `<img src="/app-del-clima/assets/images/${icon}.svg"></img>`;
    temperatureDescription.textContent = obj.day1.text.charAt(0).toUpperCase()+obj.day1.text.slice(1);
    min.textContent = obj.day1.temperature_min;
    max.textContent = obj.day1.temperature_max;
    let temp = (parseInt(obj.day1.temperature_min) + parseInt(obj.day1.temperature_max)) / 2
    temperatureDegrees.textContent = Math.round(temp);
}

// Submit de la ciudad a buscar
selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeatherData(selectInput.value)
});


// Ciudad por defecto 
// Método por defecto

window.onload = () => {
    getWeatherData("70140");
}

