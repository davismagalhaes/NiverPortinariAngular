var express = require("express");
var app = express()
let port = 3333
var data = [{"id": "1001", "name": "Customer 1001"},
            {"id": "1002", "name": "Customer 1002"},
            {"id": "1003", "name": "Customer 1003"}]

// Necessario para o POST
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// [*Rest: Para habilitar o CORS, evitando o erro: has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.listen(port, () => {
    console.log(`Acesse a lista a partir de: http://localhost:${port}/rest/customer`);
});

// Metodo POST: Cria novo registro
// Usando o Postman vc deve usar a opcao Body => x-www-form-urlencoded para preenchimento
app.post("/rest/customer", (req, res) => {
    console.log(`Post {${req.body.id}, ${req.body.name}}`)
    data.push(req.body)
    res.json({"status": "OK"})
});

// Metodo GET: Retorna lista, ex: http://localhost:3333/rest/customer
app.get("/rest/customer", (req, res) => {
    console.log(`Get: ALL`)
    res.json(data)
});

// Metodo GET: Retorna um ID, ex: http://localhost:3333/rest/customer/1001
app.get("/rest/customer/:id", (req, res) => {
    console.log(`Get: ${req.params.id}`)
    res.json( data.filter(el => el.id == req.params.id) )
});

// Metodo DELETE: Apaga um ID, ex: http://localhost:3333/rest/customer/1001
app.delete("/rest/customer/:id", (req, res) => {
    console.log(`Delete: ${req.params.id}`)
    data = data.filter(el => el.id !== req.params.id)
    res.json(data)
});
