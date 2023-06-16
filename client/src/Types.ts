export interface Route {

}

export interface Plant {

}

export interface Idx {

}

export interface Text {

}

export interface Note {

}

export interface Garden {

}

//******CANNOT FIND NON-NULL EXAMPLES  OF FAIL_CAUSE OR FEEDBACK HERE OR IN API DOCS, SO LEAVING THEM
//******AS NULL FOR NOW, BUT THIS COULD BE THE CAUSE OF AN ERROR LATER */
export interface IdentResponse {
  uploaded_datetime: string,
  images: 
    {
      file_name: string,
      url: string,
    }[],
  suggestions: 
    {
      id: number,
      plant_name: string,
      plant_details: {
        common_names: string[],
        url: string,
        wiki_description: {
          value: string,
          extract: string,
        },
        taxonomy: {
          class: string,
          family: string,
          genus: string,
          kingdom: string,
          order: string,
          phylum: string,
        },
        wiki_image: string,
        synonyms: string[],
        gbif_id: string,
        edible_parts: ("bulb" | "flowers" | "frond" | "fruit" | "gum" | "leaves" | "lichen" | "mushroom" | "nectar" | "nuts" | "seaweed" | "seeds" | "shoots" | "stems" | "tubers")[]| null,
        propagation_methods: ("cuttings" | "division" | "grafting" | "seeds" | "spores" | "suckers")[] | null,
        watering: {
          max: number,
          min: number,
        },
        language: string //could possibly get a list of available language abreviations from the api
        scientific_name: string,
        structured_name: {
          genus: string,
          species: string,
        },
      },
      probability: number,
    }[],
//******CANNOT FIND NON-NULL EXAMPLES  OF FAIL_CAUSE OR FEEDBACK HERE OR IN API DOCS, SO LEAVING THEM
//******AS NULL FOR NOW, BUT THIS COULD BE THE CAUSE OF AN ERROR LATER */
  fail_cause: null,
  countable: boolean,
  feedback: null,
  is_plant_probability: number,
  is_plant: boolean,
}