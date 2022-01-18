
export function generateEnemy(T, weight: number, currentWave: number): typeof T[] {
  const enemies = [];
  const amountToSpawn = Math.round((currentWave + 5) / weight);

  for (let i = 0; i < amountToSpawn; i++) {
    enemies.push(T);
  }

  return enemies;
}
