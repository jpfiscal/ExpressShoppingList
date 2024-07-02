process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require('./index');
let items = require('./fakeDb');

beforeEach(function(){
    items.push({
        "name": "rambutang",
        "price": 11.99
    });
})

afterEach(function(){
    items.length = 0;
})

describe("GET /items", function() {
    test("Get a list of items form shopping cart", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{"name":"rambutang", "price":11.99}]);
    });
});

describe("GET /items/:name", function(){
    test("Get a single item from shopping cart", async function(){
        const resp = await request(app).get(`/items/rambutang`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {
            "name": "rambutang",
            "price":11.99
        }});
    });
});

describe("PATCH /items/:name", function(){
    test("Update an existing item in the shopping cart", async function(){
        const resp = await request(app).patch('/items/rambutang')
            .send({
                "name": "spikey fruit",
                "price": 500.00
            })
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated:{
            "name": "spikey fruit",
            "price": 500.00
        }});
    });
});

describe("POST /items/:name", function(){
    test("Add an item to the shopping list", async function(){
        const resp = await request(app).post('/items')
            .send({
                "name": "Bear Paws",
                "price": 5.99
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({item: {
            "name": "Bear Paws",
            "price": 5.99
        }});
    });
});

describe("DELETE /items/:name", function(){
    test("Delete a single item from shopping cart", async function(){
        const resp = await request(app).delete(`/items/rambutang`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"message": "Deleted"});
    })
})