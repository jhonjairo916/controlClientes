import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { timeout } from 'rxjs';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente:Cliente ={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  @ViewChild('clienteForm') form:NgForm;
  @ViewChild('botonCerrar') botonModal:ElementRef;
  constructor(
    private clienteService: ClienteService,
    private flasMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((clientes)=>{
      this.clientes= clientes
      return this.clientes
    })
  }
  getSaldoTotal(){
    let saldoTotal: number=0;
    if(this.clientes){
      this.clientes.forEach(cliente => {
        saldoTotal += +cliente.saldo
      })
    }
    return saldoTotal;
  }
  //agregarCliente({value,valid}:{value:Cliente,valid:boolean}){
    agregarCliente(f:NgForm){
    this.cliente = f.value  
    if(!f.valid){
      this.flasMessages.show("Porfavor llene el formulario correctamente",{
        cssClass:'alert-danger',timeout:4000
      })
    }
    else{
      this.clienteService.agregarCliente(this.cliente);
      this.form.resetForm();
      this.botonModal.nativeElement.click();
    }
  
  }

}
