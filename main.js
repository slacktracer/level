const { copy, markRuler, unmarkRuler } = require('./helpers')
const test = require('./tester')
const solve = require('./solver')
const apply = require('./applier')
const weld = require('./welder')

module.exports = function ranger(__intervals__, __ruler__) {
  let ruler = markRuler(__ruler__)

  if (__intervals__.length === 0) {
    ruler.sort((a, b) => a.begin - b.begin)
    ruler = weld(ruler)
    return unmarkRuler(ruler)
  }

  const intervals = copy(__intervals__)

  const interval = intervals.shift()

  let conflict
  ruler.some((segment) => {
    conflict = test(interval, segment)
    return conflict
  })

  if (conflict) {
    const solution = solve(conflict)
    ruler = apply(solution, ruler)
    intervals.unshift(...solution.create)
  } else {
    ruler.push(interval)
  }

  return ranger(intervals, ruler)
}
