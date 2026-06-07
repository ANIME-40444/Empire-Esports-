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

async function loadTeams() {

teamContainer.innerHTML = "";

let total = 0;
let pending = 0;
let approved = 0;
let rejected = 0;

const snapshot = await getDocs(collection(db, "teams"));

snapshot.forEach((teamDoc) => {

const data = teamDoc.data();
const id = teamDoc.id;

total++;

if (data.status === "pending") pending++;
if (data.status === "approved") approved++;
if (data.status === "rejected") rejected++;

const card = document.createElement("div");
card.className = "team-card";

card.innerHTML = `
<h3>${data.squadName}</h3>

<p><b>Leader:</b> ${data.leaderName}</p>
<p><b>Leader UID:</b> ${data.leaderUid}</p>
<p><b>Phone:</b> ${data.phone}</p>

<hr>

<p><b>Player 1:</b> ${data.player1}</p>
<p><b>UID:</b> ${data.player1Uid}</p>

<p><b>Player 2:</b> ${data.player2}</p>
<p><b>UID:</b> ${data.player2Uid}</p>

<p><b>Player 3:</b> ${data.player3}</p>
<p><b>UID:</b> ${data.player3Uid}</p>

<p><b>Player 4:</b> ${data.player4}</p>
<p><b>UID:</b> ${data.player4Uid}</p>

<hr>

<p><b>Payment:</b> ${data.paymentMethod}</p>
<p><b>Sender:</b> ${data.senderNumber}</p>
<p><b>Transaction ID:</b> ${data.transactionId}</p>

<p><b>Status:</b> ${data.status}</p>

<div class="btn-group">

<button class="approve-btn"
onclick="approveTeam('${id}')">
Approve
</button>

<button class="reject-btn"
onclick="rejectTeam('${id}')">
Reject
</button>

<button class="delete-btn"
onclick="deleteTeam('${id}')">
Delete
</button>

</div>
`;

teamContainer.appendChild(card);

});

totalTeamsEl.innerText = total;
pendingTeamsEl.innerText = pending;
approvedTeamsEl.innerText = approved;
rejectedTeamsEl.innerText = rejected;

}

window.approveTeam = async function(id){

await updateDoc(doc(db,"teams",id),{
status:"approved"
});

loadTeams();

}

window.rejectTeam = async function(id){

await updateDoc(doc(db,"teams",id),{
status:"rejected"
});

loadTeams();

}

window.deleteTeam = async function(id){

const confirmDelete =
confirm("Delete this team?");

if(!confirmDelete) return;

await deleteDoc(doc(db,"teams",id));

loadTeams();

}

loadTeams();
