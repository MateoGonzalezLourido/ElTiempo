//iniciar codigo al cargar la pagina
globalThis.addEventListener('load', () => {//globalThis = window (globalThis en js); globalThis es un objeto; representa el navegador 
    obtener_clima_actual()//llamar a la funcion
})

function obtener_clima_actual() {
    const apiKey = "1ed75e3be26d763c3f6a1f50aa89ed3f";//key de la api (única)
    let lugar = "Negreira";//localizacion coger tiempo(not Case sensitive:sin distinción de mayúsculas y minúsculas)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${apiKey}&units=metric`;//url datos api
    fetch(url)//coger datos
        .then(response => response.json())//transformar datos recibidos en json a objeto js
        .then(data => {//usar datos
            const { main, name, weather } = data;//acceder a los datos nececesarios
            const icono = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;//iconos del clima de la api ;*1 ex
            //traducir tiempo texto
            let clima_text = weather[0].description;//acceder a datos ( weather=[description:""] )
            //traducir (sin usar el traductor)
            const climaTraducido = {//datos guardados del traductor
                "overcast cloud": "Nublado",
                "overcast clouds": "Nubarrones",
                "broken clouds": "Nubes rotas",
                "scattered clouds": "Nubes dispersas",
                "few clouds": "Pocas nubes",
                "light rain": "Lluvia ligera",
                "moderate rain": "Lluvia moderada"
            }
            clima_text = climaTraducido[clima_text] != undefined ? climaTraducido[clima_text] : clima_text;//obtener traduccion si existe
            //imagen de fondo
            let img_background = weather[0].main
            const url_img = {//url img locales
                "Rain": "clouds.avif",
                "Sunny": "sunny.webp"
            }
            img_background = url_img[img_background] != undefined ? url_img[img_background] : url_img["Sunny"]//obtener url img, sino existe coger sunny por defecto
            //mostrar resultados en pantalla (html)
            document.body.innerHTML = `<div class='div-clima-calendario'><div class='div-nombre-lugar'>${name}</div><div class='div-img-tiempo'><img draggable="false" src='${icono}'class='img-tiempo'><div class='div-text-tiempo'>${clima_text}</div></div><div class='div-text-temperatura-actual'>${main.temp}ºc</div><div class='div-text-temperatura-maxima'>${main.temp_max}ºc<img draggable="false" class='img-temperatura-actual'src='https://img.icons8.com/cotton/64/null/thermometer-up--v1.png'alt=''></div><div class='div-text-temperatura-minima'>${main.temp_min}ºc<img draggable="false" class='img-temperatura-actual'src='https://img.icons8.com/cotton/64/null/thermometer-down--v1.png'alt=''></div><div class='div-text-temperatura-minima'></div><div class='div-text-humedad-actual'><img draggable="false" class='img-humedad-actual'src='https://img.icons8.com/external-topaz-kerismaker/48/000000/external-Humidity-weather-topaz-kerismaker.png'alt=''>${main.humidity}%</div><div class='div-text-viento'><img draggable="false" class='img-viento-actual'src='./img/viento.png' />${data.wind.speed}Km/h</div></div>`;
            document.querySelector(".div-clima-calendario").style.backgroundImage = `url(./img/${img_background})`
        })
        .catch(() => {//si falla al cargar datos
            alert(`Error al buscar clima ${lugar}`)//mostrar alerta en pantalla
        });
}

//explicaciones
/*1
    const ej = [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
        }
    ]
como acceder al array y al objeto interno?
    f1->[0].icon
    f2->[0]["icon"]
*/