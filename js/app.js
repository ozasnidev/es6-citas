const nuevaCitaForm = document.querySelector("#nuevaCitaForm");

const pacienteInput = document.querySelector("#pacienteInput");
const direccionInput = document.querySelector("#direccionInput");
const telefonoInput = document.querySelector("#telefonoInput");
const diaRegistroInput = document.querySelector("#diaRegistroInput");
const horaRegistroInput = document.querySelector("#horaRegistroInput");
const sintomasInput = document.querySelector("#sintomasInput");

const desktopContainer = document.querySelector("#desktopContainer");

const citaObject = { paciente: '', direccion: '', telefono: '', dia: '', hora: '', sintomas: '' }

class CitaList {
    constructor(){
        this.citasCollection = [];
    }
    addCita(citaObject){
        this.citasCollection = [...this.citasCollection, citaObject];

        console.log(this.citasCollection);
    }
}

class UI {
    imprimirAlerta(mensaje) {
        const mensajeContainer = document.createElement('article');
        mensajeContainer.classList.add('message');
        const mensajeHeader = document.createElement('div');
        mensajeHeader.classList.add('message-header');
        const mensajeBody = document.createElement('div');
        mensajeBody.classList.add('message-body');
        const mensajeHeaderParrafo = document.createElement('p');
        const mensajeBodyParrafo = document.createElement('p');

        mensajeContainer.classList.add('is-danger');
        mensajeHeaderParrafo.textContent = "Error";
        mensajeBodyParrafo.textContent = mensaje;
        mensajeHeader.append(mensajeHeaderParrafo);
        mensajeBody.append(mensajeBodyParrafo);
        
        mensajeContainer.appendChild(mensajeHeader);
        mensajeContainer.appendChild(mensajeBody);

        document.querySelector('#desktopContainer').appendChild(mensajeContainer);
        setTimeout(()=>{
            mensajeContainer.remove();
        },5000);
    }
}

const userInterface = new UI();
const citasRepository = new CitaList();

eventListeners();

function eventListeners(){
    pacienteInput.addEventListener('change', setDatosCita);
    direccionInput.addEventListener('change', setDatosCita);
    telefonoInput.addEventListener('change', setDatosCita);
    diaRegistroInput.addEventListener('change', setDatosCita);
    horaRegistroInput.addEventListener('change', setDatosCita);
    sintomasInput.addEventListener('change', setDatosCita);

    nuevaCitaForm.addEventListener('submit', validarCita);
}

function setDatosCita(event){
    citaObject[event.target.name] = event.target.value;
}

function validarCita(event){
    event.preventDefault();

    const { paciente, direccion, telefono, dia, hora, sintomas } = citaObject;

    if( paciente === '' || 
        direccion === '' || 
        telefono === '' || 
        dia === '' || 
        hora === '' ||
        sintomas === ''){
            userInterface.imprimirAlerta('Falta informacion');
            return;           
        }  
    setDatosCita(event);
    guardarEnRepositorio();
}

function guid(len) {
    let buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        length = len || 32;
        
    for (let i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
    }
    return buf.join('');
}

function guardarEnRepositorio(){
    citaObject.id = guid();
    citasRepository.addCita({...citaObject});
    nuevaCitaForm.reset();
    resetCita();
}

function resetCita(){
    citaObject.paciente='';
    citaObject.direccion='';
    citaObject.telefono='';
    citaObject.dia='';
    citaObject.hora='';
    citaObject.sintomas='';
}