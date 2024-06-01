/*
    CIT 281 Project 3
    Name: Jeremy Meltzer
*/

const fs = require("fs");
const fastify = require("fastify")();
const {coinCount} = require("./p3-module");

/* I completed this part before learning about it in class. I used https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs and
https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname to help me. */

fastify.get("/", (request, reply) => {
    const path = require('path')
    const dirname = path.join(__dirname, "index.html")
    fs.readFile(dirname, (err, data) => {
        if (err) {
            reply
            .code(500)
          } else {
            reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
          }
    })})

fastify.get("/coin", (request, reply) => {
  const {denom = 0, count = 0} = request.query
  const coinValue = coinCount({denom, count})
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });

fastify.get("/coins", (request, reply) => {
  const {option} = request.query
  const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
  switch (parseInt(option)) {
    case 1:
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;
    case 2:
      coinValue = coinCount(...coins);
      break;
    case 3:
      coinValue = coinCount(coins);
      break;
    default:
      coinValue = 0;
  }
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });
    
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(`Server listening on ${address}`);
    });
