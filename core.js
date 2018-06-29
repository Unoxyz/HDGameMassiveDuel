var totalGames = 0;
var gameResults = [];

// Player 객체 정의
function Player(studentId, name, maxMemory, memories, fileName) {
  // 기본 정보
  this.name = name;
  this.studentId = studentId;
  this.maxMemory = maxMemory;
  this.memories = memories;
  this.fileName = fileName;
  // round용 정보
  this.lastStrategy = "";
  this.scores = [];
  this.duelHistory = []; // [주의] 최근 것이 앞에 옴. 말하자면 내림차순.
  // game 결과
  this.gameNumbers = [];
  this.gameScore = [];
  this.gameHistory = [];
  this.games = 0;
}
Player.prototype = {
  constructor: Player,
  // history와 비교하여 전략을 짬
  getMemory: function (num, memories, history) {
    var strategy = [];
    var recentHistory = "";

    if (num === 0) {
      strategy = memories["init"] ? memories["init"] : ['d', 0.5];
    } else if (num <= 10) {
      for (var i = 0; i < num; i++) {
        recentHistory += history[i]; // 최근 히스토리 생성
      }
      strategy = memories[recentHistory]; // recentHistory에 해당하는 메모리 가져옴.
      if (unusableMemory(strategy)) { //
        recentHistory = arguments.callee(num - 1, memories, history).recentHistory;
        strategy = arguments.callee(num - 1, memories, history).strategy;
      }
    } else {
      console.warn("error: round value");
    }
    return {
      recentHistory: recentHistory,
      strategy: strategy
    };
  },

  // 전략을 가지고 d, h 중 무엇을 낼지 결정
  makeDecision: function (round) {
    var randonNumber = Math.random();
    var memoryNumber = Math.min(round - 1, this.maxMemory, this.duelHistory.length); // round마다 사용해야할 memory 숫자를 판단
    var memory = this.getMemory(memoryNumber, this.memories, this.duelHistory); // 실제 참고한 전략의 키와 값
    this.lastStrategy = memory.recentHistory;
    var strategy = memory.strategy;
    var char = strategy[0];
    var probability = strategy[1] == 0 ? 0 : (Number(strategy[1]) || 1);

    if (randonNumber > probability) {
      switch (char) {
        case 'd':
          char = 'h';
          break;
        case 'h':
          char = 'd';
          break;
        default:
          console.warn("error: strategy character");
      }
    }
    return char;
  }

};

// 못쓰는 값이면 true 반환
function unusableMemory(memory) {
  return !memory || (memory[0] !== 'h' && memory[0] !== 'd');
}

// 두 명이 한 라운드 대결을 함. 결과를 history에 저장하고, 점수를 계산하여 저장. 10라운드인지 판단
function duel(user1, user2, round) {
  var result = user1.makeDecision(round) + user2.makeDecision(round);
  user1.duelHistory.unshift(result); // 최근 결과가 앞에 옴.
  user2.duelHistory.unshift(result[1] + result[0]);

//////////// modified for cumulative game

  if (round == 1){
	  user1.scores[round - 1] = 0
	  user2.scores[round - 1] = 0
  } else {
	  user1.scores[round - 1] = user1.scores[round - 2]
	  user2.scores[round - 1] = user2.scores[round - 2]	
  }

  user1.scores[round - 1] += 100
  user2.scores[round - 1] += 100

  user1.scores[round - 1] *= calScore(result)[0];
  user2.scores[round - 1] *= calScore(result)[1];
  

  user1.scores[round - 1] = Math.round(user1.scores[round - 1])
  user2.scores[round - 1] = Math.round(user2.scores[round - 1])



///////////// modified for cumulative game

  putDuelLogs(user1, round);
  putDuelLogs(user2, round);

}

// 각 라운드의 점수 계산
function calScore(result) {
  switch (result) {
    case "dd":
      return [1.05, 1.05];
    case "dh":
      return [1.05, 1.30];
    case "hd":
      return [1.30, 1.05];
    case "hh":
      return [0, 0];
    default:
      console.warn("error: invalid result");
  }
}

// 라운드 로그 출력
function putDuelLogs(user, round) {
  // document.body.insertAdjacentHTML("beforeend",
  //   "<br/>Round " + round + " " + user.name + ": " + user.duelHistory[0] + " " + user.scores[round-1] + " " + user.lastStrategy);
}

// 두 명이 한 게임을 함. duel * 10.
function playGame(user1, user2) {
  // player 기록 초기화
  user1.lastStrategy = "";
  user1.scores = [];
  user1.duelHistory = [];
  user2.lastStrategy = "";
  user2.scores = [];
  user2.duelHistory = [];

  // round * 10
  for (var i = 1; i <= 10; i++) {
    duel(user1, user2, i);
  }

  totalGames++;

  // 각 게임 결과 저장
  var gameResult = {
    gameNumber: totalGames,
    players: [{
      id: user1.studentId,
      name: user1.name
    }, {
      id: user2.studentId,
      name: user2.name
    }],
    gameHistory: tempReverse(user1.duelHistory),
    scores: (function () {
      var sumScores = [0, 0];
	  sumScores[0] = user1.scores[9];
	  sumScores[1] = user2.scores[9];
      // for (var i = 0; i < 10; i++) {
//         sumScores[0] += user1.scores[i];
//         sumScores[1] += user2.scores[i];
//       }
      return sumScores;
    })()
  };
  gameResults.push(gameResult);

  // 게임 결과를 각 user에 저장
  user1.games++;
  user1.gameScore.push(gameResult.scores[0]);
  user1.gameNumbers.push(totalGames);
  user1.gameHistory.push(tempReverse(user1.duelHistory).join(" "));
  user2.games++;
  user2.gameScore.push(gameResult.scores[1]);
  user2.gameNumbers.push(totalGames);
  user2.gameHistory.push((function () {
    tempArray = [];
    for (var i = 9; i >= 0; i--) {
      tempArray.push(user2.duelHistory[i][1] + user2.duelHistory[i][0]);
    }
    return tempArray.join(" ");
  })());

  // log 출력
  // document.body.insertAdjacentHTML("beforeend", "<br/>user1: " + user1.scores + " " + tempReverse(user1.duelHistory) + "<br />" + "user2: " + user2.scores + " " + tempReverse(user2.duelHistory) + "<br />");
}

// 배열을 임시로 reverse. array, 객체 다룰 때는 조심. clone이 필요한 거였다.
function tempReverse(array) {
  revArray = array.slice(0);
  return revArray.reverse();
}
