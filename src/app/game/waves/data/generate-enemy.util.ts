
export function generateEnemy(T, amount: number): typeof T[] {
  const enemies = [];

  for (let i = 0; i < amount; i++) {
    enemies.push(T);
  }

  return enemies;
}
