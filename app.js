import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// =====================
// TEAM REGISTRATION
// =====================

const form = document.getElementById("teamForm");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = form.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {

      await addDoc(collection(db, "teams"), {

        squadName: document.getElementById("squadName").value,

        phone: document.getElementById("phone").value,

        player1: document.getElementById("player1").value,

        player2: document.getElementById("player2").value,

        player3: document.getElementById("player3").value,

        player4: document.getElementById("player4").value,

        paymentMethod: document.getElementById("paymentMethod").value,

        transactionId: document.getElementById("transactionId").value,

        status: "pending",

        createdAt: serverTimestamp()

      });

      alert(
        "✅ Registration Submitted Successfully!\n\nStatus: Pending\nAdmin khub taratari review korbe."
      );

      form.reset();

      loadApprovedTeams();

    } catch (error) {

      console.error(error);

      alert(
        "❌ Submit Failed!\nPlease Try Again."
      );

    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Registration";

  });

}


// =====================
// APPROVED TEAMS
// =====================

async function loadApprovedTeams() {

  const approvedContainer =
    document.getElementById("approvedTeams");

  if (!approvedContainer) return;

  approvedContainer.innerHTML = "";

  try {

    const q = query(
      collection(db, "teams"),
      where("status", "==", "approved")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

      approvedContainer.innerHTML = `
        <p>No approved teams yet.</p>
      `;

      return;
    }

    snapshot.forEach((teamDoc) => {

      const team = teamDoc.data();

      approvedContainer.innerHTML += `

        <div class="team-card">

          <h3>🏆 ${team.squadName}</h3>

          <p><strong>Mobile:</strong> ${team.phone}</p>

          <p><strong>Player 1:</strong> ${team.player1}</p>

          <p><strong>Player 2:</strong> ${team.player2}</p>

          <p><strong>Player 3:</strong> ${team.player3}</p>

          <p><strong>Player 4:</strong> ${team.player4}</p>

          <p>✅ Approved Team</p>

        </div>

      `;

    });

  } catch (error) {

    console.error(error);

    approvedContainer.innerHTML = `
      <p>Failed to load approved teams.</p>
    `;

  }

}

loadApprovedTeams();
