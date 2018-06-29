# Cumulative Portfolio Hawk-Dove Massive Duel
- 10라운드 게임동안 누적 비례보상 PHD 수행함. 나머지는 똑같음. 

# Todos
- 누적보상, 가산보상 방식 모두 통합
- xlsx 에러 검출 너무 힘듬. 구글 시트로 받아서 처리할 수 있도록 바꿀것. 아니면 oTree 능동설문을 쓰던지. 

# Install
Bundle 설치
`gem install bundle`

bundle 실행하여 필요한 gem 설치
`bundle install`

# Usage
## importXlsx.rb
- 엑셀 파일을 json으로 변환. 변환한 파일은 `data/students.json`으로 생성됨
- 경로: 양식에 맞는 엑셀 파일이 있는 경로를 지정해야 함(/로 끝나야 함). 해당 경로 내의 *.xlsx 파일을 읽음
`ruby importXlsx.rb DIRECTORY`

- 결과파일인 data/students.json 에서 null 문자열이 있는지 찾아본다. 있으면 xlsx 에 오류가 있는 것임. 빈 칸이 있었거나 white space 같은 보이지 않는 문자가 낑겨 있을 가능성이 높음. 

## game.html
- 브라우저에서 game.html을 연다. button을 누르면 game을 실행한 후 결과를 저장한다. 
- 게임의 필요한 파일은 위의 `data/students.json`이다. 
- 결과 파일의 경로는 아래와 같다. 
`data/game_result.json`
`data/player_result.json`
- 파일이 없다면 권한 문제일 가능성이 매우 높다. chmod 777

## json2result.php(선택)
- `player_result.json`을 php의 array 방식으로 출력한다.

## GameSummary.php (선택)
- 게임 내용을 브라우저에 출력함