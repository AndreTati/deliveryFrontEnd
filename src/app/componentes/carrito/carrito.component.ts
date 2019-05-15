import { Component, OnInit } from '@angular/core';
import { Plato } from "../../Modelo/Plato";
import {PlatoCarrito} from "../../Modelo/PlatoCarrito";
import {Pedido} from "../../Modelo/Pedido";
import {AuthService} from "../../servicios/auth.service";
import {UsuarioService} from "../../servicios/usuario/usuario.service";
import {Usuario} from "../../Modelo/Usuario";



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public email: string;
  public tipoEnvio: string;
  public platosEnCarrito: PlatoCarrito[];
  public total: number;
  public carritoMenu: boolean;
  public date: Date;
  private columnas: any[];
  public cliente: Usuario;
  constructor(private att: AuthService,private usuarioService: UsuarioService) {
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
agregarPlatoaCarrito(platoSelec: Plato){
let platoCarro: PlatoCarrito = {
  cantidad: 1,
  plato: platoSelec
}
if(this.existePlato(platoSelec.id)){

    console.log("SE SUMO UN PLATO IGUAL");
  this.total = this.total + 20;
  }else{
    this.platosEnCarrito = [...this.platosEnCarrito,platoCarro];
    this.total = this.total + 20;

    console.log(this.platosEnCarrito);
  }
    console.log(platoSelec);
    console.log(this.platosEnCarrito);


}



// BUSCO SI ESE PLATO YA EXISTE EN EL CARRITO
existePlato(id: number): boolean {
  for (let plato of this.platosEnCarrito) {
    if (plato.plato.id == id) {
      plato.cantidad = plato.cantidad + 1;
      return true;
    }
  }
  return false;
}

// SUMAR CANTIDAD DEL PLATO
  sumarCantidad(plato: PlatoCarrito){
    console.log('SUMO');

   this.total = this.total + 20;
   console.log(this.platosEnCarrito);
  }

// RESTAR CANTIDAD DEL PLATO
  restarCantidad(plato: PlatoCarrito) {
    console.log('RESTO');
    plato.cantidad--;
    if(plato.cantidad == 0){
  let idx = this.platosEnCarrito.indexOf(plato);
  this.platosEnCarrito.splice(idx,1);
  this.total = this.total - 20;
    }else{
  this.total = this.total - 20;
    }
    console.log(this.platosEnCarrito);
  }
// METODO QUE ENVIA EL PEDIDO DEL CLIENTE (CONFIRMA)
mandarPedido(){
    let pedido: Pedido = {
      id: 0,
  fecha: this.date.toLocaleString(),
  montoDescuento: null,
  total: this.total,
  usuarioCliente: this.cliente,
  horaEstimadaFin: '',
  tipoEnvio: '',
  estado: {id:2, nombre:'En cocina'},
  detalle: []
    };
}
// FIN DE CLASE
}


