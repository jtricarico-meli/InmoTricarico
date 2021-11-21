import { User } from "./user";

export interface Inmueble 
{
    id: number,
    direccion: string,
    superficie: number,
    latitud: number,
    longitud: number,
    propietarioId: number,
    propietario: User
    grupoId: number
}

export interface InmuebleCamel 
{
    Id: number,
    Direccion: string,
    Superficie: number,
    Latitud: number,
    Longitud: number,
    PropietarioId: number,
    GrupoId: number
}