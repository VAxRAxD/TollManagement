//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Owned {
    address owner;
    
     constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}


contract TollRecord is Owned {
    
    uint public total=0;

    struct Vehicle {
        string number;
        string vtype;
        string[] records;
    }
    
    mapping (string => Vehicle) vehicleList;
    string[] public vehicleIdList;
    
    event vehicleCreationEvent(
       string number,
       string vtype,
       string[] records
    );
    
    function registerVehicle(string memory _number, string memory _vtype) public {
        string[] memory _records;
        Vehicle storage v = vehicleList[_number];
        v.number = _number;
        v.vtype = _vtype;
        v.records = _records;
        vehicleIdList.push(_number);
    }

    function addRecord(string memory _number,string memory _date,uint _direction) public{
        if (_direction==0){
            vehicleList[_number].records.push(string.concat(_date," OUT"));
            total-=1;
        }
        else{
            vehicleList[_number].records.push(string.concat(_date," IN"));
            total+=1;
        }
    }

    function getVehicles() view public returns(string[] memory) {
        return vehicleIdList;
    }

    function getParticularVehicle(string memory _vehicleId) public view returns (string memory, string memory,string[] memory) {
        return (vehicleList[_vehicleId].number, vehicleList[_vehicleId].vtype, vehicleList[_vehicleId].records);
    }

    function countVehicles() view public returns (uint) {
        if(total<0){
            return 0;
        }
        else{
            return total;
        }
    }
    
}
