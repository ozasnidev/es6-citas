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

export default CitaList;