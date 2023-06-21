import './Garden.css';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlantName, viewPlant, unselectPlant, changeAppRoute } from '../../reduxFiles/actions';
import { updatePlant } from '../../service/APIClient';
import { waterDrops } from '../../service/helper.service';
// import { RootState } from '../../store';
// import PlantInfo from '../Plant/Plant';
import { Plant } from '../../Types';


function PlantTile({ plant, idx }: { plant: Plant, idx: number }) {
    const dispatch = useDispatch();

    // console.log('Plant:', idx);
    const { plant_name, _id, api_id, personal_name, plant_details } = plant;
    const { watering } = plant_details;
    const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

    function selectPlant() {
        dispatch(viewPlant((idx)));
        dispatch(changeAppRoute('plantInfo'));
    }

    function changeName(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
        if ((e.target as HTMLElement).localName === 'button') {
            const input = document.getElementById(`name-field-${_id}`) as HTMLInputElement;
            input.readOnly = false;
            input.focus();
        } else {
            dispatch(changePlantName((e.target as HTMLInputElement).value, _id));
        }
    }

    async function writeTrueFalse(e: React.FocusEvent<HTMLInputElement, Element> | React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
        const inputElement = e.target as HTMLInputElement;
        const personal_name: string = inputElement.value;
        inputElement.readOnly = !inputElement.readOnly;

        if (inputElement.readOnly) {
            if (plant._id) updatePlant({ _id, personal_name });
            else updatePlant({ api_id, personal_name });
        }
    }

    useEffect(() => {
        dispatch(unselectPlant());
    }, []);

    return (
        <div key={_id}>
            <div className="card-plant">
                <div className="card-img garden">
                    <img
                        src={plant.images[0].url}
                        alt={`picture of ${plant_name}`}
                        onClick={selectPlant}></img>
                </div>
                <div className="card-box-garden">
                    <div className="input-garden">
                        <input
                            type={'text'}
                            id={`name-field-${_id}`}
                            value={personal_name}
                            onChange={changeName}
                            onDoubleClick={writeTrueFalse}
                            onBlur={writeTrueFalse}
                            readOnly={true}
                        />
                        <button onClick={changeName}>🖋️</button>
                        <p>{plant_name}</p>
                    </div>
                    <div className="water-garden">
                        <h3>{maxWater[0]}</h3>
                        <p>{maxWater[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PlantTile