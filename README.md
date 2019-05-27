# E-Commerce-MVP

## About
This is a simple E-Commerce application. It allows users to add multiple items into the cart multiple times, delete items from the cart and checkout those items. The inventory/Stock is kept in synchrony during the whole checkout process. The items with 0 inventory can not be added into the cart. By repeatedly, adding the item  into the cart, the user can bring its inventory count to 0, at which point, it can no longer be added into the cart. However, if the user decides to release it ( as in the second page of the application), the item will be able to be added into the cart again.

If the user happens to close the browser whilst in the middle of transaction, the cart information can be retrieved by just going back to the website. At the end of the checkout i.e when the transaction has been completed, the cart session gets destroyed and the user receives a receipt in his/her email which details all the item he/she has bought.

The application has two pages
1) Main page
2) Checkout page

From within the main page, multiple items can be added multiple times. If the user decides to click on the picture, additional details about the item gets popped up. Here, the user can add also the item to the cart.

By Pressing the top right button 'Cart', the user will go to the checkout page, here the user can readjust the quantities of the items already in the cart. The user can also go back to the main page by pressing the heading on the top left corner.
When the user is satisfied with the quantity, the user can type in his/her email address and press the buy button. The Buy Button will give an error if the user types in an invalid email address.


## Demo
Application is hosted on Google App Engine:
https://front-end-app-dot-testproject-241518.appspot.com/


## Technical Details
The application is built using a decoupled approached where the front end of the application communicates with the back-end via a series of API calls.


### Front-End
The Front-End of the application can be divided into three main parts: 
1) Root Application (App.js)
2) Components
3) Services

The Root of the application (App.js) is where all the initilzing happens. This is where the state of the application lives. It also the navigation routes registered. 

Components are the children of App.js and receive props from their parent (App.js)

Services is where the API is defined.

### Back-End

The Back-End of the application consists of:
1)Index.js
2)Third Party
3)Custom Middleware
4)Supporting Database files


Index.js is the starting point of the application. The is where the third party middlewares are registered and the initial routes are declared.

Third Party are some of the supporting libraries which help in initial parsing of the request or implementing CORS.

Custom Middleware are registered with the routes to allow the request to follow a certain pipeline and can be responded with appropriate response.

Supporting Database files (Repository and Model) are just modules to interface with the database.

### Technology used: 
* Node.js v8.15.1 --- Express
* MongoDB
* Create React App

### How to run in your environment:

1) Clone this repository.
2) Install the required technologies which I mentioned above
3) Do your custom settings on these hidden files:
  * Back-End-ECommerce/mongoDBConfig/key.js
  * Back-End-ECommerce/app/services/emailSecrets.js for Email
  * front-end-ecommerce/src/api/api.js
4) npm install 
5) npm start :) (Both)






