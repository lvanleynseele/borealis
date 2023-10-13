const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the proto file
const PROTO_PATH = '../../proto/user.proto';
const options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true, };
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// Create the client stub
const LoadTester = grpc. loadPackageDefinition(packageDefinition). userPackage.UserService;
const client = new LoadTester( "localhost:50051", grpc. credentials. createInsecure() );

// Define the load test
const loadTest = {
  numRequests: 10000,
  concurrency: 100,
};

// Execute the load test
client.loadTest(loadTest, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Load test complete!");
  console.log("RPS:", res.rps);
  console.log("Average latency:", res.avgLatency);
});