/*
function to assign a score for the given round to each player and keep
a tally of the total score for the game for each player
*/
export const calculateScores = (game, round, sliders) => {
  game.players.forEach(player => {
  let effort = 0;
  let val = player.round.get("value");
  for (let i = 0; i < val.length; i++) {
    for (let j = 0; j < sliders.numColumns; j++) {
      if (val[i][j] === sliders.correctPosition) {
        effort++;
      }
    }
  }
  player.round.set("value", [val, effort, effort / player.get("numSliders")]);
  const prevScore = player.get("score");
  player.set("score", prevScore + effort);
  });
}

/*
function to adjust the rankings to accommodate for ties; assumes the players 
have already been sorted based on the proortion of sliders correctly adjusted
(such that player at position zero should be ranked first); to be used during 
a specified round
*/
const accommodateTies = (game, round) => {
  let isTie = false;
  let ties = {};
  let currentRank = 1;

  // compare score of player i with player i+1 to determine if there is a tie
  // and adjust accordingly
  for (let i = 0; i < game.players.length - 1; i++) {
    const rank = currentRank;
    if (
      isTie === false
      && game.players[i].round.get("value")[2] === game.players[i + 1].round.get("value")[2]
    ) {
      isTie = true;
      ties[currentRank] = 1;
    } else if (
      isTie === true
      && game.players[i].round.get("value")[2] !== game.players[i + 1].round.get("value")[2]
    ) {
      isTie = false;
      currentRank = i + 2;
    } else if (
      isTie === true
      && game.players[i].round.get("value")[2] === game.players[i + 1].round.get("value")[2]
    ) {
      ties[currentRank] += 1;
    } else {
      currentRank++;
    }
    const value = game.players[i].round.get("value");
    value.push(rank);
    game.players[i].round.set("value", value);
  }
  // assign rank of last player
  value = game.players[game.players.length - 1].round.get("value");
  value.push(currentRank);
  game.players[game.players.length - 1].round.set("value", value);

  // set values for the round
  round.set("lastPlaceRank", currentRank);
  round.set("numberTiedWithPlayer", ties);
}

/*
function to rank players in descending order of score;
assumes player.round.get("value") is an array and the score to rank based
on is in position 1
*/
export const getRankings = (game, round) => {
  game.players.sort((a, b) => {
    const aValue = a.round.get("value");
    const bValue = b.round.get("value");
    return (bValue[1] - aValue[1]);
  });
  accommodateTies(game, round);
}