import { User } from "./user";

export interface Inmueble 
{
    ID: number,
    direccion: string,
    ambientes: number,
    tipo: string,
    uso: string,
    precio: number,
    disponible: boolean
    latitud: number
    longitud: number
    propietario: string
}

export interface InmuebleCamel 
{
    Id: number,
    Direccion: string,
    Ambientes: number,
    Tipo: string,
    Uso: string,
    Precio: number,
    Disponible: boolean
}