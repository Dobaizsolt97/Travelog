# The API-s user guide

## Where to get the data

__All API points are preceded by  **/api**__ for example **/api/create/post

User related api points:
 **/signup** POST- you will have to send form data containing email,name,password
 **/signin** POST- send password and email, you will recieve a token in return
  **/signout** GET - no data is needed 

Categories related api points:
**/categories** GET-  recieve all the categories 
**/create/category** POST- send a name in order to create a new category

Posts related api points:
**/posts** GET- recieve a list with the posts (photo is not included)
**/post/photo/:postId** GET- send the id that belongs to the post in order to recive it's asociated image
**post/:postId** GET- the same as above, here you get the data withouth image
**/create/post** POST -  send a title,rating,info1,traveler,description,category