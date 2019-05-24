import { Component, OnInit } from '@angular/core';
import {PlatoCarrito} from "../../Modelo/PlatoCarrito";
import {Pedido} from "../../Modelo/Pedido";
import {AuthService} from "../../servicios/auth.service";
import {UsuarioService} from "../../servicios/usuario/usuario.service";
import {Usuario} from "../../Modelo/Usuario";
import {PedidoService} from "../../servicios/pedido/pedido.service";
import {ConfirmationService} from "primeng/api";




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
  public fecha: Date = new Date();
  public cliente: Usuario;

  constructor(private att: AuthService,private usuarioService: UsuarioService, private pedidoService: PedidoService,private confirmationService: ConfirmationService) {
    this.total = 0;
    this.platosEnCarrito = [];
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.usuarioService.getUsuario(this.email).subscribe((data) => {
        this.cliente = data;

    });
  });
  }

  ngOnInit() {
    this.columnas = [{field: 'id', header: 'Id'},
      {field: 'nombre', header: 'Nombre'},

    ];

  }

  // AGREGA EL PLATO ELEGIDO AL ARRAY DE CARRITO Y SI YA ESTA SUMA 1 EN CANTIDAD
agregarPlatoaCarrito(platoSelec: any, esArticulo: string){
    let platoCarro: PlatoCarrito;
    if(esArticulo == 'F'){
      platoCarro = {
        id: 0,
        cantidad: 1,
        plato: platoSelec,
        esArticulo: false
      }
    }else{
      platoCarro = {
        id: 0,
        cantidad: 1,
        plato: platoSelec,
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
  for (let plato of this.platosEnCarrito) {
    if (plato.plato.id == id && esArticulo ) {
      plato.cantidad = plato.cantidad + 1;
      return true;
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
      this.total = this.total + plato.plato.precioVenta;
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
      this.total = this.total - plato.plato.precioVenta;
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
    let pedido: Pedido = {
      id: 0,
  fecha: this.fecha.toLocaleString(),
  montoDescuento: this.montoDescuento,
  total: totalfinal,
  usuarioCliente: this.cliente,
  horaEstimadaFin: this.fecha.toLocaleTimeString(),
  tipoEnvio: this.tipoEnvio,
  estado: {id:2, nombre:'En cocina'},
  detalle: this.platosEnCarrito
    };
    this.pedidoService.postPedido(pedido).subscribe((res)=>{
        console.log('PEDIDO REALIZADO');
        console.log(res);
        this.limpiarCarrito();
        },
      err=>{
        console.log(" Error al enviar el pedido");
        console.log(err);
        alert(err.toString());
        return false;
      } );

}
// FIN DE CLASE
}


