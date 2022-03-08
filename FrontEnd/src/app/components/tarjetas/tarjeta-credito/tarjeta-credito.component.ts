import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarjetaService } from '../../../services/tarjeta.service';
import { TarjetaCredito } from '../../../models/tarjetaCredito';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form:FormGroup;
  suscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;

  constructor(private formBuilder: FormBuilder,
              private tarjetaService: TarjetaService,
              private toastr: ToastrService ) {

    this.form = this.formBuilder.group({
      id:0,
      titular:['',[Validators.required]],
      numeroTarjeta:['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]

    })
   }

  ngOnInit(): void {
   this.suscription = this.tarjetaService.ObtenerTarjeta$().subscribe(data =>{
      console.log(data);
      this.tarjeta = data;
      
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id || 0;
    });
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }
  guardarTarjeta(){
    if(this.idTarjeta === 0){
      this.agregar();
    }
    else{
      this.editar();
    }
  }

  agregar(){
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('Resgistro Agregado!', 'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetaCredito();
      this.form.reset();
    })
  }

  editar(){
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.tarjetaService.actualizarTarjetaCredito(this.idTarjeta, tarjeta).subscribe(data =>{
      this.toastr.info('Resgistro Actualizado!', 'La tarjeta fue actualizado');
      this.tarjetaService.obtenerTarjetaCredito();
      this.form.reset();
      this.idTarjeta = 0;
    })
  }
}
