import { eliminarCita, editarCita } from '../function.js';

import { desktopCardDeck } from '../selectors.js';

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

export default UI;