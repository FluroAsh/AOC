import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const inputArray = input.split(/\n/)

function splitSection(section: string): number[] {
  return section.split('-').map((n) => Number(n))
}

const pairs = inputArray.map((pair) => {
  const a = pair.split(',')

  const sections = a.map((section) => splitSection(section))
  console.log(sections)
  return sections
})

let overlapCount = 0

for (let pair of pairs) {
  // [start, end], [start, end]
  const [p1, p2] = pair

  if (
    (p1[0] >= p2[0] && p1[1] <= p2[1]) ||
    (p2[0] >= p1[0] && p2[1] <= p1[1])
  ) {
    overlapCount++
  }
}

console.log({ overlapCount })
