const numGenerals = 7;
const numTraitors = 2;
const traitorPositions = new Set();
while (traitorPositions.size < numTraitors) {
  traitorPositions.add(Math.floor(Math.random() * numGenerals));
}

traitorPositionsArray = Array.from(traitorPositions);
console.log("Traitors Positions are ", traitorPositionsArray)
// Simulate message sending
function sendMesssage(sender, message) {
  // console.log("Sender is ",sender)
  // Simulate network latency and failure
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, Math.random() * 1000); // Simulate latency up to 1 second
  });
}

// Simulate a general's behavior
async function generalBehavior(id) {
  const isTraitor = traitorPositionsArray.includes(id);

  // Phase 1: Propose a value
  const proposedValue = "ATTACK"; // Generals agree to attack by default
  const value = isTraitor ? (Math.random() < 0.5 ? "RETREAT" : "ATTACK") : proposedValue;

  // Phase 2: Send and receive votes
  const votes = await Promise.all(
    Array.from({ length: numGenerals }, (_, i) => sendMesssage(id, value))
  );

  // Count votes
  const attackVotes = votes.filter((vote) => vote === "ATTACK").length;
  const retreatVotes = votes.length - attackVotes;

  // Make a decision
  const decisionThreshold = numGenerals - numTraitors;
  const finalDecision = attackVotes >= decisionThreshold ? "ATTACK" : "RETREAT";

  console.log(`General ${id} Decision: ${finalDecision}`);
}

// Simulate generals' behavior
const generals = Array.from({ length: numGenerals }, (_, i) => i);
// console.log("Generals", generals)
generals.forEach((generalId) => {
  generalBehavior(generalId);
});
