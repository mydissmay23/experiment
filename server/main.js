import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";
import { sliders } from "./constants"

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
  // randomly choose players for high ability level
  highAbility = _.sample(game.players, Math.floor(game.players.length / 2));

  game.players.forEach(player => {
    if (highAbility.includes(player)) {
      player.set("ability", "high");
    } else {
      player.set("ability", "low");
    }
    player.set("numSliders", sliders.numSliders[player.get("ability")])
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
  });

  _.times(game.treatment.numRounds, i => {
    const round = game.addRound({
      data: {
        lastPlaceRank: game.players.length,
        numberTiedWithPlayer: {},
      }
    });
    round.addStage({
      name: "slider task",
      displayName: "Slider Task",
      durationInSeconds: 90
    });
    round.addStage({
      name: "feedback",
      displayName: "Results",
      durationInSeconds: 20
    })
  });
});
