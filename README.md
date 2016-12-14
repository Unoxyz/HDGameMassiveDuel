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

## game.html
- 브라우저에서 game.html을 연다. button을 누르면 game을 실행한 후 결과를 저장한다. 
- 게임의 필요한 파일은 위의 `data/students.json`이다. 
- 결과 파일의 경로는 아래와 같다.
`data/game_result.json`
`data/player_result.json`

## json2result.php(선택)
- `player_result.json`을 php의 array 방식으로 출력한다.
