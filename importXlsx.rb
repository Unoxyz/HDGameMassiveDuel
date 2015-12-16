require 'simple_xlsx_reader'
require 'json'

filePath = "#{ARGV[0]}*.xlsx"
xlsxFiles = Dir.glob(filePath)
allStudents = []

# 시트명이 맞는 지 체크
def isValidSheet(sheets, num)
  sheets.each do |e|
    if e.name == "Sheet 1 - Memory #{num}"
      return e
    end
  end
  return nil
end

# HD, 확률을 배열로 조합
def makeProb(row, index)
  myArray = []
  return nil if row[index].nil?
  myArray.push(row[index].downcase, row[index+1].to_f)
  if ['d','h'].include?(myArray[0])
    if myArray[1] < 0
      myArray[1] = 0
    elsif myArray[1] > 1
      myArray[1] = 1
    end
  else
    myArray[0] = nil
    myArray[1] = nil
  end
  return myArray
end

# memory1~4 읽기 위함
def makeStrategy(sheet, memoryNum, rowRange, dhLength, student)
  # 한 시트 내 전략이 몇개인지 셈
  count = 0
  sheet.rows[rowRange].each do |e|
    if (not e[dhLength].nil?) and ['d','h'].include?(e[dhLength].downcase)
      count += 1
    end
  end
  if count == 0
    return nil
  end

  # 전략 만듬
  key = ""
  sheet.rows[rowRange].each do |row|
    if row[0].nil?
      key = key[0..dhLength-3] + row[dhLength-2..dhLength-1].join.downcase
    else
      key = row[0..dhLength-1].join.downcase
    end
    value = makeProb(row, dhLength)
    student[:memories][:"#{key}"] = value
  end

  student[:maxMemory] = [student[:maxMemory], memoryNum].max
  return nil
end

xlsxFiles.each do |file|
  doc = SimpleXlsxReader.open(file)
  student = {}
  student[:fileName] = File.basename(file)
  student[:studentId] = doc.sheets[0].rows[3][2]
  student[:name] = doc.sheets[0].rows[4][2]
  student[:maxMemory] = 0
  student[:memories] = {}

  puts "\nLoading #{student[:fileName]}..."

  # memory0 읽음
  sheet = isValidSheet(doc.sheets, 0)
  if sheet
    puts "sheet #{i}: match!"
    student[:memories][:init] = makeProb(sheet.rows[2], 1)
  else
    puts "sheet #{i}: invalid sheet name"
  end

  # memory1~4 읽음
  (1..4).each do |i|
    sheet = isValidSheet(doc.sheets, i)
    if sheet
      puts "sheet #{i}: match!"
      makeStrategy(sheet, i, 2..(2**(i*2)+1), i*2, student)
      # makeStrategy(doc.sheets[2], 2..5, 2, student)
      # makeStrategy(doc.sheets[3], 2..17, 4, student)
      # makeStrategy(doc.sheets[4], 2..65, 6, student)
      # makeStrategy(doc.sheets[5], 2..257, 8, student)
    else
      puts "sheet #{i}: invalid sheet name"
    end
  end

  puts "maxMemory: #{student[:maxMemory]}"
  allStudents.push student
end

puts "\nTotal #{allStudents.length} files are completed."
p allStudents
jsonFile = File.open("data/students.json", "w")
jsonFile.write allStudents.to_json
jsonFile.close
