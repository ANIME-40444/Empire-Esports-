import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// =======================
// COUNTDOWN TIMER
// =======================

const targetDate =
new Date("June 12, 2026 16:00:00").getTime();

setInterval(() => {

const now = new Date().getTime();

const distance = targetDate - now;

const days =
Math.floor(distance / (1000 * 60 * 60 * 24));

const hours =
Math.floor(
(distance % (1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes =
Math.floor(
(distance % (1000 * 60 * 60))
/
(1000 * 60)
);

const seconds =
Math.floor(
(distance % (1000 * 60))
/
1000
);

if(document.getElementById("days")){
document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;
}

},1000);


// =======================
// GROUP COUNTS
// =======================

async function loadGroupCounts(){

const snapshot =
await getDocs(collection(db,"teams"));

let groupA = 0;
let groupB = 0;

snapshot.forEach((doc)=>{

const team = doc.data();

if(team.group === "A")
groupA++;

if(team.group === "B")
groupB++;

});

if(document.getElementById("groupACount")){
document.getElementById("groupACount").innerText =
groupA;
}

if(document.getElementById("groupBCount")){
document.getElementById("groupBCount").innerText =
groupB;
}

const groupSelect =
document.getElementById("group");

if(groupSelect){

const optionA =
groupSelect.querySelector(
'option[value="A"]'
);

const optionB =
groupSelect.querySelector(
'option[value="B"]'
);

if(groupA >= 12){

optionA.disabled = true;
optionA.textContent =
"GROUP A (FULL)";

}

if(groupB >= 12){

optionB.disabled = true;
optionB.textContent =
"GROUP B (FULL)";

}

if(groupA >= 12 && groupB >= 12){

alert(
"Registration Closed!\nAll Slots Filled."
);

document.getElementById("teamForm")
.style.display = "none";

}

}

}


// =======================
// TEAM SUBMIT
// =======================

const form =
document.getElementById("teamForm");

if(form){

form.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const submitBtn =
form.querySelector("button");

submitBtn.disabled = true;

submitBtn.innerText =
"Submitting...";

try{

await addDoc(
collection(db,"teams"),
{

squadName:
document.getElementById("squadName").value,

phone:
document.getElementById("phone").value,

group:
document.getElementById("group").value,

player1:
document.getElementById("player1").value,

player2:
document.getElementById("player2").value,

player3:
document.getElementById("player3").value,

player4:
document.getElementById("player4").value,

paymentMethod:
document.getElementById("paymentMethod").value,

transactionId:
document.getElementById("transactionId").value,

status:"pending",

createdAt:
serverTimestamp()

}
);

alert(
"✅ Registration Submitted!\n\nYour Team Status: Pending"
);

form.reset();

loadGroupCounts();

// নতুন টিম সাবমিট হওয়ার পর যেন এপ্রুভড লিস্টও রিলোড হয়
loadApprovedTeams();

}catch(error){

console.error(error);

alert(
"❌ Submit Failed!"
);

}

submitBtn.disabled = false;

submitBtn.innerText =
"রেজিস্ট্রেশন সাবমিট করুন";

}
);

}


// =======================
// APPROVED TEAMS (REPLACED WITH NEW FUNCTION)
// =======================

async function loadApprovedTeams(){

const groupAContainer =
document.getElementById("groupATeamsList");

const groupBContainer =
document.getElementById("groupBTeamsList");

if(!groupAContainer || !groupBContainer)
return;

groupAContainer.innerHTML = "";
groupBContainer.innerHTML = "";

const q = query(
collection(db,"teams"),
where("status","==","approved")
);

const snapshot = await getDocs(q);

if(snapshot.empty){

groupAContainer.innerHTML =
"<p>No Approved Team Yet</p>";

groupBContainer.innerHTML =
"<p>No Approved Team Yet</p>";

return;

}

// কোন গ্রুপে টিম আছে কি না তা নিখুঁতভাবে চেক করার ট্র্যাকার
let hasGroupA = false;
let hasGroupB = false;

snapshot.forEach((doc)=>{

const team = doc.data();

const hiddenPhone =
(team.phone || "").substring(0,5)
+ "*****";

const card = `

<div class="team-card">

<h3>🏆 ${team.squadName}</h3>

<p>📱 ${hiddenPhone}</p>

<p>👥 Group: ${team.group}</p>

<p>Player 1: ${team.player1}</p>

<p>Player 2: ${team.player2}</p>

<p>Player 3: ${team.player3}</p>

<p>Player 4: ${team.player4}</p>

<p>✅ Approved Team</p>

</div>

`;

if(team.group === "A"){

groupAContainer.innerHTML += card;
hasGroupA = true;

}

if(team.group === "B"){

groupBContainer.innerHTML += card;
hasGroupB = true;

}

});

// লুপ শেষ হওয়ার পর যদি কোনো গ্রুপে একটাও টিম না থাকে, তবে মেসেজটি দেখাবে
if(!hasGroupA){
groupAContainer.innerHTML = "<p>No Approved Team Yet</p>";
}
if(!hasGroupB){
groupBContainer.innerHTML = "<p>No Approved Team Yet</p>";
}

}


// =======================
// INITIAL LOAD
// =======================

loadGroupCounts();

loadApprovedTeams();
