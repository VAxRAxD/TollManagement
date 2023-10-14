let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
var abi_code =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "number",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "vtype",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "records",
				"type": "string[]"
			}
		],
		"name": "vehicleCreationEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_number",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_direction",
				"type": "uint256"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "countVehicles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vehicleId",
				"type": "string"
			}
		],
		"name": "getParticularVehicle",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVehicles",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_number",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vtype",
				"type": "string"
			}
		],
		"name": "registerVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vehicleIdList",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var address = "0xD4fA22975E47aFDE6F78b11B5b01Be85dB460A96";
let contract = new web3.eth.Contract(abi_code, address);
var owner = "0xCec64E2efbe58f3b4773Fb75856212aD75A0cEDA";

function regVehicles() {
  const form = document.getElementById("addForm");
  const num = document.getElementById("no").value;
  const ctype = document.getElementById("v_type").value;
  contract.methods
    .registerVehicle(num, ctype)
    .send({ from: owner, gas: 3000000 });
  form.reset();
  alert("Vehicle registered successfully!!");
}

function countVehicles() {
  contract.methods
    .countVehicles()
    .call()
    .then((value) => {
      const x = parseInt(value["_hex"], 16);
      alert("Total number of vehicles came inside city : " + x);
    });
}

function getParticularVehicle() {
  const form = document.getElementById("prtvehForm");
  const vid = document.getElementById("vp_id").value;
  contract.methods
    .getParticularVehicle(vid)
    .call()
    .then((value) => {
      var track="";
      const details = value;
      const id = details[0];
      const ctype = details[1];
      const records = details[2];
      for (let i=0;i<records.length;i++){
        track+=records[i]+"\n"
      }
      alert("Number: "+id+" Vehicle type: "+ctype+"\nRecords:\n"+track)
    });
  form.reset();
}

function recordVehicles() {
  const form = document.getElementById("recForm");
  const vid = document.getElementById("v_id").value;
  const date = document.getElementById("v_det").value;
  const dir = document.getElementById("v_dir").value;
  var x=0;
  if(dir=="IN"){
    x=1;
  }
  contract.methods.addRecord(vid,date,x).send({ from: owner, gas: 3000000 });
  form.reset();
  alert("Vehicle record added successfully!!");
}

function getAllVehicles() {
  let records ="";
  contract.methods
    .getVehicles()
    .call()
    .then(async(value) => {
      var x = value;
      for (let i = 0; i < x.length; i++) {
        const vid = x[i];
        await contract.methods
        .getParticularVehicle(vid)
        .call()
        .then((value) => {
            var track = value;
            const id = track[0];
            const ctype = track[1];
            records+="Number: "+id+"Vehicle Type: "+ctype+"\n"
        });
      }
      alert(records)
    });
}
