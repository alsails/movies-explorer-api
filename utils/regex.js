const regexUrl = /^(http:\/\/|https:\/\/)[a-z0-9_-]+\.[a-z0-9_-]+(\.[a-z0-9_-]+)*(:[0-9]+)?(\/.*)?$/;
const regexId = /^[0-9a-fA-F]{24}$/;
const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// const russianRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,:'"!?-]+$/;
// const englishRegex = /^[A-Za-z]+$/;

module.exports = {
  regexUrl,
  regexId,
  regexEmail,
  // russianRegex,
  // englishRegex,
};
