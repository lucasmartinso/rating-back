import prisma from "../src/databases/prisma";

async function main() { 
    await prisma.$executeRaw`
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Chinese Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Japonese Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Italian Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Confectionery');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Fast-Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Arabic Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Vegan/Vegetarian');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Brasilian Food');
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Coffee'); 
        INSERT INTO "typeFoodPlaces" ("name") VALUES('Pizzeria');
    `;

    await prisma.$queryRaw`
        INSERT INTO states ("name") VALUES ('Acre');
        INSERT INTO states ("name") VALUES ('Alagoas');
        INSERT INTO states ("name") VALUES ('Amapá');
        INSERT INTO states ("name") VALUES ('Amazonas');
        INSERT INTO states ("name") VALUES ('Bahia');
        INSERT INTO states ("name") VALUES ('Ceará');
        INSERT INTO states ("name") VALUES ('Distrito Federal');
        INSERT INTO states ("name") VALUES ('Espírito Santo');
        INSERT INTO states ("name") VALUES ('Goiás');
        INSERT INTO states ("name") VALUES ('Maranhão');
        INSERT INTO states ("name") VALUES ('Mato Grosso');
        INSERT INTO states ("name") VALUES ('Mato Grosso do Sul');
        INSERT INTO states ( "name") VALUES ('Minas Gerais');
        INSERT INTO states ("name") VALUES ('Pará');
        INSERT INTO states ("name") VALUES ('Paraíba');
        INSERT INTO states ( "name") VALUES ('Paraná');
        INSERT INTO states ("name") VALUES ('Pernambuco');
        INSERT INTO states ( "name") VALUES ('Piauí');
        INSERT INTO states ( "name") VALUES ('Rio de Janeiro');
        INSERT INTO states ("name") VALUES ('Rio Grande do Norte');
        INSERT INTO states ( "name") VALUES ('Rio Grande do Sul');
        INSERT INTO states ("name") VALUES ('Rondônia');
        INSERT INTO states ( "name") VALUES ('Roraima');
        INSERT INTO states ("name") VALUES ('Santa Catarina');
        INSERT INTO states ("name") VALUES ('São Paulo');
        INSERT INTO states ("name") VALUES ('Sergipe');
        INSERT INTO states ("name") VALUES ('Tocantins');
    `

    await prisma.$queryRaw`
        INSERT INTO cities (code, "name", state_id) VALUES ('1100015','Alta Floresta D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100023','Ariquemes', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100031','Cabixi', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100049','Cacoal', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100056','Cerejeiras', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100064','Colorado do Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100072','Corumbiara', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100080','Costa Marques', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100098','Espigão D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100106','Guajará-Mirim', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100114','Jaru', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100122','Ji-Paraná', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100130','Machadinho D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100148','Nova Brasilândia D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100155','Ouro Preto do Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100189','Pimenta Bueno', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100205','Porto Velho', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100254','Presidente Médici', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100262','Rio Crespo', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100288','Rolim de Moura', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100296','Santa Luzia D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100304','Vilhena', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100320','São Miguel do Guaporé', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100338','Nova Mamoré', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100346','Alvorada D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100379','Alto Alegre dos Parecis', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100403','Alto Paraíso', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100452','Buritis', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100502','Novo Horizonte do Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100601','Cacaulândia', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100700','Campo Novo de Rondônia', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100809','Candeias do Jamari', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100908','Castanheiras', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100924','Chupinguaia', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1100940','Cujubim', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101005','Governador Jorge Teixeira', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101104','Itapuã do Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101203','Ministro Andreazza', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101302','Mirante da Serra', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101401','Monte Negro', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101435','Nova União', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101450','Parecis', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101468','Pimenteiras do Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101476','Primavera de Rondônia', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101484','São Felipe D''Oeste', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101492','São Francisco do Guaporé', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101500','Seringueiras', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101559','Teixeirópolis', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101609','Theobroma', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101708','Urupá', 22);
        INSERT INTO cities (code, "name", state_id) VALUES ('1101757','Vale do Anari', 22);
    `
}

main()
.catch(error => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });