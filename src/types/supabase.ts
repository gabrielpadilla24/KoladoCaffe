
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

interface Pedido {
  id: number;
  id_producto: number;
  datos_cliente: {
    nombre: string;
    email: string;
  };
  fecha_pedido: string; // La manejaremos como string de fecha/hora
  monto_total: number;
}

// Exportamos las interfaces
export type { Producto, Pedido };