const regexUrl = /^(http:\/\/|https:\/\/)[a-z0-9_-]+\.[a-z0-9_-]+(\.[a-z0-9_-]+)*(:[0-9]+)?(\/.*)?$/;
const regexId = /^[0-9a-fA-F]{24}$/;
const russianRegex = /^[\p{L} .'-]+$/u;
const englishRegex = /^[A-Za-z]+$/;

module.exports = {
  regexUrl,
  regexId,
  russianRegex,
  englishRegex,
};
