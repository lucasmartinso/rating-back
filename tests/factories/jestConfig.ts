import supertest from "supertest";
import app from "../../src/index"

export default function server() { 
    const server = supertest(app); 
    jest.setTimeout(30000);

    return server;
}