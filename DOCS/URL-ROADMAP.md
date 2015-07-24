
Rule: Whenever you add a new URL to the web app, add it into this table.

This allows us to make sure we are keeping the URL namespace clean, tidy, sane and stable.

# These URLS are the main pages of navigation for actual human interaction

 URL         	|  GET | POST | other | Description        
------------   	| -----| ---  | ---   | ------------ 
 /           	|   *  |      |       | main menu           
 /student    	|   *  |      |       |  student main menu  
 /instructor 	|   *  |      |       |  instructor main menu
 /author     	|   *  |      |       |  author main menu
 /developer     |   *  |      |       |  developer main menu
 /usersettings	|   *  |      |       |   user settings options
 
 
#  /api is for the RESTFUL api used for AJAX style interactions

This list may be incomplete or out of date.   To get the actual URLs used for the API, look at the source code, in files routes/api

## /api/qd is for Quiz Descriptors

 URL         	|  GET | POST | other | Description        
------------   	| -----| ---  | ---   | ------------ 
 /api/qd      |   *  |      |       | gets all quiz descriptors owned by current login user           
 /api/qd/:id  |   *  |      |       | gets quiz descriptor with id :id
 /api/qd 	    |      |  *   |       | post a new quiz descriptor


## /api/quiz is for User Accounts

 URL         	            |  GET | POST | other | Description        
-----------------------   	| -----| ---  | ---   | ------------ 
 /api/user/:awesome_id 	    |      |      |  PUT  | create a new user


# /pa URLs pass directly through to project-awesome functionality.

URL         	    |  GET | POST | other | Description        
------------   	    | -----| ---  | ---   | ------------ 
 /pa/quiz           |   *  |      |       | main menu    

seed=ABCD1234       [TODO: change to s]
showQuestions=yes   [TODO: change to q, 0/1]
showKey=yes         [TODO: change to k, 0/1]
jsonString=[URLencodedQuizDescriptor]  [TODO: change to qd]
format=html [optional, default=html, other option: json]


URL         	    |  GET | POST | other | Description        
------------   	    | -----| ---  | ---   | ------------ 
 /pas/quiz/:id           |   *  |      |       | main menu    

s=ABCD1234 [optional, default: choose randomly, options: any eight digit hex number]
q=1  [optional, default: 1, options 0,1]
k=1  [optional, default: 1, options 0,1]
:id  quiz descriptor id

