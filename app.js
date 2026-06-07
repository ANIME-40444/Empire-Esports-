import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("teamForm");

if(form){

form.addEventListener("submit", async (e) => {

e.preventDefault();

const submitBtn = form.querySelector("button");

submitBtn.innerText = "Submitting...";
submitBtn.disabled = true;

try {

await addDoc(collection(db, "teams"), {

squadName:
document.getElementById("squadName").value,

leaderName:
document.getElementById("leaderName").value,

leaderUid:
document.getElementById("leaderUid").value,

phone:
document.getElementById("phone").value,

player1:
document.getElementById("player1").value,

player1Uid:
document.getElementById("player1Uid").value,

player2:
document.getElementById("player2").value,

player2Uid:
document.getElementById("player2Uid").value,

player3:
document.getElementById("player3").value,

player3Uid:
document.getElementById("player3Uid").value,

player4:
document.getElementById("player4").value,

player4Uid:
document.getElementById("player4Uid").value,

paymentMethod:
document.getElementById("paymentMethod").value,

senderNumber:
document.getElementById("senderNumber").value,

transactionId:
document.getElementById("transactionId").value,

status: "pending",

createdAt: serverTimestamp()

});

alert(
"✅ Registration Submitted Successfully!\n\nStatus: Pending\nAdmin khub taratari review korbe."
);

form.reset();

} catch (error) {

console.error(error);

alert(
"❌ Submit Failed!\nPlease Try Again."
);

}

submitBtn.innerText = "Submit Registration";
submitBtn.disabled = false;

});

}

async function loadApprovedTeams(){

const approvedContainer =
document.getElementById("approvedTeams");

if(!approvedContainer) return;

approvedContainer.innerHTML = "";

try{

const q = query(
collection(db,"teams"),
where("status","==","approved")
);

const snapshot = await getDocs(q);

if(snapshot.empty){

approvedContainer.innerHTML = `
<div class="team-card">
No approved teams yet.
</div>
`;

return;

}

snapshot.forEach((teamDoc)=>{

const team = teamDoc.data();

approvedContainer.innerHTML += `

<div class="team-card">

<h3>${team.squadName}</h3>

<p><strong>Leader:</strong> ${team.leaderName}</p>

<p>
<strong>Status:</strong>
✅ Approved
</p>

</div>

`;

});

}catch(error){

console.error(error);

approvedContainer.innerHTML = `
<div class="team-card">
Failed to load approved teams.
</div>
`;

}

}

loadApprovedTeams();
