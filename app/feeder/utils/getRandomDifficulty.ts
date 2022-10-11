export const getRandomDifficulty = () => {
  const difficulties = ["easy", "medium", "hard"];

  return difficulties[Math.floor(Math.random() * difficulties.length)];
};