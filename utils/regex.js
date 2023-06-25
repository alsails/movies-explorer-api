const regexUrl = /^(http:\/\/|https:\/\/)[a-z0-9_-]+\.[a-z0-9_-]+(\.[a-z0-9_-]+)*(:[0-9]+)?(\/.*)?$/;
const russianRegex = /^[\p{L} .'-]+$/u;
const englishRegex = /^[A-Za-z]+$/;

module.exports = {
  regexUrl,
  russianRegex,
  englishRegex,
};
