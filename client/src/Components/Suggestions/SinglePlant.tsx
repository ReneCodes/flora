/// <reference path="../../index.d.ts" />
import './Suggestions.css';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Image, Plant } from '../../Types';
import { waterDrops, cleanAndPushPlant } from '../../service/helper.service';
import { addPlantToGarden, changeAppRoute } from '../../reduxFiles/actions';

function PlantProbability({ probability }: { probability: number }) {
    const percent: number = Math.round(probability * 100);

    if (probability < 0.2) return <h2 className="blob red">Low {percent}%</h2>;
    if (probability < 0.6 && probability >= 0.2) {
        return <h2 className="blob yellow">Medium {percent}%</h2>;
    }
    return <h2 className="blob green">High {percent}%</h2>;
}


function SinglePlant({ suggestion, images }: { suggestion: Plant, images: Image[] }): React.JSX.Element {
    const dispatch = useDispatch();
    const { plant_name, plant_details, probability } = suggestion;
    const { common_names, wiki_image, wiki_description, watering } = plant_details;
    const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

    async function addToMyGarden() {
        const cleanedPlant: Plant = await cleanAndPushPlant(suggestion, images);
        //in theory, what is causing the error below is covered in the helperfunction
        //but I will need to double check the ability to add properties to a type
        //I may need to add them initialized to null from the start.
        dispatch(addPlantToGarden(cleanedPlant));
        dispatch(changeAppRoute('garden'));
    }

    return (
        <div className="suggestion-card">
            <div className="suggestion-image">
                <h2>{plant_name}</h2>
                <img
                    src={wiki_image}
                    alt={`picture of ${plant_name}`}
                />
            </div>
            <div className="propability-box">
                <h3>Propability</h3>
                <PlantProbability probability={probability!}></PlantProbability>
            </div>
            <div className="propability-box">
                <h3>Watering</h3>
                <h3>{maxWater[0]}</h3>
                <h3>{maxWater[1]}</h3>
            </div>
            <div className="propability-box description">
                <h3>Description</h3>
                <p className="blob green">{wiki_description.value}</p>
                <p>{wiki_description.extract}</p>
            </div>
            <button
                className="btn-add-plant"
                onClick={addToMyGarden}>
                Add To Your Garden
            </button>
        </div>
    );
}


export default SinglePlant