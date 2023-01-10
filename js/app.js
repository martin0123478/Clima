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