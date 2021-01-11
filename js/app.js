const nuevaCitaForm = ("#nuevaCitaForm");

const pacienteInput = document.querySelector("#pacienteInput");
const direccionInput = document.querySelector("#direccionInput");
const telefonoInput = document.querySelector("#telefonoInput");
const diaRegistroInput = document.querySelector("#diaRegistroInput");
const horaRegistroInput = document.querySelector("#horaRegistroInput");
const sintomasInput = document.querySelector("#sintomasInput");

const desktopContainer = document.querySelector("#desktopContainer");

const citaObject = { paciente: '', direccion: '', telefono: '', dia: '', hora: '', sintomas: '' }

eventListeners();

function eventListeners(){
    pacienteInput.addEventListener('change', setDatosCita);
    direccionInput.addEventListener('change', setDatosCita);
    telefonoInput.addEventListener('change', setDatosCita);
    diaRegistroInput.addEventListener('change', setDatosCita);
    horaRegistroInput.addEventListener('change', setDatosCita);
    sintomasInput.addEventListener('change', setDatosCita);
}

function setDatosCita(event){
    citaObject[event.target.name] = event.target.value;
    console.log(citaObject);
}
