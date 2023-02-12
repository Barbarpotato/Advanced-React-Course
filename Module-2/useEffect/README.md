# What is useEffect Hook?
You have been introduced to the primary usage of the useEffect hook, a built-in React hook best suited to perform side effects in your React components.

In this reading you will be introduced to the correct usage of the dependency array and the different useEffect calls that can be used to separate different concerns. You will also learn how you can clean up resources and free up memory in your useEffect logic by returning a function.

The code you place inside the useEffect hook always runs after your component mounts or, in other words, after React has updated the DOM.

In addition, depending on your configuration via the dependencies array, your effects can also run when certain state variables or props change. 

By default, if no second argument is provided to the useEffect function, the effect will run after every render.
```
useEffect(() => { 
   document.title = 'Little Lemon';
 }); 
```
However, that may cause performance issues, especially if your side effects are computationally intensive. A way to instruct React to skip applying an effect is passing an array as a second parameter to useEffect.

In the below example, the integer variable version is passed as the second parameter. That means that the effect will only be re-run if the version number changes between renders.
```
useEffect(() => { 
  document.title = `Little Lemon, v${version}`;
}, [version]); // Only re-run the effect if version changes 
```
If version is 2 and the component re-renders and version still equals 2, React will compare [2] from the previous render and [2] from the next render. Since all items inside the array are the same, React would skip running the effect.

<strong>Use multiple Effects to Separate Concerns</strong>

React doesn’t limit you in the number of effects your component can have. In fact, it encourages you to group related logic together in the same effect and break up unrelated logic into different effects.

```
function MenuPage(props) { 
  const [data, setData] = useState([]); 

  useEffect(() => { 
    document.title = 'Little Lemon'; 
  }, []); 

  useEffect(() => { 
    fetch(`https://littlelemon/menu/${id}`) 
      .then(response => response.json()) 
      .then(json => setData(json)); 
  }, [props.id]); 

  // ... 
} 
```
Multiple hooks allow you to split the code based on what it is doing, improving code readability and modularity.

## Effects with Cleanup
Some side effects may need to clean up resources or memory that is not required anymore, avoiding any memory leaks that could slow down your applications.

For example, you may want to set up a subscription to an external data source. In that scenario, it is vital to perform a cleanup after the effect finishes its execution.

How can you achieve that? In line with the previous point of splitting the code based on what it is doing, the useEffect hook has been designed to keep the code for adding and removing a subscription together, since it’s tightly related. 

If your effect returns a function, React will run it when it’s time to clean up resources and free unused memory.
```
function LittleLemonChat(props) { 
  const [status, chatStatus] = useState('offline'); 

  useEffect(() => { 
    LemonChat.subscribeToMessages(props.chatId, () => setStatus('online')) 

    return () => { 
      setStatus('offline'); 
      LemonChat.unsubscribeFromMessages(props.chatId); 
    }; 
  }, []); 

  // ... 
} 
```
Returning a function is optional and it’s the mechanism React provides in case you need to perform additional cleanup in your components.

React will make sure to run the cleanup logic when it’s needed. The execution will always happen when the component unmounts. However, in effects that run after every render and not just once, React will also clean up the effect from the previous render before running the new effect next time.

# Data fetching using hooksYou learned more about fetching data using hooks and that fetching data from a third-party API is considered a side-effect that requires the use of the useEffect hook to deal with the Fetch API calls in React.

You also explored how the response from fetching third-party data might fail, or be delayed, and that it can be useful to provide different renders, based on whether or not the data has been received.

In this reading, you will explore the different approaches to setting up the useEffect hook when fetching JSON data from the web. You will also learn why it can be useful to provide different renders, based on whether or not the data has been received.

You have previously learned about using the Fetch API to get some JSON data from a third-party website in plain JavaScript.

You'll be glad to learn that data fetching is not that different in React.

There is only one more ingredient that you need to keep in mind when working with React, namely, that fetching data from a third-party API is considered a side-effect.

Being a side-effect, you need to use the useEffect hook to deal with using the Fetch API calls in React.

To understand what that entails, let me illustrate it with a code example where a component is fetching some data from an external API to display information about a cryptocurrency.

```
import { useState, useEffect } from "react"; 
 
export default function App() { 
  const [btcData, setBtcData] = useState({}); 
  useEffect(() => { 
    fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`) 
      .then((response) => response.json()) 
      .then((jsonData) => setBtcData(jsonData.bpi.USD)) 
      .catch((error) => console.log(error)); 
  }, []); 
 
  return ( 
    <> 
      <h1>Current BTC/USD data</h1> 
      <p>Code: {btcData.code}</p> 
      <p>Symbol: {btcData.symbol}</p> 
      <p>Rate: {btcData.rate}</p> 
      <p>Description: {btcData.description}</p> 
      <p>Rate Float: {btcData.rate_float}</p> 
    </> 
  ); 
} 
```
This example shows that in order to fetch data from a third party API, you need to pass an anonymous function as a call to the `useEffect` hook.
```
useEffect( 
    () => { 
        // ... data fetching code goes here 
    }, 
    [] 
); 
``` 
The code above emphasizes the fact that the useEffect hook takes two arguments, and that the first argument holds the anonymous function, which, inside its body, holds the data fetching code.

Alternatively, you might extract this anonymous function into a separate function expression or function declaration, and then just reference it.

Using the above example, that code could be presented as follows:
```
import { useState, useEffect } from "react"; 
 
export default function App() { 
  const [btcData, setBtcData] = useState({}); 
 
  const fetchData = () => { 
    fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`) 
      .then((response) => response.json()) 
      .then((jsonData) => setBtcData(jsonData.bpi.USD)) 
      .catch((error) => console.log(error)); 
  }; 
 
  useEffect(() => { 
    fetchData(); 
  }, []); 
 
  return ( 
    <> 
      <h1>Current BTC/USD data</h1> 
      <p>Code: {btcData.code}</p> 
      <p>Symbol: {btcData.symbol}</p> 
      <p>Rate: {btcData.rate}</p> 
      <p>Description: {btcData.description}</p> 
      <p>Rate Float: {btcData.rate_float}</p> 
    </> 
  ); 
} 
```
The code essentially does the same thing, but this second example is cleaner and better organized.

One additional thing that can be discussed here is the return statement of the above example.

Very often, the response from fetching third-party data might fail, or be delayed. That's why it can be useful to provide different renders, based on whether or not the data has been received.

The simplest conditional rendering might involve setting up two renders, based on whether or not the data has been successfully fetched.

For example:
```
 return someStateVariable.length > 0 ? ( 
    <div> 
      <h1>Data returned:</h1> 
      <h2>{someStateVariable.results[0].price}</h2> 
    </div> 
  ) : ( 
    <h1>Data pending...</h1> 
  ); 
```
In this example, I'm conditionally returning an h1 and h2, if the length of the someStateVariable binding's length is longer than 0.

This approach would work if the someStateVariable holds an array.

If the someStateVariable is initialized as an empty array, passed to the call to the useState hook, then it would be possible to update this state variable with an array item that might get returned from a fetch() call to a third-party JSON data provider.

If this works out as described above, the length of the someStateVariable would increase from the starting length of zero - because an empty array's length is zero.

Let's inspect the conditional return again:
```
 return someStateVariable.length > 0 ? ( 
    <div> 
      <h1>Data returned:</h1> 
      <h2>{someStateVariable.results[0].price}</h2> 
    </div> 
  ) : ( 
    <h1>Data pending...</h1> 
  ); 
```
If the data fetching fails, the text of "Data pending..." will render on the screen, since the length of the `someStateVariable` will remain being zero.
