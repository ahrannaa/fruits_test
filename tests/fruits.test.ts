import app from "../src/index";
import supertest from "supertest";
import  { FruitInput } from "../src/services/fruits-service";
import  { Fruit } from "../src/repositories/fruits-repository";

const api = supertest(app);

describe("test about fruits api",() => {
    it("POST:should create a valid fruit", async () => {
     
      const body: FruitInput =  {
      name: "banana",
      price: 200
    };

    const result = await api.post("/fruits").send(body)
    const status = result.status
    
    expect(status).toBe(201)
    console.log(result.body)
    });
    
    it("GET: values inside the object is valid", async () => {
      const result = await api.get("/fruits")
       expect(result.body).toEqual(expect.arrayContaining([expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
    })]))
       const status = result.status
       expect(status).toBe(200)
      });

    it("POST:should not create the same fruit", async () => {
      const result = await api.post("/fruits").send(
      {
        name: "banana",
        price: 200
      })
      const status = result.status
      expect(status).toBe(409)
  
      });

    it("GET:should return all fruits", async () => {
     const result = await api.get("/fruits")
     const response = result.body
     const status = result.status

     expect(status).toBe(200)
     expect(response.length).toBe(1)
    });

    it("GET:should return fruits by id", async () => {
      
      const result = await api.get("/fruits/1")
      const response = result.body
      const status = result.status
      const body: Fruit = {
        id:1,
        name: "banana",
        price: 200
      }
      expect(response).toEqual(body)
      expect(status).toBe(200)
     });

     it("GET:should not return fruits by id", async () => {
      const result = await api.get("/fruits/0")
      const status = result.status
 
      expect(status).toBe(404)
      
     });
 
});