export function generateRandomMilisecs() {
  return Math.ceil(Math.random() * 1000);
}

const chancesOfNetworkError = 0
const chancesOfServerError = 0

function simulateGenericError(chancesOfError) {
  const randomChance = Math.ceil(Math.random() * 100);
  if (randomChance > chancesOfError) return false;
  else return true;
}

export function simulateNetworkError() {
  return simulateGenericError(chancesOfNetworkError);
}

export function simulateServerError() {
  return simulateGenericError(chancesOfServerError);
}
