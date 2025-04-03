// turn auto save off;
// need to feed text that we get from joke API and we want an audio in return;
// search for a text-to-speech API. future joke API as well;
// SDK; Software Development Kit;

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// disable/enable button

function toogleButton() {
  // if true = false; if false = true; opposite sides;
  button.disabled = !button.disabled;
}

// passing joke to voiceRSS API
// never display API key on the front end
function tellMe(joke) {
  VoiceRSS.speech({
    key: "e5243ff6e1994bf0bf1ca462fdccd1b3",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes from jokes API
// store URL of the API into the apiURL variable;
// store fetch method into a variable, await until the fetch is done to set a response value;
// turn the response into response.json file. response.json() returns a promise; so MUST use await;
// fetch() does a HTTP request and returns a response object;
// .json parses the response body (which is usually in JSON TXT format) and converts it into a JavaScript object

async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      // if there is two part jokes, with setup and deliver properties, the joke variable will be assigned to combine both properties values
      // template strings makes easier to add strings and variable together into one string;
      joke = `${data.setup} ... ${data.delivery}`;
      // if there is just the joke property, bring itself;
    } else {
      joke = data.joke;
    }
    // text-to-speech
    tellMe(joke);
    // disable button
    toogleButton();
  } catch (error) {
    //catch errors
    console.log("ops", error);
  }
}

// Event listeners
// two paraments, first one type of event, second parameter the function name;

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toogleButton);
