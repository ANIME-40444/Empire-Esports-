import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("teamForm");

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
