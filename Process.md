shit that i know

database:
1. connecting to mongoose
2. modelling the tables
3. mongoonse basic crud operations

authentication
1. encrypting with bcrypt
2. using jwt to get the bearer token from the frontend validating it in the middleware and giving access to the site

server
1. setup with nodemon
2. model view controller (lacks the modularity)
3. error handling

shit that i don't know

databse:
1. what happenes when too many request hit the backend so that mongoose connection cannot handle it
2. interconnection with model like for example lets say there is categories model and product model should categories store an array with product id or entire product and should product store the categories id or entirity of it
3. how the fuck mongoose connect to the database (inner protocols)
4. does changing one model changes the other model related to it
5. how to handle multiple queries at once

authentication
1. cookies
2. why cookies need shit ton of setup with cors
3. oauth
4. diff authentication authorization

server
1. modularity
2. oops + classes
3. caching
4. threads
5. difference between normally sending the response and the json stuff in details
6. nodemailer
7. webhook
8. payments
9. connect to s3 for media upload/ cdn


other shit: proxy, nginx, aws-lamda, aws normal, can't remember everything

Process
design the db
*order - request to purchase product or services
should contain product, their prices , quantity , tax, shipping cost, total, id, address and status [pending, processing, completed, cancelled]

two ways to create order
cart order -> add to cart then checkout the cart 
buy single -> just go to checkout
