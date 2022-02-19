export interface IGarage {
    floors: IFloor[];
}
export interface IFloor {
    floor: number;
    parking_spots: IParkingSpot[];
}

export interface IParkingSpot {
    number: number;
    type: string;
    price: number;
    is_available: boolean;
    is_charging_station: boolean;
    is_disabled_parking: boolean;
}