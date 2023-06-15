exports.cleaned = {
	_id: '6485a7adb549e4092957069c',
	plant_name: 'Dracaena trifasciata',
	personal_name: 'Mom',
	uploaded_datetime: {$date: {$numberLong: '1686260531462'}},
	images: [
		{
			file_name: '49c6ad531c8e4e969c1630841861097b.jpg',
			url: 'https://plant.id/media/images/49c6ad531c8e4e969c1630841861097b.jpg',
			_id: {$oid: '6486dac99771dc872ac86cb0'},
		},
	],
	plant_details: {
		common_names: ['Snake plant', "Mother-in-law's tongue", "Viper's bowstring hemp", "Saint George's sword"],
		url: 'https://en.wikipedia.org/wiki/Dracaena_trifasciata',
		wiki_description: {
			value: 'Species of Asparagaceae',
			extract:
				"Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names. Until 2017, it was known under the synonym Sansevieria trifasciata.",
		},
		taxonomy: {
			class: 'Magnoliopsida',
			family: 'Asparagaceae',
			genus: 'Dracaena',
			kingdom: 'Plantae',
			order: 'Asparagales',
			phylum: 'Magnoliophyta',
		},
		wiki_image:
			'https://plant-id.ams3.cdn.digitaloceanspaces.com/plant_id_knowledge_base/1c6/e0d63a351532d3c391092a5f12dfb.jpg',
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
		watering: {max: {$numberInt: '1'}, min: {$numberInt: '1'}},
		language: 'en',
		scientific_name: 'Dracaena trifasciata',
		structured_name: {genus: 'dracaena', species: 'trifasciata'},
	},
	note: 'Found on desk',
};
