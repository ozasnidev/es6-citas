const nuevaCitaForm = document.querySelector("#nuevaCitaForm");

const pacienteInput = document.querySelector("#pacienteInput");
const direccionInput = document.querySelector("#direccionInput");
const telefonoInput = document.querySelector("#telefonoInput");
const diaRegistroInput = document.querySelector("#diaRegistroInput");
const horaRegistroInput = document.querySelector("#horaRegistroInput");
const sintomasInput = document.querySelector("#sintomasInput");

const desktopContainer = document.querySelector("#desktopContainer");
const desktopCardDeck = document.querySelector("#desktop-card-deck");

const citaObject = { paciente: '', direccion: '', telefono: '', dia: '', hora: '', sintomas: '' }
let editMode;

class CitaList {
    constructor(){
        this.citasCollection = [];
    }
    addCita(citaObject){
        this.citasCollection = [...this.citasCollection, citaObject];
    }
    editCita(citaActualizada){
        this.citasCollection = this.citasCollection.map( cita =>
            cita.id === citaActualizada.id ? citaActualizada : cita 
        ); 
            
    }
    deleteCita(id){
        this.citasCollection = this.citasCollection.filter( cita => cita.id !== id);
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
    printRepository(repository){

        this.vaciarRepository();

        repository.forEach(cita => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card','cita-card');

            const cardHeader = document.createElement('header');
            cardHeader.classList.add('card-header');
            cardHeader.innerHTML = `<p class="card-header-title">${cita.paciente}</p>`;

            const cardContentContainer = document.createElement('div');
            cardContentContainer.classList.add('card-content');
            const cardContent = document.createElement('div');
            cardContent.classList.add('content');
            cardContent.innerHTML = `${cita.sintomas}`;
            cardContentContainer.appendChild(cardContent);
            
            const cardFooterContainer = document.createElement('footer');
            cardFooterContainer.classList.add('card-footer');
            const cardLinkDelete = document.createElement('a');
            cardLinkDelete.classList.add('card-footer-item');
            cardLinkDelete.href = "#";
            cardLinkDelete.onclick= () => eliminarCita(cita.id);
            cardLinkDelete.textContent = "Eliminar";
            const cardLinkEditar = document.createElement('a');
            cardLinkEditar.classList.add('card-footer-item');
            cardLinkEditar.href = "#";
            cardLinkEditar.onclick = () => editarCita(cita);
            cardLinkEditar.textContent = "Editar";

            cardFooterContainer.appendChild(cardLinkDelete);
            cardFooterContainer.appendChild(cardLinkEditar)

            cardContainer.appendChild(cardHeader);
            cardContainer.appendChild(cardContentContainer);
            cardContainer.appendChild(cardFooterContainer);

            desktopCardDeck.appendChild(cardContainer);
        });
    }
    vaciarRepository() {
        while(desktopCardDeck.firstChild){
            desktopCardDeck.removeChild(desktopCardDeck.firstChild);
        }
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

    if(editMode){
        citasRepository.editCita({...citaObject});
        userInterface.printRepository(citasRepository.citasCollection);
        userInterface.imprimirAlerta('Cita editada correctamente');
        document.querySelector('#guardarButton').textContent = "Guardar";
        editMode = false;
    }else{
        setDatosCita(event);
        guardarEnRepositorio();
    }
    nuevaCitaForm.reset();
    resetCita();
}

function guardarEnRepositorio(){
    citaObject.id = new Date().getMilliseconds();
    citasRepository.addCita({...citaObject});
    userInterface.printRepository(citasRepository.citasCollection);
}

function editarCita(cita){
    const {id, paciente, direccion, telefono, dia, hora, sintomas} = cita;

    pacienteInput.value = paciente;
    direccionInput.value = direccion;
    telefonoInput.value = telefono;
    diaRegistroInput.value = dia;
    horaRegistroInput.value = hora;
    sintomasInput.value = sintomas; 

    citaObject.id = id;
    citaObject.paciente = pacienteInput.value;
    citaObject.direccion = direccionInput.value;
    citaObject.telefono = telefonoInput.value;
    citaObject.dia = diaRegistroInput.value;
    citaObject.hora = horaRegistroInput.value;
    citaObject.sintomas = sintomasInput.value;

    document.querySelector('#guardarButton').textContent = "Guardar Cambios";
    editMode = true;
}

function eliminarCita(id){
    citasRepository.deleteCita(id);
    userInterface.imprimirAlerta('Cita eliminada correctamente');
    userInterface.printRepository(citasRepository.citasCollection);
}

function resetCita(){
    citaObject.paciente='';
    citaObject.direccion='';
    citaObject.telefono='';
    citaObject.dia='';
    citaObject.hora='';
    citaObject.sintomas='';
}   