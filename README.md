# web-framework-with-ts

We have two classes

- Model Class : handles the data and resources
- View Class : responsible for producing HTML and showing that to the user. It's also going to be responsible for handling events caused by the user

![overview of classes ](notes/1.PNG)

## Models

<b>Extraction approach</b> : The general idea behind this approach is to build something specific and then pulling something reusable out of it; which you might refer to as like an extraction approach.

So we're trying to build up something specific application to represent a user, and then we're going to extract some reusable library out of it.

![extraction approach](./notes/3.PNG)

### Implementation Rules - User

![Implenentation rules for User class](./notes/2.PNG)
![User class with methods and properties](./notes/4.PNG)

### On - Click event Listner

The On function takes two arguments :

- EventName : string
- callBack : function

Whenever the User triggers a event with a particular name, we'll add it to the array.

So the keys of this object are going to be event names, then the values are going to be arrays that store all the different callbacks that have been registered for each of these different events.

So in other words, if some other developer makes use of our user and they call on with an event name of click and then pass in some callback and then do the exact same thing a second time, we're going to take both the callbacks they pass in and we're going to add them to an array.

Where the click property inside this object points out that array, when we eventually decide to trigger the click event, we will iterate through this array and call each of those callback functions.

This is a pretty standard eventing style set up right here, so you'll actually see this kind of implementation with many other styles of eventing libraries in JavaScript as well.

![Implementing event listner](./notes/6.PNG)

### Trigger

Whenever the user triggers the event with the eventName, all the callbacks in the particular event array gets executed.

### Fetch and Save

Axios is used to make a call to fetch the data from the JSON placeholder and save the data in the local db regarding the same.

![Axios architecture in fetching and saving the User data](./notes/7.PNG)
![Sample API calls](./notes/8.PNG)
