document.querySelector('#startgame').onclick = function () {

  var players = [];

  // students 정보 받음
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './data.php');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onload = function () {
    var students = JSON.parse(xhr.responseText);
    for (var e in students) {
      players[e] = new Player(students[e].studentId, students[e].name, students[e].maxMemory, students[e].memories, students[e].fileName);
    }

    for (var i in students) {
      for (var j in students) {
        if (j > i) {
          playGame(players[i], players[j]);
          // log를 화면에 표시
          document.body.innerHTML = "<br/>Game " + totalGames + ": " + i + "-" + j;
        }
      }
    }

    console.info("gameResults", gameResults);
    console.info("players", players);

    // 게임 결과 보냄
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', './result.php');
    xhr2.setRequestHeader("Content-Type", "application/json");

    xhr2.onreadystatechange = function () {};
    var data = {
      gameResults: gameResults,
      players: players
    };
    xhr2.send(JSON.stringify(data));
  };

};
