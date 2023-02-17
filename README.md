# Cenith-Innovations-Work-Sample

## Setup

`npm install`

`npm run dev` will open a new tab in your browser to localhost:8080.

`npm run test` will run the tests. 


## Engineering Decisions
I had a few choices when it came to implementing the arrow movement functionality. One was adding an "onKeyDown" attribute to the board and then adding functionality within a useEffect hook to bring that element into focus. However, upon testing the functionality, I found that if a user clicked outside of the board, the arrow keys would no longer control the movement of the player which is not the optimal solution. Instead, I implemented an event listener in a useEffect hook to listen for keydown actions. My first implementation was not functioning correctly due to the scoping of the function being implemented. Upon further research, I found that to avoid this common issue, I would need to pass the handleKeyDown function into the useEffect hook as a dependency.


I also decided to implement a constants file to allow for the developer to easily change things like board size, rules, and colors for each type of square that the player can land on. In order to update the board size, you need to update the board height and board width in the constants.ts file, and update the board-width property in the styles.scss file. I utilized scss instead of css so that I could use a variable that could be easily updated to change the size of the board. 

For testing purposes, I added a couple of default props to the GamePage component and a couple of optional props to the GameBoard component. This helped me to test the winning and losing functionality. 

## Possible Extension

Decreasing the number of squares that are lava, mud, or speeder squares in order to increase the playability
