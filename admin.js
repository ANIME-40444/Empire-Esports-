import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const teamContainer = document.getElementById("teamContainer");

const totalTeamsEl = document.getElementById("totalTeams");
const pendingTeamsEl = document.getElementById("pendingTeams");
const approvedTeamsEl = document.getElementById("approvedTeams");
const rejectedTeamsEl = document.getElementById("rejectedTeams");

const groupATeamsEl =
document.getElementById("groupATeams");

const groupBTeamsEl =
document.getElementById("groupBTeams");

async function loadTeams() {

try {

teamContainer.innerHTML = "";

let total = 0;
let pending = 0;
let approved = 0;
let rejected = 0;

let groupA = 0;
let groupB = 0;

const snapshot =
await getDocs(
collection(db, "teams")
);

if (snapshot.empty) {

teamContainer.innerHTML = `
<p style="text-align:center;">
No Team Requests Found
</p>
`;

return;

}

snapshot.forEach((teamDoc) => {

const team = teamDoc.data();
const id = teamDoc.id;

total++;

if (team.status === "pending") {
pending++;
}

if (team.status === "approved") {
approved++;
}

if (team.status === "rejected") {
rejected++;
}

if (team.group === "A") {
groupA++;
}

if (team.group === "B") {
groupB++;
}

teamContainer.innerHTML += `

<div class="team-card">

<h3>🏆 ${team.squadName}</h3>

<p>
<strong>📱 Mobile:</strong>
${team.phone}
</p>

<p>
<strong>👥 Group:</strong>
${team.group || "N/A"}
</p>

<hr>

<p>
<strong>Player 1:</strong>
${team.player1}
</p>

<p>
<strong>Player 2:</strong>
${team.player2}
</p>

<p>
<strong>Player 3:</strong>
${team.player3}
</p>

<p>
<strong>Player 4:</strong>
${team.player4}
</p>

<hr>

<p>
<strong>💳 Payment:</strong>
${team.paymentMethod}
</p>

<p>
<strong>🧾 Transaction ID:</strong>
${team.transactionId}
</p>

<p>
<strong>📌 Status:</strong>
${team.status}
</p>

<div class="btn-group">

<button
class="approve-btn"
onclick="approveTeam('${id}')"
>
✅ Approve
</button>

<button
class="reject-btn"
onclick="rejectTeam('${id}')"
>
❌ Reject
</button>

<button
class="delete-btn"
onclick="deleteTeam('${id}')"
>
🗑 Delete
</button>

</div>

</div>

`;

});

totalTeamsEl.innerText = total;
pendingTeamsEl.innerText = pending;
approvedTeamsEl.innerText = approved;
rejectedTeamsEl.innerText = rejected;

groupATeamsEl.innerText = groupA;
groupBTeamsEl.innerText = groupB;

} catch (error) {

console.error(error);

teamContainer.innerHTML = `
<p style="text-align:center;color:red;">
Failed To Load Teams
</p>
`;

}

}

window.approveTeam = async function(id){

try{

await updateDoc(
doc(db,"teams",id),
{
status:"approved"
}
);

alert("✅ Team Approved");

loadTeams();

}catch(error){

console.error(error);

alert("❌ Failed To Approve");

}

}

window.rejectTeam = async function(id){

try{

await updateDoc(
doc(db,"teams",id),
{
status:"rejected"
}
);

alert("❌ Team Rejected");

loadTeams();

}catch(error){

console.error(error);

alert("❌ Failed To Reject");

}

}

window.deleteTeam = async function(id){

const confirmDelete =
confirm(
"Are you sure you want to delete this team?"
);

if(!confirmDelete) return;

try{

await deleteDoc(
doc(db,"teams",id)
);

alert("🗑 Team Deleted");

loadTeams();

}catch(error){

console.error(error);

alert("❌ Failed To Delete");

}

}

loadTeams();
