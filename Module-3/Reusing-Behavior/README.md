# Higher-order components

`A higher-order component is a function that takes in a component and returns a new component.`

`The purpose of a HOC is to enhance a component (usually a dumb component) with extra functionality. A HOC allows for reusability since in real-life applications there is a need to re-use the same functionalities in various similar kinds of components.`

Let's dive deeper to illustrate some of the best practices and caveats regarding HOCs.

These include never mutating a component inside a HOC, passing unrelated props to your wrapped component, and maximizing composability by leveraging the Component => Component signature.

## Don’t mutate the original component
One of the possible temptations is to modify the component that is provided as an argument, or in other words, mutate it. That's because JavaScript allows you to perform such operations, and in some cases, it seems the most straightforward and quickest path. Remember that React promotes immutability in all scenarios. So instead, use composition and turn the HOC into a pure function that does not alter the argument it receives, always returning a new component.
```js
const HOC = (WrappedComponent) => {
  // Don't do this and mutate the original component
  function WrappedComponent = () => {
    
  }; 
 …
}
```
instead:
```js
const HOC = (WrappedComponent) => {
    return (props) => {
        //Doing some Logic here using built in react hook? Optional.
        return (
            // Passing props to the component that has the identical funcionalities
            // the props will access by the WrappedCompnent and process the data.
            <WrappedComponent />
        )
    }; 
}
export default HOC;
```

## Pass unrelated props through to the Wrapped Component
HOC adds features to a component. In other words, it enhances it. That's why they shouldn't drastically alter their original contract. Instead, the component returned from a HOC is expected to have a similar interface to the wrapped component.

HOCs should spread and pass through all the props that are unrelated to their specific concern, helping ensure that HOCs are as flexible and reusable as possible, as demonstrated in the example below:
```js
const withMousePosition = (WrappedComponent) => {
  const injectedProp = {mousePosition: {x: 10, y: 10}};

  return (originalProps) => {
    return <WrappedComponent injectedProp={injectedProp} {...originalProps} />;
  };
};
```

## Maximize composability
So far, you have learned that the primary signature of a HOC is a function that accepts a React component and returns a new component.

Sometimes, HOCs can accept additional arguments that act as extra configuration determining the type of enhancement the component receives.
```js
const EnhancedComponent = HOC(WrappedComponent, config)
```

# Render Props
The render props pattern is a way to share functionality between components without repeating code. The official React docs define it as — <br/>
`The term “render prop” refers to a simple technique for sharing code between React components using a prop whose value is a function.`
For example:
```js
const DataProvider = ({render}) => {
    const [data, setData] = useState('');

    const fetchSomeData = () => {
        fetch("some-url-api")
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(err => console.log(err)) 
    }

    useEffect(() => {  
        fetchSomeData()
    }, [])

    return render(data)
}

const userIntroduction = () => {
    return(
        <DataProvider render={data => (
            <React.Fragment>
                <h1>Hello {data.username}</h1>
                <p>Your Current Location: {data.location}</p>
            </React.Fragment>
        )}/>
    )
};
```
By using a prop to define what is rendered, the component just injects functionality without needing to know how it is being applied to the UI. Let’s take a look at an example to understand what this actually means.