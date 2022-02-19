import './FloorDetails.css';
import { IFloor, IParkingSpot } from '../../interfaces';
import Card from '@mui/material/Card';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import AccessibleIcon from '@mui/icons-material/Accessible';

const getParkingSpotClassName = (parkingSpot: IParkingSpot) => {
    let className = 'parking-spot'
    if (parkingSpot.is_available) {
        className += ' available';
    }

    return className;
}

const getVehicleIcon = (parkingSpot: IParkingSpot) => {
    if (parkingSpot.type === 'mc') {
        return <TwoWheelerIcon />;
    }
    if (parkingSpot.is_charging_station) {
        return <ElectricCarIcon color="warning" />;
    }
    return <DirectionsCarIcon></DirectionsCarIcon>;
}

const FloorDetails = (props: IFloor) => {
    return (
        <>
            <Grid container className="floor-details-container">
                {props.parking_spots.map((parkingSpot: IParkingSpot, index: number) =>
                    <Grid item key={index}>
                        <Card className={getParkingSpotClassName(parkingSpot)}>
                            <LocalParkingIcon />{parkingSpot.number}
                            <br />
                            {getVehicleIcon(parkingSpot)}
                            {parkingSpot.is_disabled_parking &&
                                <AccessibleIcon />}
                        </Card>
                    </Grid>
                )}
            </Grid>
            <Divider variant="middle" />
            <Grid container >
                <Grid item>
                    <Card className="parking-spot available explanation">Tillgänglig</Card>
                </Grid>
                <Grid item>
                    <Card className="parking-spot explanation">Upptagen</Card>
                </Grid>
            </Grid>
        </>
    );
}
export default FloorDetails;