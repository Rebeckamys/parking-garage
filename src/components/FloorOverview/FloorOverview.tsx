import './FloorOverview.css';
import { IFloor } from '../../interfaces';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import FloorDetails from '../FloorDetails/FloorDetails';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AccessibleIcon from '@mui/icons-material/Accessible';


const FloorOverview = (floor: IFloor) => {

    const totalCarParkingSpots = floor.parking_spots.filter(spot => spot.type === 'car');
    const availableCarParkingSpots = totalCarParkingSpots.filter(spot => spot.is_available);

    const totalChargingStations = floor.parking_spots.filter(spot => spot.is_charging_station);
    const availableChargingStations = totalChargingStations.filter(spot => spot.is_available);

    const totalDisabledSpots = floor.parking_spots.filter(spot => spot.is_disabled_parking);
    const availableDisabledSpots = totalDisabledSpots.filter(spot => spot.is_available);

    const totalMcSpots = floor.parking_spots.filter(spot => spot.type === 'mc');
    const availableMcSpots = totalMcSpots.filter(spot => spot.is_available);

    const floorName = floor.floor === 0 ? 'Entréplan' : `Plan ${floor.floor}`;

    const floorInformationClassName = (availableCarParkingSpots: number, totalCarParkingSpots: number) => {
        let className = 'floor-information';
        className += availableCarParkingSpots === totalCarParkingSpots ? ' available' : ' available';
        return className;
    }

    return (
        <Accordion className="floor-overview-container" elevation={3}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Grid container>
                    <Grid item xs={12} md={1}><span className="floor-heading">{floorName}</span></Grid>
                    <Grid item xs={6} md={1} className={floorInformationClassName(availableCarParkingSpots.length, totalCarParkingSpots.length)}>
                        <DirectionsCarIcon /> {availableCarParkingSpots.length}/{totalCarParkingSpots.length} kvar
                    </Grid>
                    <Grid item xs={6} md={1} className={floorInformationClassName(availableChargingStations.length, totalChargingStations.length)}>
                        <ElectricCarIcon /> {availableChargingStations.length}/{totalChargingStations.length} kvar
                    </Grid>
                    <Grid item xs={6} md={1} className={floorInformationClassName(availableMcSpots.length, totalMcSpots.length)}>
                        <TwoWheelerIcon /> {availableMcSpots.length}/{totalMcSpots.length} kvar
                    </Grid>
                    <Grid item xs={6} md={1} className={floorInformationClassName(availableDisabledSpots.length, totalDisabledSpots.length)}>
                        <AccessibleIcon />  {availableDisabledSpots.length}/{totalDisabledSpots.length} kvar
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <FloorDetails {...floor} />
            </AccordionDetails>
        </Accordion>
    );

}
export default FloorOverview;