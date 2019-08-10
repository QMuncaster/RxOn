# RxOn

## Progress 5 Description (for industry professionals on demo day)

RxOn is an online pharmacy platform that aims to simplify through digitalization the process of requesting and filling prescriptions. The basic functionality of a patient account includes uploading, requesting refills and viewing past prescriptions, while a pharmacy account has the ability to fill prescriptions, view all patients and view all existing prescriptions.

## Project Description

Replace with screenshot of project and description of all implemented features!


## Project Addendum

### Code Style:

We followed the recommended Meteor project structure:
https://guide.meteor.com/structure.html.
We use several ‘/server’ subdirectories to prevent our “secret” authentication methods from being exposed to the client (although our repo is public and our authentication is quite standard).

### Basic Technology Requirements: 
 
- HTML/JS/CSS (JSS)
These technologies are the backbone of our app. The main front-end entrypoints are main.html and main.js, where the latter targets the former to render our (routed) components. We use CSS files to style the login page, and the rest of our styling through MUI is written with JSS, which compiles down to CSS.

- React: Front-end
Our entire front-end is made up of React components, which provides modularization for cleaner project structure, easier routing, and abstraction of rendering logic. We use react state, for example when maintaining text field inputs on the signup form. We use JSX in our render functions where coupling between javascript logic and HTML is natural, for example in determing whether to show a patient or pharmacist child component at the ‘/home’ route.

- NodeJS/Meteor: Back-end
Meteor is another framework we use to process requests from the foreground react and interface with the database layer to handle additions and deletions to individual data models. It also has a series of built-in methods for user registration and login, which we call directly to achieve the registration and login of users of the website. 

- MongoDB
We use Mongodb, a non-relational database, to store our prescription, user and other data. Because it is a non-relational database, there is no longer a fixed schema, we can quickly change the schema of a data model as needed. With the support of meteor collection methods, our app easily links with Mongodb to modify the contents of the database. 

- Release Engineering
By deploying on Heroku, our application can be accessed by the world through a web site, and the configuration of the server can be upgraded to meet more view volume. The Mongodb database we use is a cloud database provided by atlas. For assets storage such as pictures, we use AWS s3 for separate storage.

### Basic Contribution Requirements: 
 
Leadership:
- Omar took the initiative to make sure that every team member was able to contribute, by setting us up with Github Projects to coordinate work, and by explaining new technologies to other team members through videos. He also introduced and implemented several new technologies,  such as MUI to overhaul our UI and image uploading through AWS.

- Charlotte took the initiative to style our initial app prototype and ensure our app was presentable. She also came up with several core features that we had missed and implemented them, such as refill functionality, the prescription history of each patient viewable by a pharmacist, and coloured prescription status indicators.

- Mandy took the initiative get our core app running by independently learning to use the react-router-dom package to setup basic routing. She also implemented our patient list, which included writing new server-side methods. She also lead the team in being collaborative, by actively seeking out code reviews to improve on her work. 

- Quintin took the initiative on security for our core functionality. He setup authenticated routing to ensure only logged in users could access certain pages, and setup user accounts with roles to distinguish pharmacist and patient users. He also helped us transition to removing autopublish and insecure methods by setting up meteor methods and publications which include role-based security checks.


### Basic Functionality Requirements: 

You’re at home, coughing up a storm with a hot water bottle on your chest and cold cloth on your forehead; the last thing you want to do is wait for hours to speak to a doctor at the walk-in clinic, pick up a prescription, travel to a pharmacy and have to wait another half hour to fill the prescription. RxOn is an online pharmacy platform that aims to simplify this process by eliminating the need to drop off your paper prescription and wait for it to be filled. A user can either assume the role of a patient or a pharmacist: after a patient uploads their prescription (inputting rx name, strength, dose, number of refills and picture of prescription), the pharmacist will fill it and change the status of the prescription online, signifying to the patient that their medication is ready for pick-up. Additionally, pharmacists can administer refills easily by the click of a button to those patients eligible for medication refills. RxOn not only benefits the patient users, but also offers a simple and efficient experience for pharmacist users through very accessible “Fill” and “Refill” buttons placed beside prescriptions, a clear patient list page that offers a preview of each patients medical history, and the ability to batch fill prescriptions to save time.


### Challenges, learning, and future directions:

- We have records of several challenges we faced and overcame on Github. Examples include but are not limited to:
https://github.com/QMuncaster/RxOn/issues/31
https://github.com/QMuncaster/RxOn/pull/63
https://github.com/QMuncaster/RxOn/pull/53

- We also overcame several non-technical challenges:
As every member in our group is part of the second-degree BCS program, we come from a vast variety of backgrounds and skill-levels. Some of us had already worked on significant CS group projects before, while others had barely used GitHub. Navigating through the different skills levels and ensuring we were all confidently able to complete work and solve problems was a challenge in the beginning of the project, however we will able to land on solid ground where each member felt secure and could make significant contributions to the project. To achieve this, we recorded videos explaining solutions whenever a group member had a question and posted it in our group chat – this allowed us to easily re-watch videos whenever we had a similar problem or needed to remind ourselves how we solved it the first time. Visual Studio Code LiveShare was also used to allow us to directly help each other by viewing each other’s code. Additionally, what really helped our group was using GitHub Projects, where we added small to-do tasks every couple of weeks and group members were able to assign themselves tasks they felt confident completing. Once a task was completed, a pull-request would be sent to the entire group, and this ensured everyone was up to do and in-tune with how the project was progressing. 

- Future Directions:
To progress further in our project, our next step would be to add a billing system to RxOn. Another stretch goal which would be impactful to add is an image recognition functionality, where the patient uploads a picture of their prescription and the information is pulled directly off the prescription, so the patient doesn’t have to enter all the information manually.


### Initiative and additional contributions: 

- To create the ‘Add Medication Stepper’, we excelled in our understanding of React as seven components were needed to create this sophisticated feature of RxOn. Although challenging, one group member was able to utilize what he has learned from React through the individual assignment and research further to logically nest components to build the stepper.
- An additional technology we incorporated to unify our UI design was Material UI – although this was a new technology that required additionally learning from each of our team members, it allowed us to all work on different parts of the project whilst still maintaining a cohesive visual experience.
- An RxOn feature that shows initiative from our team is the [insert information about image upload and AWS cloud]
