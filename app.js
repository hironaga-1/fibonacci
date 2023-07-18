const express = require('express');
const app = express();

function fibonacci(n) {
    if (n === 1 || n === 2) {
      return 1;
    }
  
    let prev = 1;
    let curr = 1;
  
    for (let i = 3; i <= n; i++) {
      const temp = curr;
      curr += prev;
      prev = temp;
    }
  
    return curr;
}

app.get('/fib', async (req, res) => {
    const n = parseInt(req.query.n);

    if (n <= 0 || ! Number.isInteger(n)) {
        return res.status(400).json({ status: 400, message: 'Bad request.'})
    }
    
    const result = fibonacci(n);
    
    if (result === Infinity) {
        return res.status(200).json({ result: result, message: 'The result is Infinity!'})
    }

    const biggestInt = Number.MAX_SAFE_INTEGER; // (2**53 - 1) => 9007199254740991
    if (result > biggestInt) {
        return res.status(200).json({result: result, message: 'Any more than this cannot be safely computed due to the language specification.'})
    }

    res.json({result: result});
});

module.exports = app;
