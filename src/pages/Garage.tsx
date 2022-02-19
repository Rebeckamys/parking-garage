import { useEffect, useState } from "react";
import FloorOverview from '../components/FloorOverview/FloorOverview';
import { IFloor, IGarage } from '../interfaces';
import { Button, ButtonGroup } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Garage = () => {
    const [garage, setGarage] = useState<IGarage>({ floors: [] as IFloor[] });
    const [sortedType, setSortedType] = useState('none' as 'none' | 'asc' | 'desc');

    useEffect(() => {
        fetch('https://adp.im/api/garage.json')
            .then(response => response.json())
            .then((data) => { setGarage(data) })
            .catch(e => console.error(e));
    }, []);

    const sort = () => {
        switch (sortedType) {
            case 'none':
                setSortedType('asc');
                sortMostAvailableFloors('asc');
                break;
            case 'asc':
                setSortedType('desc');
                sortMostAvailableFloors('desc');
                break;
            case 'desc':
                setSortedType('none');
                sortOnFloorNumber();
                break;
            default: console.error('Unknown sorting type');
                break;
        }
    }

    const sortOnFloorNumber = () => {
        const sorted = garage.floors.sort((a, b) => a.floor - b.floor);
        setGarage({ ...garage, floors: sorted });
    }

    const sortMostAvailableFloors = (direction: 'asc' | 'desc') => {
        const sorted = garage.floors.sort((a, b) => { return getNumberOfAvailableSpots(b) - getNumberOfAvailableSpots(a) });
        if (direction === 'asc') {
            setGarage({ ...garage, floors: sorted });
        } else {
            setGarage({ ...garage, floors: sorted.reverse() });
        }
    }


    const getNumberOfAvailableSpots = (floor: IFloor) => {
        return floor.parking_spots.filter(s => s.is_available).length;
    }

    const getSortIcon = () => {
        if (sortedType === 'asc')
            return <ArrowDownwardIcon />;
        if (sortedType === 'desc')
            return <ArrowUpwardIcon />;
        return <></>;
    }


    return (
        <>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={() => sort()} color="secondary" variant="text" endIcon={getSortIcon()}> Sortera på mest lediga</Button>
            </ButtonGroup>
            {
                garage.floors.map((floor: IFloor, index: number) =>
                    <div key={index}>
                        <FloorOverview {...floor} />
                    </div>
                )
            }

        </>
    );

}
export default Garage;