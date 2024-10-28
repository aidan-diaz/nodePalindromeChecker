const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('palindrome' in params){
      const palindromeReversed = params['palindrome'].split('').reverse().join('')
      //write word in reverse order
      //can use split reverse join or a for loop
      if(params['palindrome'] && params['palindrome'] === palindromeReversed){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const palindromeResult = {
          word: params['palindrome'],
          wordReversed: palindromeReversed,
          isPalindrome: true
        }
        res.end(JSON.stringify(palindromeResult));
      }
      else if(params['palindrome'] && params['palindrome'] !== palindromeReversed){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const palindromeResult = {
          word: params['palindrome'],
          wordReversed: palindromeReversed,
          isPalindrome: false
        }
        res.end(JSON.stringify(palindromeResult));
      }else {
        const palindromeResult = {
          word: undefined,
          wordReversed: undefined,
          isPalindrome: undefined
        }
        res.end(JSON.stringify(palindromeResult));
      }
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);


