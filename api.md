# API Documentation

## AUTH ROUTES
### POST /auth/signup  
Register a new user

### POST /auth/login  
Login user and returns JWT token

---

## COURSE ROUTES
### GET /courses  
Fetch all courses

### GET /courses/:id  
Fetch course details by ID

### POST /courses  
Create a new course (Instructor only)

---

## LESSON ROUTES
### GET /lessons/:courseId  
Fetch all lessons for a course

### GET /lessons/:id  
Stream a single lesson video

---

## QUIZ ROUTES
### GET /quiz/:courseId  
Fetch quiz questions for a course

### POST /quiz/submit  
Submit answers and get score

---

## PROGRESS ROUTES
### GET /progress/:userId/:courseId  
Fetch user progress

### POST /progress/update  
Update progress after watching video
