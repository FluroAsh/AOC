import fs from 'fs'

const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const inputArray = input.split(/\n/)

const pairs = inputArray.map((pair) => {
  const a = pair.split(',')

  const sections = a.map((section) => section.split('-').map((n) => Number(n)))
  console.log(sections)
  return sections
})

let overlapCount = 0

// check how many pairs have sections that are fully contained within the other

// [start, end], [start, end]
// if start[0] >= start[1] && end[0] <= end[1]

for (let pair of pairs) {
  const [p1, p2] = pair

  if (
    (p1[0] >= p2[0] && p1[1] <= p2[1]) ||
    (p2[0] >= p1[0] && p2[1] <= p1[1])
  ) {
    overlapCount++
  }
}

console.log({ overlapCount })
