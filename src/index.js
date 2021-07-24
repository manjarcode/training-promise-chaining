import "./styles.css";

function chainResolve() {
  return Promise.resolve(["This is a promise resolved"])
    .then((message) => [...message, "I can access the value"])
    .then((message) => [...message, "and I can keep adding .then methods"])
    .then((message) => [
      ...message,
      "since .then method return a promise itself"
    ])
    .then((message) => [
      ...message,
      "in every step I got the previous value from the chain"
    ])
    .then((message) => [
      ...message,
      "we are adding lines to the message on every .then"
    ])
    .then((message) => [...message, "and we can continue as much as we want"])
    .then((message) => {
      message.map((line) => console.log(line));
    });
}

function chainError() {
  return Promise.reject(new Error(["This is an error"]))
    .catch((e) => {
      throw new Error(`${e.message}\nwhat if i throw a new error 🤔`);
    })
    .catch((e) => {
      throw new Error(`${e.message}\nI can keep chaining errors 😃`);
    })
    .catch((e) => {
      throw new Error(`${e.message}\nCopying the "previous" value`);
    })
    .catch((e) => {
      throw new Error(`${e.message}\nBut I can't just return the value`);
    })
    .catch((e) => {
      throw new Error(
        `${e.message}\nBecause if I do, I won't have error anymore`
      );
    })
    .catch((e) => {
      throw new Error(
        `${e.message}\nAnd I will have to "catch" the error with a .then`
      );
    })
    .catch((e) => {
      console.log(e);
    });
}

function breakErrorChain() {
  return Promise.reject(new Error(["This new error"]))
    .catch((e) => {
      throw new Error(`${e.message}\nI will just return it next line`);
    })
    .catch((e) => {
      e.message += "\nReturning the error will stop the .catch chain";
      return e;
    })
    .catch((e) => {
      console.log("I give you 1.000.000€ if I got executed 😎");
    })
    .then((value) => {
      console.log("But now I'm the one who got the 'error'", value);
    });
}

async function mainTask() {
  await chainResolve();
  console.log("----------------------------------");
  await chainError();
  console.log("----------------------------------");
  await breakErrorChain();
}

mainTask();
