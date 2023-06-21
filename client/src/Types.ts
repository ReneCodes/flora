export interface Route {

}

export interface Plant {
  _id?: string,
  plant_name: string,
  personal_name: string,
  uploaded_datetime: string,
  images: Image[]
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
    edible_parts: ("bulb" | "flowers" | "frond" | "fruit" | "gum" | "leaves" | "lichen" | "mushroom" | "nectar" | "nuts" | "seaweed" | "seeds" | "shoots" | "stems" | "tubers")[] | null,
    propagation_methods: ("cuttings" | "division" | "grafting" | "seeds" | "spores" | "suckers")[] | null,
    watering?: {
      max: 1 | 2 | 3,
      min: 1 | 2 | 3,
    },
    watering_info?: string,
    language: string,
    scientific_name: string,
    structured_name: {
      genus: string,
      species: string,
    },
  },
  note?: string,
  api_id?: string,
  id?: string,
  probability?: number,

}


export interface Action {
  type: string, //'INSERT', 'CHANGE_NAME', etc
  payload: Route | Plant | Plant[] | number | string | null,
  idx: number | null,
}

//******CANNOT FIND NON-NULL EXAMPLES  OF FAIL_CAUSE OR FEEDBACK HERE OR IN API DOCS, SO LEAVING THEM
//******AS NULL FOR NOW, BUT THIS COULD BE THE CAUSE OF AN ERROR LATER */

// export interface SuggestionType {
//   plant_name: string,
//   personal_name: string | "",
//   uploaded_datetime: Date,
//   images: Image[],
//   probability?: number,
//   plant_details: {
//     common_names: string[],
//     url: string,
//     wiki_description: {
//       value: string,
//       extract: string,
//     },
//     taxonomy: {
//       class: string,
//       family: string,
//       genus: string,
//       kingdom: string,
//       order: string,
//       phylum: string,
//     },
//     wiki_image: string,
//     synonyms: string[],
//     gbif_id: string,
//     edible_parts: ("bulb" | "flowers" | "frond" | "fruit" | "gum" | "leaves" | "lichen" | "mushroom" | "nectar" | "nuts" | "seaweed" | "seeds" | "shoots" | "stems" | "tubers")[] | null,
//     propagation_methods: ("cuttings" | "division" | "grafting" | "seeds" | "spores" | "suckers")[] | null,
//     watering?: {
//       max: 1 | 2 | 3,
//       min: 1 | 2 | 3,
//     },
//     watering_info?: string,
//     language: string //could possibly get a list of available language abreviations from the api
//     scientific_name: string,
//     structured_name: {
//       genus: string,
//       species: string,
//     },
//   },
//   note?: string,
//   api_id?: number,
//   id?: number,
// }

export interface Image {
  file_name: string,
  url: string,
}

export interface IdentResponse {
  uploaded_datetime: string,
  images: Image[],
  suggestions: Plant[],
  //******CANNOT FIND NON-NULL EXAMPLES  OF FAIL_CAUSE OR FEEDBACK HERE OR IN API DOCS, SO LEAVING THEM
  //******AS NULL FOR NOW, BUT THIS COULD BE THE CAUSE OF AN ERROR LATER */
  fail_cause: null,
  countable: boolean,
  feedback: null,
  is_plant_probability: number,
  is_plant: boolean,
}