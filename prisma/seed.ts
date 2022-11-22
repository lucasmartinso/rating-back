import prisma from "../src/databases/prisma";
import { cities, states, typeFoodPlaces } from "@prisma/client";

function type(): Omit<typeFoodPlaces, 'id'>[] { 
    const foodType: Omit<typeFoodPlaces, 'id'>[] = [
        { name: 'Chinese Food'}, 
        { name: 'Japonese Food'}, 
        { name: 'Italian Food'},
        { name: 'Confectionery'},
        { name: 'Fast-Food'},
        { name: 'Arabic Food'},
        { name: 'Vegan/Vegetarian'},
        { name: 'Brasilian Food'},
        { name: 'Coffee'},
        { name: 'Pizzeria'},
    ]

    return foodType;
}

function allStates(): Omit<states, 'id'>[] { 
    const states: Omit<states, 'id'>[] = [
        { name: 'Acre'}, 
        { name: 'Alagoas'}, 
        { name: 'Amapá'},
        { name: 'Amazonas'},
        { name: 'Bahia'},
        { name: 'Ceará'},
        { name: 'Distrito Federal'},
        { name: 'Espírito Santo'},
        { name: 'Goiás'},
        { name: 'Maranhão'},
        { name: 'Mato Grosso'},
        { name: 'Mato Grosso do Sul'},
        { name: 'Minas Gerais'},
        { name: 'Pará'},
        { name: 'Paraíba'},
        { name: 'Paraná'},
        { name: 'Pernambuco'},
        { name: 'Piauí'},
        { name: 'Rio de Janeiro'},
        { name: 'Rio Grande do Norte'},
        { name: 'Rio Grande do Sul'},
        { name: 'Rondônia'},
        { name: 'Roraima'},
        { name: 'Santa Catarina'},
        { name: 'São Paulo'},
        { name: 'Sergipe'},
        { name: 'Tocantins'},
    ]

    return states;
}

function someCitys():  Omit<cities, 'id'>[]{ 
    const cities:  Omit<cities, 'id'>[] = [
        {code: 1100015, name: `Alta Floresta D''Oeste`, state_id: 22},
        {code: 1100023, name: 'Ariquemes', state_id: 22},
        {code: 1100031, name: 'Cabixi', state_id: 22},
        {code: 1100049, name: 'Cacoal', state_id: 22},
        {code: 1100056, name: 'Cerejeiras', state_id: 22},
        {code: 1100064, name: 'Colorado do Oeste', state_id: 22},
        {code: 1100072, name: 'Corumbiara', state_id: 22},
        {code: 1100080, name: 'Costa Marques', state_id: 22},
        {code: 1100098, name: `Espigão D''Oeste`, state_id: 22},
        {code: 1100106, name: 'Guajará-Mirim', state_id: 22},
    ]

    return cities;
}

async function main() { 
    const types: Omit<typeFoodPlaces, 'id'>[] = type();
    const states: Omit<states, 'id'>[] = allStates();
    const cities: Omit<cities, 'id'>[] = someCitys();

    await prisma.typeFoodPlaces.createMany({data: types, skipDuplicates: true})
    await prisma.states.createMany({data: states, skipDuplicates: true});
    await prisma.cities.createMany({data: cities, skipDuplicates: true});
}

main()
.catch(error => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });