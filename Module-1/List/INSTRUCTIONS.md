# Instructions

### Task
In this lab, you are going to implement a new list component, `DessertsList`, that will display a list of desserts with less than 500 calories, all sorted by calories, from low to high.

The data you have to work with has been provided to you inside the App.js file, as an array of objects. Each object represents a dessert and has the following properties: `name`, `calories` and `createdAt`.

The `App` component passes that information to the `DessertsList` component as a prop named `data`.

Each item from the list should display the name of the dessert and the number of calories, both separated by a dash character, i.e. `Chocolate Mousse - 250 cal`.

# What are keys in React?
React applies it's stiffening algorithm to calculate the minimum number of changes that are necessary to perform an update in your tree of components. Although this algorithm works perfectly most of the time, as mentioned earlier, there are some cases where React can't make important assumptions to find the most optimal path for an update, which means the developer will need to step in.
<br/><br/>
Let's explore one such example. Imagine the drink section in the little lemon online menu where restaurant managers can add new drinks depending on the season. When they add a new element at the end of the list, the different algorithm works well, since React will match the two beer trees, match the two wine trees, and then insert the cider tree. However, when inserting a new element at the beginning of the list, the algorithm offers worse performance because React will mutate every child instead of realizing it can keep the beer and wine sub trees intact. This inefficiency can be a problem
<br/><br/>
To solve this issue, React supports a key attribute. What are keys? Keys are identifier's that help React to determine which items have changed or added or are removed. They also instruct how to treat a specific element when an update occurs and whether its internal state should be preserved or not. 
<br/><br/>
The general rule of thumb with keys is to use a stable identifier that is unique among its siblings. This allows React to reuse as many elements from the list as possible, avoiding unnecessary recreations, especially when their content is exactly the same and the only thing that has changed is their position in the list. The key used most often is a unique ID that comes from your data. Those IDs typically mirror a database ID