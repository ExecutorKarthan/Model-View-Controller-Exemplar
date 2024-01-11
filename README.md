# Model-View-Controller-Exemplar
This is an example of a tech blog that uses the Model-View-Controller ideology. It is deployed to Heroku and can be found here: [https://mvc-demo-blog-app-f4dd43ae92f7.herokuapp.com/](https://mvc-demo-blog-app-f4dd43ae92f7.herokuapp.com/)

## Description
This program was an excellent way for me to see all the pieces of the MVC ideology and to develop a schema in my mind of how each component works. This project provided me an opportunity to experiment and implement Handlebars to take care of my HTML formatting. From there, I needed to write Javascript files to handle the interaction between the HTML and the SQL database via routes. I then had to forward that database interaction to the HTMl using different routes, thus completing the interaction. This project required me to really understand how to pass data from the HTML (in the form of user interaction) to the controllers via the routes. It also require me to experiment and understand how data can be passed back to the HTML via routes to Handlebars. 

This project was also important in helping me understand how make an app that requires secure log in. This app requires bcrypt to allow a user to save a stored, hashed password. This password is then used for verification to ensure a user is logged into their account. Without this login, the app will restrict user activity in the app until the user authenticates via logging in. This provided me a solid introduction to sessions and cookies, as my HTML is written to change its displayed data based on if the user is logged in. That is accomplished by storing if the user is sign in or not in a session cookie. 


## Installation
This project requires the following packages to function:
1) "dotenv" which can be found at [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
2) "sequelize" which can be found at [https://sequelize.org/docs/v6/](https://sequelize.org/docs/v6/)
3) "express" which can be found at [https://expressjs.com/](https://expressjs.com/) 
4) "mysql2" which can be found at [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
5) "handlebars" which can be found at [https://handlebarsjs.com/](https://handlebarsjs.com/)
6) "bcrypt" which can be found at [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) 
6) "connect-session-sequelize" which can be found at [https://www.npmjs.com/package/connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)

The user must also have a .env file with their SQL credentials stored for the program to interact with the SQL database locally. Otherwise, this program runs via Heroku and requires no installations

## Usage
Once installed, the user needs to start their npm server with the command '''npm start''. Then the user can navigate to "hostlocal:3001" to see the app. Alternatively, a user can navigate to [https://mvc-demo-blog-app-f4dd43ae92f7.herokuapp.com/](https://mvc-demo-blog-app-f4dd43ae92f7.herokuapp.com/). From there, the user can have the web experience of the app. 

A video walkthrough of the locally deployed app can be found <a href="./assets/E-commerce-backend.mp4"> here</a>.

## License
This product is protected by a [MIT License](http://choosealicense.com/licenses/mit).

## Contributing
I, Alex Messina, authored the majority of this code. Its layout and design was inspired by education resources. The files in the utilities folders were taken from education examples provided in my coding bootcamp.

## Tests
No tests were prepared for this project. Error codes will be displayed by SQL if they occur and erratic behavior can be observed since the output is printed to console.

## Questions
My GitHub username is [ExecutorKarthan](https://github.com/ExecutorKarthan) and this project can be found at [https://github.com/ExecutorKarthan/E-commerce-backend](https://github.com/ExecutorKarthan/E-commerce-backend)

If you have questions or concerns about this project, please email me at me@alexmessina.dev