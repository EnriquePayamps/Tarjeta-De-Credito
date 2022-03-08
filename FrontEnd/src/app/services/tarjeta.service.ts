import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
myAppUrl: string = "https://localhost:44365/"
myApiUrl: string = "api/TarjetaCredito/"
list: TarjetaCredito[];
private actualizarformulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }


  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta)
  }

  obtenerTarjetaCredito(){
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise()
    .then(data => {
      this.list = data as TarjetaCredito[];
    })
  }

actualizarTarjetaCredito(id: number, tarjeta:TarjetaCredito): Observable<TarjetaCredito> {
return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id, tarjeta);
}

  actualizar( tarjeta: TarjetaCredito ){
    this.actualizarformulario.next(tarjeta);
  }

  ObtenerTarjeta$(): Observable<TarjetaCredito>{
    return this.actualizarformulario.asObservable();
  }

  eliminarTarjetaCredito(id: number): Observable<TarjetaCredito>  {
   return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl+ id);
  }
}
