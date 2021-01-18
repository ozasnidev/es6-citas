import CitaList from './class/CitaList.js';
import UI from './class/UI.js';

import {
    pacienteInput,
    direccionInput,
    telefonoInput,
    diaRegistroInput,
    horaRegistroInput,
    sintomasInput,
    nuevaCitaForm
} from './selectors.js';

let editMode;
const citaObject = { paciente: '', direccion: '', telefono: '', dia: '', hora: '', sintomas: '' };

const userInterface = new UI();
const citasRepository = new CitaList();

export function setDatosCita(event){
    citaObject[event.target.name] = event.target.value;
}

export function validarCita(event){
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

export function guardarEnRepositorio(){
    citaObject.id = new Date().getMilliseconds();
    citasRepository.addCita({...citaObject});
    userInterface.printRepository(citasRepository.citasCollection);
}

export function editarCita(cita){
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

export function eliminarCita(id){
    citasRepository.deleteCita(id);
    userInterface.imprimirAlerta('Cita eliminada correctamente');
    userInterface.printRepository(citasRepository.citasCollection);
}

export function resetCita(){
    citaObject.paciente='';
    citaObject.direccion='';
    citaObject.telefono='';
    citaObject.dia='';
    citaObject.hora='';
    citaObject.sintomas='';
} 