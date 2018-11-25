let ruler = "";
let allies = {};
let competing = [];
let ballot = [];
let kingdoms = {"Land":"Panda", "Water" :"Octopus", "Ice" :"Mammoth", "Air":"Owl", "Fire":"Dragon","Space":"Gorilla"};
let ballotInProgress=0;
const messages = require("./messages");

const getRuler = ()=>{
    return ruler?ruler:"None";
}
const getAllies = ()=>{
    return ruler?allies[ruler].join(","):"None";
}


const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Southeros> '
});


rl.prompt();
rl.on('line', (line) => {
  line= line.trim();
  switch (line) {
    case 'Who is the ruler of Southeros?':
      console.log(getRuler());
      break;
    case 'Allies of Ruler?':
      console.log(getAllies());
      break;    
    default:
      if(ballotInProgress === 0){
        ballotInProgress=1;
        console.log("Enter the kingdoms competing to be the ruler:");
      }else{
        console.log(findRulers(line));
        ballotInProgress=0;
      }
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Summer is Coming!\n');
  process.exit(0);
});

const findRulers = (line)=>{
    if(!line){
        return "No Competition";
    }
    line = line.split(",");
    competing = line.filter(kingdom => {
        return Object.keys(kingdoms).includes(kingdom);
    });
    if(!competing.length){
        return "No Competition";
    }else{

        if(competing.length>1){
            createBallot(competing);
        }else{
            ruler=competing[0];
        }
        return `\n\nRuler Elected -> ${ruler}`;
    }
}

const createBallot = (competing)=>{
    ruler="";
    ballot=[];
    allies={};
    competing.forEach((candidate)=>{
        Object.keys(kingdoms).filter(kingdom => (kingdom !== candidate && !competing.includes(kingdom))).forEach((kingdom)=>{
            ballot.push({from:candidate,to:kingdom,msg:messages[Math.floor((Math.random() * messages.length))]})
        });
    });
    ballot = getUnique(ballot,6);
    ballot.forEach(countBallot);
    declareResult();
}

const declareResult = () =>{
    if(Object.keys(allies).length){
        console.log(`\n\nResults after round ${ballotInProgress} ballot count`);
        Object.keys(allies).forEach((candidate)=>{
            if(!ruler || (ruler && allies[candidate].length>allies[ruler].length)){
                ruler = candidate
            }
            console.log(`Allies for ${candidate} : ${allies[candidate].length}`);
        });

        competing = Object.keys(allies).filter((candidate)=>{
            return allies[candidate].length === allies[ruler].length;
        });

        if(competing.length>1){
            ballotInProgress+=1;
            createBallot(competing);
        }
    }else{
        createBallot(competing);
    }
}

function getUnique(array,count) {
    var ret = [];
    for (var i = 0; i <= count; i++) {
      var index = Math.floor(Math.random() * array.length);
      ret.push(array[index]);
    }
    return ret;  
  }

const countBallot = (msg)=>{
    let emblem = kingdoms[msg.to].toLowerCase();
    let message=msg.msg.toLowerCase().trim();
    for(let i=0;i<message.length;i++){
      emblem = emblem.replace(message[i],"");
      if(!emblem){
        if(!allies[msg.from]){
            allies[msg.from]=[];
        }
        allies[msg.from].push(msg.to);
        break;
      }
    };
}