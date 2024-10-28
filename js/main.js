document.querySelector('#checkWord').addEventListener('click', checkForPalindrome)
const displayResult = document.querySelector('#result')

function checkForPalindrome(){

  const palindrome = document.querySelector("#userName").value.toLowerCase().trim();

  fetch(`/api?palindrome=${palindrome}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      console.log('Your word was:', data.word)
      console.log('Your word reversed is:', data.wordReversed)
      console.log('Is this a palindrome?', data.isPalindrome)
      confirmIfPalindrome(data)

    });

}

function confirmIfPalindrome(data) {
  //make sure word is not an empty string/falsy value
  if(data.word) {
    if(data.isPalindrome) {
      displayResult.innerText = `${data.word} is a palindrome!`
    }else {
      displayResult.innerText = `${data.word} is NOT a palindrome.`
    }
  }else {
    displayResult.innerText = 'Please enter a word.'
  }
}

