let ruler = false;
let allies = [];
let kingdoms = {"Land":"Panda", "Water" :"Octopus", "Ice" :"Mammoth", "Air":"Owl", "Fire":"Dragon"};


const getRuler = ()=>{
    return ruler?"King Shan":"None";
}
const getAllies = ()=>{
    return allies.length?allies.join(","):"None";
}
const sendMessage = (line)=>{
  if(!line){
    return "";
  }     
  line = line.split(" ").join("").split(",");
  let kingdom= line[0].trim();
  let message = line[1];
  if(kingdom && message && Object.keys(kingdoms).includes(kingdom)){
    let emblem = kingdoms[kingdom].toLowerCase();
    message=message.toLowerCase().trim();
    for(let i=0;i<message.length;i++){
      emblem = emblem.replace(message[i],"");
      if(!emblem){
        allies.push(kingdom);
        ruler = allies.length>=3;
        break;
      }
    };
    return "Message Sent";
  }else {
    return "Invalid Message";
  }
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
    case 'Allies of King Shan?':
      console.log(getAllies());
      break;   
    default:
      console.log(sendMessage(line));
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Summer is Coming!\n');
  process.exit(0);
});