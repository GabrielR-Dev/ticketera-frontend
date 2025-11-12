import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TicketModel } from '../../models/Ticket';
import { CategoriaTicket } from '../../enums/CategoriaTicket';
import { IAdjunto } from '../../interfaces/IAdjunto';
import { EstadoTicket } from '../../enums/EstadoTicket';

@Component({
    selector: 'app-new-issue',
    imports: [CommonModule, FormsModule],
    templateUrl: './new-issue.component.html',
    styleUrl: './new-issue.component.css'
})
export class NewIssueComponent {

    // Enums para usarlos en el template
    EstadoTicket = EstadoTicket;
    CategoriaTicket = CategoriaTicket;

    ticketCreado: TicketModel | null = null;

    // Datos del formulario inicializados
    datosFormulario = {
        titulo: '',
        descripcion: '',
        estado: this.EstadoTicket.PENDIENTE,
        fechaCreacion: new Date(),
        fechaAsignacion: null,
        fechaCierre: null,
        clienteID: 0,
        tecnicoID: null,
        categoria: '' as CategoriaTicket,
        adjuntos: [] as IAdjunto[]
    };


    // Mtodo para enviar el formulario
    enviarFormulario(formulario: any): void {

        if (formulario.valid) {

            const nuevoTicket = new TicketModel({
                titulo: this.datosFormulario.titulo,
                descripcion: this.datosFormulario.descripcion,
                estado: this.datosFormulario.estado,
                fechaCreacion: new Date(),
                fechaAsignacion: this.datosFormulario.fechaAsignacion,
                fechaCierre: this.datosFormulario.fechaCierre,
                clienteID: this.datosFormulario.clienteID,
                tecnicoID: this.datosFormulario.tecnicoID,
                categoria: this.datosFormulario.categoria,
                adjuntos: this.datosFormulario.adjuntos
            });

            this.ticketCreado = nuevoTicket;

            console.log('Ticket creado (instancia):', nuevoTicket);
            console.log('Ticket JSON:', nuevoTicket.toJSON());
            console.log('Estado legible:', nuevoTicket.getEstadoLegible());
            console.log('Categoría:', nuevoTicket.getCategoriaString());
            console.log('¿Está pendiente?:', nuevoTicket.estaPendiente());
            console.log('¿Tiene técnico asignado?:', nuevoTicket.tieneTecncoAsignado());

            alert('Ticket creado exitosamente!');

        }
    }


    agregarAdjunto(): void {

        this.datosFormulario.adjuntos.push({
            nombreArchivo: '',
            url: ''
        });

    }

    removerAdjunto(indice: number): void {
        this.datosFormulario.adjuntos.splice(indice, 1);
    }

    
    limpiarFormulario(formulario: any): void {

        formulario.resetForm();
        
        this.datosFormulario = {
            titulo: '',
            descripcion: '',
            estado: this.EstadoTicket.PENDIENTE,
            fechaCreacion: new Date(),
            fechaAsignacion: null,
            fechaCierre: null,
            clienteID: 0,
            tecnicoID: null,
            categoria: '' as CategoriaTicket,
            adjuntos: []
        };
        // Resetear el ticket creado
        this.ticketCreado = null;
    }
}
