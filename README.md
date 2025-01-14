# Vivid Express

Vivid Express is an engaging blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Zustand for state management. It allows users to create, share, and explore blogs, offering a seamless and user-friendly experience for content creators and readers alike.

## Technologies
- MongoDB, Express.js, React.js, Node.js (MERN)
- Axios
- useQuery
- Zustand
- Redux
- React Router Dom
- React Hot Toast
- CK Editor 4

## Features
Login <br />

![image info](screenshots/login.png) <br />

Register <br />

![image info](screenshots/register.png) <br />

Home. fetched blogs using useInfiniteQuery and react-intersection-observer useInView to make infinite pagination scrolling possible and also have search and category filter <br />

![image info](screenshots/home-blogs.png) <br />
![image info](screenshots/search-category-sort.png) <br />

Write blog with CK Editor 4 <br />

![image info](screenshots/write-blog-1.png) <br />
![image info](screenshots/write-blog-2.png) <br />

Update Blog <br />

![image info](screenshots/write-blog-1.png) <br />

Delete Blog <br />

![image info](screenshots/delete-blog.png) <br />

View Blog <br />

![image info](screenshots/view-blog.png) <br />

Add Comment <br />

![image info](screenshots/add-comment.png) <br />

View Commments <bt />

![image info](screenshots/view-comments.png) <br />

Edit Comment <br />

![image info](screenshots/edit-comment.png) <br />

View user and thier blogs <br />

![image info](screenshots/view-user.png) <br />

user profile with change profile, name, username and password <br />

![image info](screenshots/profile.png) <br />

Reset Password <br />

![image info](screenshots/reset-password.png) <br />

Confirm Reset Password <br />

![image info](screenshots/confirm-reset-password.png) <br />

## Run Website Locally

clone the project

```
git clone https://github.com/ashifthekkupuram/vivid_express.git
```

go to project directory

```
cd vivid_express
```

go to client directory, install dependencies and create .env file in the client directory

```
cd client
```

```
npm install
```

```
VITE_API_URL = http://localhost:8000/api
VITE_PROFILE_URL = http://localhost:8000/images/profile
```

run the frontend

```
npm run dev
```

open new terminal and go to root directory of the project, install dependencies for the backend and create .env file in the root directory. Backend package file and .env file is in the root diretory

```
npm install
```

```
PORT = 8000
REFRESH_SECRET_KEY = ...
ACCESS_SECRET_KEY = ...
MONGODB_URI = ...
ALLOWED_ORIGINS = 'http://localhost:5173 http://127.0.0.1:5173'
EMAIL = (add the email that need to send email to reset password and verification)
PASSWORD = (password or application password of added email)
```

run the backend

```
npm run dev
```
