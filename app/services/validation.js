module.exports = {
  validateStandingsNumber(number) {
    // There are 34 games/standings in a season
    if (!Number.isInteger(number) || number < 1 || number > 34) {
      return false;
    }

    return true;
  },
};
