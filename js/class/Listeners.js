import { setDatosCita, validarCita } from '../function.js'

import {
    pacienteInput,
    direccionInput,
    telefonoInput,
    diaRegistroInput,
    horaRegistroInput,
    sintomasInput,
    nuevaCitaForm
} from '../selectors.js';

class Listeners{
    constructor(){
        this.initListeners();
    }
    initListeners(){
        pacienteInput.addEventListener('change', setDatosCita);
        direccionInput.addEventListener('change', setDatosCita);
        telefonoInput.addEventListener('change', setDatosCita);
        diaRegistroInput.addEventListener('change', setDatosCita);
        horaRegistroInput.addEventListener('change', setDatosCita);
        sintomasInput.addEventListener('change', setDatosCita);

        nuevaCitaForm.addEventListener('submit', validarCita);
    }
}

export default Listeners;