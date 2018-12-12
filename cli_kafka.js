#! /usr/bin/env node

//Grab Provided Args
const [,, ...args] = process.argv


var Kafka = require('no-kafka');

var brokerUrls = 'kafka+ssl://ec2-34-252-251-111.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-33-144-103.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-32-227-197.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-33-222-49.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-33-184-243.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-34-255-143-98.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-33-228-169.eu-west-1.compute.amazonaws.com:9096,kafka+ssl://ec2-63-33-177-161.eu-west-1.compute.amazonaws.com:9096'.replace(/\+ssl/g,'');



var producer = new Kafka.Producer({
    connectionString: brokerUrls, // should match `listeners` SSL option in Kafka config
    ssl: {
      cert: './client.crt',
      key: './client.key'
    }
});


return producer.init().then(function(){
    console.log('Producer Initialied');
    console.log(producer);
    return producer.send({
        topic: 'santee-95622.accounts',
        partition: 0,
        message: {
            value: 'Hello!'
        },   
    }
    );
  })
  .then(function (result) {
    /*
    [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
    */
  });