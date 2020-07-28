# README
Frontend hosted at: https://lattice-client.netlify.app/
Back end deployed at: https://lattice-server.herokuapp.com/projects

Welcome to Lattice a React frontend Rails backend Trello clone project by Soojin Hong and Jonathan MacMillan built in a week for our third project as part of the General Assembly Software Engineering Immersive Remote.

The purpose of this website is to allow users to create different Kanban style Project boards (called projects) where they can add lists (called cards) with individual items (called tasks). Multiple users can edit shared projects simultaneously, and all modifications (create/edit/delete) update the database in real time and on a single React page.


There are four databases running all with CRUD systems setup. One for Users which includes Session controllers, password authentication and encryption using the Ruby Gem bcrypt.

Users have a HABTM relationship with Projects. Otherwise Projects have many Cards, and Cards have many Tasks.

Our React Component structure cascades in a single browser page. Upon user authentication, the users projects are loaded and displayed. Upon selecting a project the corresponding project's nested cards are displayed. Upon selecting a card, the corresponding card's nested tasks are displayed.

For each of Project, Card and Task, there are components within. Corresponding form components for creating, and displaying.

Technology used:

HTML
CSS
Javascript
React
Material-UI
Netlify
GitHub
PostgreSQL
npms installed include: react-router-dom



Lessons Learned:

- Measure twice, cut once. Many of our problems arose from diving in a little too quickly before we had fully mapped out what our concept was.
- Be deliberate with naming. One of the more embarassing lines of code that we have is "this.props.cards.cards[this.props.cardIndex].tasks".  There were many instances in the naming of Components, Variables, States, Props and Functions when we could have helped make our code much clearer with appropriate names either by adhering to naming conventions or by being more specific, descriptive or deliberate about singularity and/or plurality.
-



Future Goals:

[  ] Renaming of Components, states, props, and functions. There were many instances in building this application where the need element would arise. Before thinking about the full scope of a new element we would proceed with naming and writing it. Only as we used these elements more extensively, often nested or passed up or down many generations did we realize just how confusing or vague our naming was. Following standard or much more descriptive naming conventions could have solved many problems.
[  ] Allow editing of all four databases.
[ ] Allow deleting of cards and tasks.
[ ] Clean up pieces of dead code.
[ ] Applying drag and drop capabilities. This was always on our stretch list, but time constraints kept us from implementing the code. Ideally we would like to be able to drag and drop tasks within their cards, and even between cards within single projects.
[ ] Improving UX/UI design. Specifically making it more intuitive how to add cards and tasks. Right now these elements are added onBlur or when the user clicks away from the input field. But that can be confusing when a user presses enter while still in the field. We want to make this clearer.
[ ] Improving the UX/UI of the layout. Moving buttons, input fields and elements so that they make more sense.
[ ] Further CSS styling. Specifically making more clear and attractive cards and tasks within cards.
[ ] Improving the styling of the home page and adding some content explaining the purpose of the site.
[ ] Increasing the amount and type of information stored about each User.  And displaying elements of this information.
[ ] Allowing for more customizable displays of information by the user.
[ ] Clean up sync/async problems. There are some hacky fixes right now upon the update of certain elements, specifically the changeCurrentlyRenderingCards function in Lattice.js. 
