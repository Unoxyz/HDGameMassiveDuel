var players = [];

// Ajax
var xhr = new XMLHttpRequest();
xhr.open('POST', './data.php');
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();

xhr.onload = function () {
  // document.write(xhr.responseText);
  var students = JSON.parse(xhr.responseText);
  for (var i in students) {
    players[i] = new Player(students[i].studentId, students[i].name, students[i].maxMemory, students[i].memories, students[i].fileName);
  }

  for (var i in students) {
    for (var j in students) {
      if (j > i) {
        playGame(players[i], players[j]);
        console.log("Game " + totalGames + ": " + i + "-" + j, players[i], players[j]);
      }
    }
  }
  console.info("gameResults", gameResults);
  console.info("players", players);
};

var xhr2 = new XMLHttpRequest();
xhr2.open('POST', './data.php');
xhr2.setRequestHeader("Content-Type", "application/json");
xhr2.send();

xhr2.onload = function () {
  // var students = JSON.parse(xhr2.responseText);
};

console.info("gameResults", gameResults);
console.info("players", players);
