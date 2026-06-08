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

  try {

    teamContainer.innerHTML = "";

    let total = 0;
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    const snapshot = await getDocs(
      collection(db, "teams")
    );

    if (snapshot.empty) {

      teamContainer.innerHTML = `
        <p style="text-align:center;">
          No Team Requests Found
        </p>
      `;

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

      teamContainer.innerHTML += `

        <div class="team-card">

          <h3>🏆 ${team.squadName}</h3>

          <p>
            <strong>Mobile:</strong>
            ${team.phone}
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
            <strong>Payment:</strong>
            ${team.paymentMethod}
          </p>

          <p>
            <strong>Transaction ID:</strong>
            ${team.transactionId}
          </p>

          <p>
            <strong>Status:</strong>
            ${team.status}
          </p>

          <div class="btn-group">

            <button
              class="approve-btn"
              onclick="approveTeam('${id}')"
            >
              Approve
            </button>

            <button
              class="reject-btn"
              onclick="rejectTeam('${id}')"
            >
              Reject
            </button>

            <button
              class="delete-btn"
              onclick="deleteTeam('${id}')"
            >
              Delete
            </button>

          </div>

        </div>

      `;

    });

    totalTeamsEl.innerText = total;
    pendingTeamsEl.innerText = pending;
    approvedTeamsEl.innerText = approved;
    rejectedTeamsEl.innerText = rejected;

  } catch (error) {

    console.error(error);

    teamContainer.innerHTML = `
      <p style="text-align:center;color:red;">
        Failed To Load Teams
      </p>
    `;

  }

}

window.approveTeam = async function(id) {

  await updateDoc(
    doc(db, "teams", id),
    {
      status: "approved"
    }
  );

  loadTeams();

};

window.rejectTeam = async function(id) {

  await updateDoc(
    doc(db, "teams", id),
    {
      status: "rejected"
    }
  );

  loadTeams();

};

window.deleteTeam = async function(id) {

  const confirmDelete = confirm(
    "Delete this team?"
  );

  if (!confirmDelete) return;

  await deleteDoc(
    doc(db, "teams", id)
  );

  loadTeams();

};

loadTeams();
