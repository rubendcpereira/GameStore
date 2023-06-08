#! /usr/bin/env node

console.log(
  "This script clears your database and inserts some mockup games.\n" +
    "Your database connection string must be specified as an argument - e.g.: node populatedb 'mongodb+srv://<user>:<password>@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority'"
);

const mongoose = require("mongoose");
const User = require("./models/user");
const Game = require("./models/game");

const mongoDB = process.argv.slice(2)[0];

main().catch((err) => console.log(err));
async function main() {
  console.log("DEBUG: About to connect...");
  await mongoose.connect(mongoDB);
  console.log("DEBUG: Connected!");

  // Clears the database
  await clearDatabase();
  console.log("DEBUG: Database cleared.");

  // Inserts mockup games
  await insertMockupGames();
  console.log("DEBUG: Mockup games inserted.");

  console.log("DEBUG: Closing mongoose...");
  mongoose.connection.close();
}

function clearDatabase() {
  return Promise.all([User.deleteMany(), Game.deleteMany()]);
}

function insertMockUpGame(name, type, price, description, images, trailer, platform) {
  const mockupGame = {
    name: name,
    type: type,
    price: price,
    description: description,
    images: images,
    trailer: trailer,
    platform: platform,
  };
  return new Game(mockupGame).save();
}

function insertMockupGames() {
  return Promise.all([
    insertMockUpGame(
      "Amnesia: The Bunker",
      "Game",
      24.5,
      "Amnesia: The Bunker is a first-person horror game from the makers of SOMA and Amnesia.\nLeft all alone in a desolate WW1 bunker with only one bullet remaining in the barrel, it’s up to you to face the oppressing terrors in the dark. Keep the lights on at all costs, persevere, and make your way out alive. A truly intense horror experience.",
      ["https://i.imgur.com/3jy13HK.jpeg"],
      "https://youtu.be/qDYgPMxkLzo",
      ["Windows", "macOS", "Linux"]
    ),
    insertMockUpGame(
      "Black Desert",
      "Game",
      9.99,
      "Black Desert is a game that tests the limitations of MMORPG by implementing remastered graphics and audio. Enjoy exciting combat and siege, exploration, trading, fishing, training, alchemy, cooking, gathering, hunting, and more in the vast open world.",
      ["https://i.imgur.com/e60niHN.jpg"],
      "https://youtu.be/DD4zMOvRrzM",
      ["Windows"]
    ),
    insertMockUpGame(
      "Call of Duty®: Modern Warfare® II",
      "Game",
      69.99,
      "Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience.",
      ["https://i.imgur.com/ylobDwr.jpg"],
      "https://youtu.be/OeVapCrI1pY",
      ["Windows"]
    ),
    insertMockUpGame(
      "Counter-Strike: Global Offensive - Prime Status Upgrade",
      "DLC",
      14.29,
      "Counter-Strike: Global Offensive players with Prime Status are matched with other Prime Status players and are eligible to receive Prime-exclusive souvenir items, item drops, and weapon cases.",
      ["https://i.imgur.com/tJsOjbQ.jpg"],
      "https://youtu.be/edYCtaNueQY",
      ["Windows"]
    ),
    insertMockUpGame(
      "Destiny 2: Legacy Collection (2023)",
      "DLC",
      59.99,
      "Dive into the world of Destiny 2 to explore the mysteries of the solar system and experience responsive first-person shooter combat. Unlock powerful elemental abilities and collect unique gear to customize your Guardian's look and playstyle. Enjoy Destiny 2’s cinematic story, challenging co-op missions, and a variety of PvP modes alone or with friends. Download for free today and write your legend in the stars.",
      ["https://i.imgur.com/wM9XjNK.jpg"],
      "https://youtu.be/jn1dML6RC5w",
      ["Windows", "Linux"]
    ),
    insertMockUpGame(
      "Dreadge",
      "Game",
      24.99,
      "Captain your fishing trawler to explore a collection of remote isles, and their surrounding depths, to see what lies below. Sell your catch to the locals and complete quests to learn more about each area’s troubled past. Outfit your boat with better equipment to trawl deep-sea trenches and navigate to far-off lands, but keep an eye on the time. You might not like what finds you in the dark...",
      ["https://i.imgur.com/ByBU4zp.jpg"],
      "https://youtu.be/ZtTfROTgYKA",
      ["macOS"]
    ),
    insertMockUpGame(
      "Elden Ring",
      "Game",
      59.99,
      "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
      ["https://i.imgur.com/VZmSmMW.jpeg"],
      "https://youtu.be/E3Huy2cdih0",
      ["Windows"]
    ),
    insertMockUpGame(
      "EA SPORTS™ FIFA 23",
      "Game",
      69.99,
      "EA SPORTS™ FIFA 23 brings The World’s Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, both the men’s and women’s FIFA World Cup™ coming to the game as post-launch updates, the addition of women’s club teams, cross-play features*, and more. Experience unrivaled authenticity with over 19,000 players, 700+ teams, 100 stadiums, and over 30 leagues in FIFA 23.",
      ["https://i.imgur.com/Cf8h9T3.jpg"],
      "https://youtu.be/o3V-GvvzjE4",
      ["Windows", "macOS", "Linux"]
    ),
    insertMockUpGame(
      "F1® 23",
      "Game",
      69.99,
      'Be the last to brake in EA SPORTS™ F1® 23, the official video game of the 2023 FIA Formula One World Championship™. A new chapter in the thrilling "Braking Point" story mode delivers high-speed drama and heated rivalries.',
      ["https://i.imgur.com/AzSoDBX.jpeg"],
      "https://youtu.be/wHNgoRCWqTg",
      ["Windows"]
    ),
    insertMockUpGame(
      "Fallout 76",
      "Game",
      39.99,
      "Bethesda Game Studios welcome you to Fallout 76. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers emerge into post-nuclear America. Explore a vast wasteland in this open-world multiplayer addition to the Fallout story.",
      ["https://i.imgur.com/tlGoSGa.jpg"],
      "https://youtu.be/M9FGaan35s0",
      ["Linux"]
    ),
    insertMockUpGame(
      "Farming Simulator 22",
      "Game",
      29.99,
      "Create your farm and let the good times grow! Harvest crops, tend to animals, manage productions, and take on seasonal challenges.",
      ["https://i.imgur.com/UEj0oVC.jpg"],
      "https://youtu.be/qg9VPiUtaic",
      ["Windows", "macOS"]
    ),
    insertMockUpGame(
      "FINAL FANTASY XIV Online",
      "Game",
      9.99,
      "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
      ["https://i.imgur.com/rZATLhk.jpg"],
      "https://youtu.be/zTTtd6bnhFs",
      ["Windows"]
    ),
    insertMockUpGame(
      "World of Warcraft: 60-Day Game Card",
      "Subscription",
      24.49,
      "The World of Warcraft: 60-Day Game Card is a product that allows you to apply a subscription to your account in the game created by Blizzard for about two months. It can be said that it is a kind of relic of old times when people did not use credit cards and PayPal, which are currently very popular.",
      ["https://i.imgur.com/1LUmRtE.jpg"],
      "https://youtu.be/vlVSJ0AvZe0",
      ["Windows", "Linux"]
    ),
  ]);
}
