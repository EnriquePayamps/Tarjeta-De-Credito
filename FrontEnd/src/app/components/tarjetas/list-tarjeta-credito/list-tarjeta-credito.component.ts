import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../../services/tarjeta.service';
import { TarjetaCredito } from '../../../models/tarjetaCredito';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetaCredito();
  }

  eliminarTarjeta(id: number){

    if(confirm('Esta seguro que quiere elimar el registro')){
      this.tarjetaService.eliminarTarjetaCredito(id).subscribe(data => {

        this.toastr.warning('Resgistro Eliminado!', 'La tarjeta fue eliminada');
        console.log(id);
        this.tarjetaService.obtenerTarjetaCredito();
      })    
    }
    
  }

  editar(tarjeta: TarjetaCredito){
    this.tarjetaService.actualizar(tarjeta);
  }

}
