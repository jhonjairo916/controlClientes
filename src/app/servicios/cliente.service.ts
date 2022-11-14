import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../modelo/cliente.model';

@Injectable()
export class ClienteService {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;
  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  //Recovering all the clientes of the firestore database
  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }
  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null!;
        } else {
          const datos = accion.payload.data() as Cliente;
          return datos;
        }
      })
    );
    return this.cliente;
  }
  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }
  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }
  eliminarCliente(id: string) {
     this.getCliente(id).subscribe((datos)=>{
        const nombre = datos.nombre
        if (confirm('Desea eliminar el cliente '+nombre)) {
          this.clienteDoc = this.db.doc(`clientes/${id}`);
          this.clienteDoc.delete();
        }
    })
    
  }
}
