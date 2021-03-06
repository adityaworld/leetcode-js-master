// 986. Interval List Intersections
// Medium   67%


// Given two lists of closed intervals, each list of intervals is pairwise
// disjoint and in sorted order.
// Return the intersection of these two interval lists.
// (Formally, a closed interval [a, b] (with a <= b) denotes the set of real
// numbers x with a <= x <= b.  The intersection of two closed intervals is a set
// of real numbers that is either empty, or can be represented as a closed
// interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

// Example 1:
//
//   A - -       - - - - -
//   B   - - - -       - - - -
// ans   -      |      - -
//    0   2   4   6   8   10  12

// Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
// Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

// Note:
//     0 <= A.length < 1000
//     0 <= B.length < 1000
//     0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9


/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
const intervalIntersection = function(A, B) {
  const res = []
  const m = A.length, n = B.length
  let i = j = 0
  while (i < m && j < n) {
    const a = A[i], b = B[j]
    if (a[1] >= b[0] && a[0] <= b[1]) {
      if (a[0] < b[0]){
        if (a[1] < b[1]) res.push([b[0], a[1]])
        else res.push([...b])
      } else {
        if (a[1] < b[1]) res.push([...a])
        else res.push([a[0], b[1]])
      }
    }

    if (a[1] < b[1]) i++
    else j++
  }
  return res
}

const aMoreConciseMethod = function(A, B) {
  const res = []
  for (let i = j = 0; i < A.length && j < B.length;) {
    if (A[i][1] < B[j][0]) i++
    else if (A[i][0] > B[j][1]) j++
    else {
      res.push([Math.max(A[i][0], B[j][0]), Math.min(A[i][1], B[j][1])])
      if (A[i][1] < B[j][1]) i++
      else j++
    }
  }
  return res
}

;[
  [[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]],
].forEach(([A, B]) => {
  console.log(intervalIntersection(A, B))
  console.log(aMoreConciseMethod(A, B))
})

// Solution:
// εζΆιε A ε B
// ε―ΉδΊ A ε B δΈ­ηδ»»ζδΈ€ζ?΅η΄ηΊΏοΌε?δ»¬ηε³η³»ζδ»₯δΈε η§οΌ
// a = A[i], b = B[j]

// 1οΌζ δΊ€ιζδΈ€η§ζε΅
//  1.1οΌ a[1] < b[0]
//      <---a--->
//                   <---b--->
//  ζ­€ζΆ i++
//  1.2οΌ a[0] > b[1]
//                     <---a--->
//       <---b--->
//  ζ­€ζΆ j++

// 2) ζδΊ€ι a[1] >= b[0]  &&  a[0] <= b[1]
//  2.1) a[0] < b[0] && a[1] < b[1]
//       <---a--->
//              <---b--->
//  [b[0], a[1]], i++
//  2.2) a[0] >= b[0] && a[1] >= b[1]
//              <---a--->
//       <---b--->
//  [a[0], b[1]], j++
//  2.3) a[0] >= b[0] && a[1] < b[1]
//          <---a--->
//        <-----b------>
//  [a[0], a[1]], i++
//  2.4) a[0] < b[0] && a[1] >= b[1]
//        <-----a------>
//          <---b--->
//  [b[0], b[1]], j++

// η?εδ»£η 
// ε°ζδΊ€ιηζζζε΅ε½η»δΈΊ
// ε·¦θΎΉ max(a[0], b[0])
// ε³θΎΉ min(a[1], b[1])

// Submission Result: Accepted