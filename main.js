var players = [];

// students 정보 받음
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

  // 게임 결과 보냄
  var xhr2 = new XMLHttpRequest();
  xhr2.open('POST', './result.php');
  xhr2.setRequestHeader("Content-Type", "application/json");

  xhr2.onreadystatechange = function () {
  };
  var data = { gameResults: gameResults, players: players };
  xhr2.send(JSON.stringify(data));
};
