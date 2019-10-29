function generatePlot01(person, planet) {



    return {
        title: 'Hero on the rescue mission again',
        description: `
           On the planet ${planet}, orphaned children are made to steal to survive. Young adult ${person} make an escape from a local gang.
            he bribes an Imperial officer with stolen coaxium (a powerful hyperspace fuel) for passage on an outgoing transport, but ${person} is apprehended before he can board. 
            When the recruiting officer asks for his surname, ${person} explains that he is alone with no family, so the recruiter gives him the last name "Solo".
        `
    };
}

function generatePlot(characters,planets) {

    return generate(characters.name,planets.name);
}

function generate(person, planet, starship, vehicle, species) {

    if (!starship && !vehicle && !species) {
        return generatePlot01(person, planet);
    }



}

export { generatePlot }
