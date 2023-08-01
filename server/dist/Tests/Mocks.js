"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mocks = void 0;
const plant1 = {
    plant_name: 'Phlebodium aureum',
    personal_name: '',
    uploaded_datetime: '2023-06-08T21:42:11.462Z',
    images: [
        {
            file_name: '825b5a704ae64b27a429a7b4afac8913.jpg',
            url: 'https://plant.id/media/images/825b5a704ae64b27a429a7b4afac8913.jpg',
        },
    ],
    plant_details: {
        common_names: ['golden polypody', 'golden serpent fern', 'cabbage palm fern', 'gold-foot fern', 'blue-star fern'],
        url: 'https://en.m.wikipedia.org/wiki/Phlebodium_aureum',
        wiki_description: {
            value: 'Species of fern',
            extract: 'Phlebodium aureum is an epiphytic fern native to tropical and subtropical regions of the Americas.',
        },
        taxonomy: {
            class: 'Polypodiopsida',
            family: 'Polypodiaceae',
            genus: 'Phlebodium',
            kingdom: 'Plantae',
            order: 'Polypodiales',
            phylum: 'Magnoliophyta',
        },
        wiki_image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Starr_050107-2831_Phlebodium_aureum.jpg',
        synonyms: [
            'Chrysopteris aurea',
            'Chrysopteris grandis',
            'Chrysopteris martinicensis',
            'Chrysopteris microdictya',
            'Chrysopteris pulvinata',
        ],
        gbif_id: '2650479',
        edible_parts: null,
        propagation_methods: null,
        watering: {
            max: 2,
            min: 2,
        },
        language: 'en',
        scientific_name: 'Phlebodium aureum',
        structured_name: {
            genus: 'phlebodium',
            species: 'aureum',
        },
    },
    note: '',
};
const plant2 = {
    plant_name: 'Oxalis triangularis',
    personal_name: '',
    uploaded_datetime: '2023-06-08T21:42:11.462Z',
    images: [
        {
            file_name: '097e2e2385884ceba8375e21cbd272c5.jpg',
            url: 'https://plant.id/media/images/097e2e2385884ceba8375e21cbd272c5.jpg',
        },
    ],
    plant_details: {
        common_names: ['false shamrock'],
        url: 'https://en.wikipedia.org/wiki/Oxalis_triangularis',
        wiki_description: {
            value: 'Species of shamrock',
            extract: 'Oxalis triangularis, commonly called false shamrock, is a species of edible perennial plant in the family Oxalidaceae. It is native to several countries in southern South America. This woodsorrel is typically grown as a houseplant but can be grown outside in USDA climate zones 8a–11, preferably in light shade.\nThe deep maroon leaves are trifoliate, like species in the clover genus Trifolium which are commonly called shamrock, hence the name “false shamrock”. An interesting feature is that the leaves close like an umbrella at night (See the timelapse video below) or when disturbed or if kept under harsh sunlight. The white or pale pink five-petalled flowers also close at night.',
        },
        taxonomy: {
            class: 'Magnoliopsida',
            family: 'Oxalidaceae',
            genus: 'Oxalis',
            kingdom: 'Plantae',
            order: 'Oxalidales',
            phylum: 'Magnoliophyta',
        },
        wiki_image: 'https://plant-id.ams3.cdn.digitaloceanspaces.com/plant_id_knowledge_base/23b/0f1adfec432a7278f3686e89571e3.jpg',
        synonyms: [
            'Acetosella oxyptera',
            'Acetosella papilionacea',
            'Acetosella regnellii',
            'Acetosella triangularis',
            'Acetosella yapacaniensis',
        ],
        gbif_id: '2650479',
        edible_parts: ['flowers', 'leaves'],
        propagation_methods: null,
        watering: {
            max: 2,
            min: 2,
        },
        language: 'en',
        scientific_name: 'Oxalis triangularis',
        structured_name: {
            genus: 'oxalis',
            species: 'triangularis',
        },
    },
    note: '',
};
const plant3 = {
    plant_name: 'Dracaena trifasciata',
    personal_name: '',
    uploaded_datetime: '2023-06-08T21:42:11.462Z',
    images: [
        {
            file_name: '49c6ad531c8e4e969c1630841861097b.jpg',
            url: 'https://plant.id/media/images/49c6ad531c8e4e969c1630841861097b.jpg',
        },
    ],
    plant_details: {
        common_names: ['Snake plant', "Mother-in-law's tongue", "Viper's bowstring hemp", "Saint George's sword"],
        url: 'https://en.wikipedia.org/wiki/Dracaena_trifasciata',
        wiki_description: {
            value: 'Species of Asparagaceae',
            extract: "Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names. Until 2017, it was known under the synonym Sansevieria trifasciata.",
        },
        taxonomy: {
            class: 'Magnoliopsida',
            family: 'Asparagaceae',
            genus: 'Dracaena',
            kingdom: 'Plantae',
            order: 'Asparagales',
            phylum: 'Magnoliophyta',
        },
        wiki_image: 'https://plant-id.ams3.cdn.digitaloceanspaces.com/plant_id_knowledge_base/1c6/e0d63a351532d3c391092a5f12dfb.jpg',
        synonyms: [
            'Chrysopteris aurea',
            'Chrysopteris grandis',
            'Chrysopteris martinicensis',
            'Chrysopteris microdictya',
            'Chrysopteris pulvinata',
        ],
        gbif_id: null,
        edible_parts: ['flowers'],
        propagation_methods: null,
        watering: {
            max: 1,
            min: 1,
        },
        language: 'en',
        scientific_name: 'Dracaena trifasciata',
        structured_name: {
            genus: 'dracaena',
            species: 'trifasciata',
        },
    },
    note: '',
    api_id: '1234',
};
exports.Mocks = {
    plant1,
    plant2,
    plant3,
    plants: [plant1, plant2, plant3],
};
