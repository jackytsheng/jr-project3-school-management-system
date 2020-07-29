
[![Build Status](https://travis-ci.com/rmr101/campus-frontend.svg?branch=master)](https://travis-ci.com/rmr101/campus-frontend)

[Website link](https://rmr101.github.io/campus-frontend/)

## Content
- [Content](#content)
- [About JR Academy Projects 3 - Campus system 1.0](#about-jr-academy-projects-3---campus-system-10)
- [How to interact with the client site](#how-to-interact-with-the-client-site)
	- [For Normal Interaction](#for-normal-interaction)
	- [With Docker](#with-docker)
	- [Without Docker](#without-docker)
- [UI Design](#ui-design)
	- [Energetic Login Page](#energetic-login-page)
	- [Avatar Profile](#avatar-profile)
	- [Role Specific Panels](#role-specific-panels)
	- [Responsive](#responsive)
- [Supported Features](#supported-features)
	- [Assignment System](#assignment-system)
	- [User Management](#user-management)
	- [Subject Creation](#subject-creation)
	- [Course Management](#course-management)
	- [Student Course Enrolment](#student-course-enrolment)
	- [Changing Password](#changing-password)
- [About Redux Dev Tool](#about-redux-dev-tool)
- [Future Improvement](#future-improvement)

## About JR Academy Projects 3 - Campus system 1.0

This is project three from JR Academy. We are team RMR101. Objective of the project is to deliver a **learning management system** for an educational purpose.

**Features Summary:**

- Adding teacher, students, courses as admin.
- Enrolling in various courses as student.
- Submitting and reviewing assignments as student. (Not support feature for public access, as AWS is involved, but can be configured.)
- Marking and creating assignment as teacher.
  
**Tech stack for frontend Summary:**

Websites & UI:

- React
- Sass (module)
- React-redux
- React-router
- Axios

Testing & Type Checking:

- Jest & Jest-dom
- Testing library
- PropTypes library

Security:

- Jwt

Clouds:

- AWS S3 & Presigned URL
- AWS SDK

CI/CD:

- Travis CI
- Github page
- Docker

Development:

- Agile (Scrumn)
- Github flow

Miscellaneous:

- Particle.js

For website, [Visited here](https://rmr101.github.io/campus-frontend/). However, you do need to run the backend for this website in order to interact with it. [Quick guide to set up backend of this project.](https://github.com/rmr101/campus-backend).

## How to interact with the client site

### For Normal Interaction

[This website is hosted at github page](https://rmr101.github.io/campus-frontend/), all you need is to log in as admin account.

ADMIN account:

**Username: admin**

**Password: admin**

Then you can kick off from there.

For student and teacher account, initial password is the same as the user ID.

eg:

**Username: S29036164**

**Password: S29036164**

### With Docker

1. Set up Backend and docker container for MySql image. Click [here](https://github.com/rmr101/campus-backend) for the backend application.
2. Navigate to the file where you want to test this application, then on your terminal run `git clone https://github.com/rmr101/campus-frontend.git`
3. Change directory into `cd campus-frontend`.
4. Under to the root directory run `docker-compose up -d --build`.
5. Then visit `https://localhost:3010`.


### Without Docker
 
1. Set up Backend and docker container for MySql image. Click [here](https://github.com/rmr101/campus-backend) for the backend application.
2. Navigate to the file where you want to test this application, then on your terminal run `git clone https://github.com/rmr101/campus-frontend.git`
3. Change directory into `cd campus-frontend`.
4. run `npm install` or `yarn install`
5. `npm start` or `yarn start` , make sure you have set up the back end for this project.
6. This project also implement Redux Dev Tool extension on chrome. If haven't installed them [please check here.](#about-redux-dev-tool-in-this-project)


## UI Design

### Energetic Login Page

![find](readme_img/login.png)


### Avatar Profile

![find](readme_img/avatar-selection.png)

### Role Specific Panels

![find](readme_img/role-panel.png)

### Responsive

![find](readme_img/responsive.png)

## Supported Features

### Assignment System

##### Publish Assignment

![find](readme_img/publish-new-assignment.png)

##### Student can view the newest assignment, for every enrolled course

![find](readme_img/student-assignment-filter.png)

##### Upon completion, student can upload their response. File is stored in AWS S3

- Support file type: .pdf
- File size limit : Less than 15 MB.

Note: student can re-upload assignment until due date has passed.

![find](readme_img/upload.png)

##### After submission, teacher can download student response

![find](readme_img/teacher-assignment-filter.png)

After reviewing, teacher can leave a report.

![find](readme_img/teacher-report.png)

##### After marking, student can view result

Note: student is not allowed to view assignment again after teacher has marked it, for academic confidentiality.

![find](readme_img/student-view-report.png)

### User Management

#### CRUD Operation As Admin

##### Creating new user

Note: login in as admin, create student/teacher at dashboard.

![find](readme_img/user-create.png)

##### Check for successful creation

Note: Search bar supports **fuzzy searching**

![find](readme_img/user-search.png)

##### Edit page for user profile

![find](readme_img/user-edit-profile.png)

Note: Currently admin can:

1. Reset user password
2. Deactivated a user

Upon deactivation, user can no longer login, and will not appear in any search result.

![find](readme_img/user-deactivation.png)

### Subject Creation

#### Create new subject As Admin

Note: login in as admin, create subject at **dashboard**. 

1. Only accept 3 letter alphabet for subject code (regex implemented).
2. Course code is made out of 3 letter alphabet and 8 numbers.

![find](readme_img/subject-creation.png)

Upon creation subject will appears in course market subject list.

![find](readme_img/subject-check.png)

### Course Management

#### Create new course As Admin

Note: login in as admin, create course under any selected subject. Teacher must be assigned.

![find](readme_img/course-creation.png)

#### Assigning teacher to a course

Once click, a pop up shows up.

Note: debounce associative-word searching is supported

![find](readme_img/course-add-teacher.png)

Before confirming, teacher can still be re-assigned. But once post, **teacher can't be reassigned** for this course at this semester.

![find](readme_img/course-edit-teacher.png)

#### Find the course

Two ways that an admin can find a course:

1. Through global searching.
2. Through Navigating to the subject that has this course.

![find](readme_img/course-search.png)

#### Edit Course Detail

Under course detail page, admin has the authority to change course content (excpet: year, semester, teacher)

![find](readme_img/course-edit.png)

### Student Course Enrolment

![find](readme_img/course-enrol.png)

Upon enrollment, student can find it at the Nav bar.

![find](readme_img/course-after-enrol.png)

### Changing Password

Any user (except administration account) can change their password at the profile page.

![find](readme_img/change-password.png)

## About Redux Dev Tool
This project have used redux dev tool.

If you haven't already installed it for your browser, you could do so at this [link](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Future Improvement

#### Tech：
1. **Router for page navigation**
2. **Style Component / System for better readability and maintanability**
3. **Depoly on EC2 as docker image**
   
#### Feature：
1. **Support multiple teachers teaching**
2. **Support payment**
3. **Support file sharing for courses**
4. **Make changing password after first login mandatory**
