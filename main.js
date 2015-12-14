var xhr = new XMLHttpRequest();
xhr.open('POST', './data.php');
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();

var player1, player2;
xhr.onload = function () {
  // document.write(xhr.responseText);
  var data = JSON.parse(xhr.responseText);

  user1 = new Player(data[0].studentId, data[0].name, data[0].maxMemory, data[0].memories);
  user2 = new Player(data[1].studentId, data[1].name, data[1].maxMemory, data[1].memories);
  player1 = user1;
  player2 = user2;

  playGame(player1, player2);
  console.log("Players", player1, player2);
  console.log("gameResults", gameResults);