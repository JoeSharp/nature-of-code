const LETTERS: string[] = [];
for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
  LETTERS.push(String.fromCharCode(i));
}

export const generateRandomLetter = () =>
  LETTERS[Math.floor(Math.random() * LETTERS.length)];

export const generateRandomLetters = (length: number) =>
  Array(length).fill(null).map(generateRandomLetter);
