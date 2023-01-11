const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')


window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})


function buscarClima(e){
    e.preventDefault()
    //Validar
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(ciudad === '' || pais ===''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios')
        return
    }

    //Consultar API
    consultarAPI(ciudad,pais)
}

function consultarAPI(ciudad,pais){
    const appID = '52b36eaddd03e5b161b8b4ed82aac867'

    const url = `
    https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}
    
    `
    spinner()
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarhtml()
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return
            }

            //Mostrat datos en el HTML
            mostrarClima(datos)
        })
}

function mostrarClima(datos){

    const {name,main:{temp,temp_max,temp_min}} = datos

    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max)
    const min = kelvinACentigrados(temp_min)

    const actual = document.createElement('p')
    const nombreCiudad = document.createElement('p')
    nombreCiudad.textContent = `Clima en ${name}`

    nombreCiudad.classList.add('font-bold','text-2xl')

    actual.innerHTML = `${centigrados} &#8451;`;

    actual.classList.add('font-bold','text-6xl')

    const tempMaxima = document.createElement('p')
    tempMaxima.innerHTML = `Max ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p')
    tempMinima.innerHTML = `Min ${min} &#8451;`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div')

    resultadoDiv.classList.add('text-center','text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMinima)

    resultado.appendChild(resultadoDiv)

}


function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)
}

function mostrarError(error){
    const alert = document.querySelector('.bg-red-100')

    if(!alert){
        //Crear alerta
    const alerta = document.createElement('div')
    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded',
    'max-w-md','mx-auto','mt-6','text-center')

    alerta.innerHTML = `
        <strong class ="font-bold">Error!</strong>
        <span class="block">${error}</span>


    `

    container.appendChild(alerta)

    //Se elimine la alerta

    setTimeout(() => {
        alerta.remove()
    }, 2000);
    }
    

    
}

function limpiarhtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
  
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
 

    `

    resultado.appendChild(divSpinner)
}