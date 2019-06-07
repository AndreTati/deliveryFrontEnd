import { Component, OnInit } from '@angular/core';
import {PlatoCarrito} from "../../Modelo/PlatoCarrito";
import {Pedido} from "../../Modelo/Pedido";
import {AuthService} from "../../servicios/auth.service";
import {UsuarioService} from "../../servicios/usuario/usuario.service";
import {Usuario} from "../../Modelo/Usuario";
import {PedidoService} from "../../servicios/pedido/pedido.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {async} from "@angular/core/testing";




@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public email: string;
  public tipoEnvio: string = 'local';
  public platosEnCarrito: PlatoCarrito[];
  public total: number;
  public montoDescuento: number;
  public carritoMenu: boolean;
  private columnas: any[];

  public cliente: Usuario;

  constructor(private att: AuthService,private usuarioService: UsuarioService, private pedidoService: PedidoService,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.total = 0;
    this.platosEnCarrito = [];


  }

  ngOnInit() {
    this.columnas = [{field: 'id', header: 'Id'},
      {field: 'nombre', header: 'Nombre'},

    ];

  }


// OBTENGO EL USUARIO LOGUEADO
  getUsuario(){
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.usuarioService.getUsuario(this.email).subscribe((data) => {
        this.cliente = data;
      });
    });


  }

  // AGREGA EL PLATO ELEGIDO AL ARRAY DE CARRITO Y SI YA ESTA SUMA 1 EN CANTIDAD
agregarPlatoaCarrito(platoSelec: any, esArticulo: string){
    let platoCarro: PlatoCarrito;
    if(esArticulo == 'F'){
      platoCarro = {
        id: 0,
        cantidad: 1,
        plato: platoSelec,
        articulo: null,
        esArticulo: false
      }
    }else{
      platoCarro = {
        id: 0,
        cantidad: 1,
        plato: null,
        articulo: platoSelec,
        esArticulo: true
      }
    }
console.log(platoCarro);
if(this.existePlato(platoSelec.id, platoCarro.esArticulo)){
  console.log("SE SUMO UNO IGUAL");
  if(!platoCarro.esArticulo){
    this.total = this.total + platoSelec.precio;
  }else{
    this.total = this.total + platoSelec.precioVenta;
  }

}else{
    this.platosEnCarrito = [...this.platosEnCarrito,platoCarro];
    if(!platoCarro.esArticulo){
      this.total = this.total + platoSelec.precio;
    }else{
      this.total = this.total + platoSelec.precioVenta;
    }


    console.log(this.platosEnCarrito);
  }

    console.log(platoSelec);
    console.log(this.platosEnCarrito);

console.log(this.total);
}



// BUSCO SI ESE PLATO YA EXISTE EN EL CARRITO
existePlato(id: number, esArticulo: boolean): boolean {
  for (let elemento of this.platosEnCarrito) {
    if(!elemento.esArticulo && esArticulo == false){
      if(elemento.plato.id == id){
        elemento.cantidad += 1;
        return true;
      }
    }
    else{
      if(elemento.esArticulo && esArticulo) {
        if (elemento.articulo.id == id) {
          elemento.cantidad += 1;
          return true;
        }
      }
    }

  }
  return false;
  }

// SUMAR CANTIDAD DEL PLATO
  sumarCantidad(plato: PlatoCarrito){
    console.log('SUMO');
    plato.cantidad++;
    if(!plato.esArticulo){
      this.total = this.total + plato.plato.precio;
    }else{
      this.total = this.total + plato.articulo.precioVenta;
    }


   console.log(this.platosEnCarrito);
  }

// RESTAR CANTIDAD DEL PLATO
  restarCantidad(plato: PlatoCarrito) {
    console.log('RESTO');
    plato.cantidad--;
    if(!plato.esArticulo){

      if(plato.cantidad == 0){
        let idx = this.platosEnCarrito.indexOf(plato);
        this.platosEnCarrito.splice(idx,1);}
      this.total = this.total - plato.plato.precio;
    }else{

      if(plato.cantidad == 0){
        let idx = this.platosEnCarrito.indexOf(plato);
        this.platosEnCarrito.splice(idx,1);}
      this.total = this.total - plato.articulo.precioVenta;
    }

    console.log(this.platosEnCarrito);
    console.log(this.total);
  }

  // METODO QUE LIMPIA EL CARRITO (BORRA EL ARRAY platosEnCarrito)
  limpiarCarrito(){
    this.platosEnCarrito = [];
    this.total = 0;
  }
// METODO QUE SE EJECUTA CUANDO SE CONFIRMA EL PEDIDO EN EL DIALOG
  confirmarPedido() {
let totalfinal: number;
    if(this.tipoEnvio == 'local'){
      this.montoDescuento = this.total * 0.10;
      totalfinal = this.total * 0.90;
    }else{
      totalfinal = this.total;
    }

    this.confirmationService.confirm({
      message: '¿DESEA REALIZAR EL PEDIDO? '+'TOTAL: $'+totalfinal.toFixed(2),
      accept: () => {

        this.mandarPedido(totalfinal);
      },
      reject: () =>{
        console.log("Todavia no confirmo");
      }
    });
  }


// METODO QUE ENVIA EL PEDIDO DEL CLIENTE (CONFIRMA)
mandarPedido(totalfinal: number){
    let tiempoFinal :string;
    let fechaPedido = new Date();

let horaFinalizacion = new Date(fechaPedido.getTime() + 2700000);

if(this.puedePedir(this.getNombreDia(fechaPedido.getDay()),fechaPedido) == false){
  fechaPedido
}else{
  tiempoFinal = fechaPedido.toLocaleDateString()+" "+fechaPedido.toLocaleTimeString();
}
// ARMO EL PEDIDO
    let pedido: Pedido = {
      id: 0,
  fecha: tiempoFinal,
  montoDescuento: this.montoDescuento,
  total: totalfinal,
  usuarioCliente: this.cliente,
  horaEstimadaFin: horaFinalizacion.toLocaleDateString()+" "+horaFinalizacion.toLocaleTimeString(),
  tipoEnvio: this.tipoEnvio,
  estado: {id:2, nombre:'En cocina'},
  detalle: this.platosEnCarrito
    };

   // METODO QUE HACE EL POST EL PEDIDO
    this.pedidoService.postPedido(pedido).subscribe((res)=>{
        console.log('PEDIDO REALIZADO');
        this.carritoMenu = false;
        this.limpiarCarrito();
        console.log(res);
        this.messageService.add({key:'pedidoConfirmado', severity:'success', summary:'PEDIDO REALIZADO', detail:'Tu pedido fue enviado exitosamente'});
        },
      err=>{
        console.log(" Error al enviar el pedido");
        console.log(err);
        alert(err.toString());
        return false;
      } );

}
// VERIFICO SI ESTA APTO PARA REALIZAR EL PEDIDO
  puedePedir(nombreDia: string, fecha:Date){
    switch (nombreDia) {
      case 'Lunes': case 'Martes': case'Miercoles' : case'Jueves': case'Viernes':
        if(fecha.toLocaleTimeString() > '12:00:00' && fecha.toLocaleTimeString() < '20:00:00'){
return false;
        }else{
          return true;
      }
        break;

        case 'Sabado': case 'Domingo':
        if(fecha.toLocaleTimeString() > '15:00:00' && fecha.toLocaleTimeString() < '20:00:00'){
          return false;
        }else{
          return true;
        }
        break;
      default:
        return true;
    }
  }
// OBTENGO EL NOMBRE DEL DIA
  getNombreDia(index: number){
    var dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes';
    dia[2] = 'Martes';
    dia[3] = 'Miércoles';
    dia[4] = 'Jueves';
    dia[5] = 'Viernes';
    dia[6] = 'Sábado';
    return dia[index];
  }

// FIN DE CLASE
}


