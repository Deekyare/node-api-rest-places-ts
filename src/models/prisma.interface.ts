export interface Place {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    imperdibles: number[];
    tipo: "place";
};

export interface POI {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    tipo: "poi";
}