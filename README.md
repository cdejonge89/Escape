# Escape
<h2> Welcome to the underground world of airBNB </h2>
<h3> Collaborators: </h3>
<ul>
<li> Lee DeJonge - login/registration: bcrypt, jwt, cookie-parser </li>
<li>Caroline Denis - created routes, controllers, models, front end design, datepicker, multer for images, mui and css </li>
<li> Jingwin LI - google maps API: dotenv for data protection </li>
<li> Ryan Janusko - socket.io for chat </li>
</ul>

<p> We created a web application that takes you to a dark mode clone of airBNB called Escape.
Created login/registration that was implemented to both a user, host, and stay 
Stored all of our users based off the models we created in our db. 
Passwords are hashed using bcrypt.
Mongoose virtual to avoid storing a confirm password category in the db,
and compares the value to what was set as the password.  
Implemented regex validators to ensure emails are accurate. 
Created and stored secret keys to protect users’ information. 
Created json web tokens along with cookies to keep track of who is logged and what they are saving to their profiles
</p>




https://user-images.githubusercontent.com/107905648/193355661-6cd7c6ea-8585-44e3-8040-d6b262648ecc.mp4

