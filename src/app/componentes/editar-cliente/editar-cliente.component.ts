import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { throws } from 'assert';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente:Cliente  ={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  id:string='';
  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private flasMessages: FlashMessagesService
  ) 
  {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe((cliente)=>{
        this.cliente = cliente;
    })
  }

  ngOnInit(): void {
  }
  guardar(form:NgForm){
    if(!form.valid)
      this.flasMessages.show("El formulario debe llenarse por compleo",{
        cssClass:'alert-danger',timeout:4000
      })
    else
    {
      //Its added the id recovered by url to the id of the cliente
      form.value.id = this.id
      this.clienteService.modificarCliente(form.value);
      this.router.navigate(['/']);

    }
  }
  eliminar(){
    this.clienteService.eliminarCliente(this.id);
    this.router.navigate(['/'])
  }

}
