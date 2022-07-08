export interface User 
{
    ID: number,
    nombre: string,
    apellido: string,
    mail: string,
    password: string,
    telefono: number,
    grupoId: number
}

export interface UserCamel
{
    Id: number,
    Nombre: string,
    Email: string,
    Clave: string,
    Telefono: number,
    GrupoId: number
}