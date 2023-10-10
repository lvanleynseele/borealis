'use strict';

import { start } from "repl";

const { Client } = require('pg');
const path = require('path');
const config = require('../../awsConfig.json')['development'];


export const auroraClient = new Client(  {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.username,
  password: config.password
});


export function startAuroraServer(){
  auroraClient.connect();
}


