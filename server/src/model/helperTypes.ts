interface IdentResult {

}

interface Image {
  file_name: string,
  url: string,
}

interface Plant {
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
    gbif_id: string | null,
    edible_parts: ("bulb" | "flowers" | "frond" | "fruit" | "gum" | "leaves" | "lichen" | "mushroom" | "nectar" | "nuts" | "seaweed" | "seeds" | "shoots" | "stems" | "tubers")[]| null,
    propagation_methods: ("cuttings" | "division" | "grafting" | "seeds" | "spores" | "suckers")[] | null,
    watering?: {
      max: number,
      min: number,
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
  custom_id?:string,
  id?:number,
  meta_data?: any,
  finished_datetime?:Date, 
  modifiers?:string[],
  secret?:string,
  confirmed?: boolean,
  probability?:number,
}

interface WikiPlantData {
  description: string,
  extract:string, 
  originalimage:string, 
  url:string,
}