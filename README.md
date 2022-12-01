# Quizoom

This is a training project for ReactJS course in SoftUni academy, started in June 2020.

The WIP version is available on [Quizoom demo](https://quizoom-a1d35.web.app)


## Overview

*Quizoom* is a platform for online quizzes, that everyone can create and participate. The main idea is for quick and easy use. Designed for rapid testing of students, attestation of employees, and a useful tool in conducting job interviews.

To achieve the idea, the following parts were created.

- A very simple registration page, where everyone can register and join without too much effort.
- Simple, well organized intuitive dashboard, where everything can be easily found and managed.
- "Create a quiz" section, to enter the questions and answers quickly and easily with a minimum chance for mistakes and annoyance.
- "Passing a quiz" section where is the place of the challenge.



## How it works

When logged out. The user can log in or register.

When logged in, the user has access to following:

 - His profile data. He can change his profile picture and profile name. 
- His own quizzes. The quizzes created by him, which he can edit, delete and see the metadata, such as who passed it, when and with what results.
- The quizzes he passed himself. This is a history list of passed quizzes along with the time and the results.
- The available quizzes. On the right side, he will see the quizzes available to pass in, which are not passed yet, created by other people, and marked as public by their owner.

On selecting a quiz to pass, its name and description will appear along with a button to start.
When started, the quiz cannot be interrupted and ends by user choice, by time expire or by leaving the page.
The results are displayed at the end and added to the history.



## Techniques used

- [React](https://reactjs.org/) for building the user interface.
- [Material-ui](https://material-ui.com/) for better UI/UX design and quicker development.
- [Firebase](https://firebase.google.com/) for the backend, user management, cloud data storage, and hosting.
- [Jest](https://jestjs.io/) for making snapshots and unit tests.
- [Cypress](https://www.cypress.io/) for the UI/UX tests



## Data entities

```js
User: {
    id: String,
    email: String,
    password: String,
    displayName: String,
    photoURL: String,
}
```

```js
Quiz: {
    id: String,
    title: String,
    description: String,
    duration: Number,
    isPublic: Boolean,
    authorImg: String,
    createdAt: Date,
    createdBy: String,
    questions: [{
        question: String, 
        answers:[{
            text: String,
            correct: Boolean
       	},]
    },],
    completedBy: [{
        uid: String,
        email: String,
        photo: String,
        result: {
            correct: Number,
            total: Number,
            timeLeft: Number,
            passedAt: Date
        }
    },],
}
```

```js
History: {
    uid: String,
    title: String,
    description: String,
    duration: Number,
    passedAt: Date,
    quiz: String,
    score: String,
    total: Number,
    correct: Number,
}
```



## Routes

#### Public

```js
<Route exact path='/' component={HomePage} />
<Route exact path='/login' component={LoginPage} />
<Route exact path='/register' component={Register} />
```

#### Private *(User Area)*

```js
<ProtectedRoute exact path='/dashboard' component={Dashboard} />
<ProtectedRoute exact path='/quiz/edit' component={QuizCreate} />
<ProtectedRoute exact path='/quiz/edit/questions' component={QuizQuestions} />
<ProtectedRoute exact path='/quiz/progress/:id' component={QuizProgress} />
```



## Additional set up required

Before running the project, you have to add a `.env` file where to put the firebase connection settings:

```js
REACT_APP_FB_API_KEY=AIzaSyBWeYLY44FV-wIcxpsu51HzfDQRhDAVlNc
REACT_APP_FB_AUTH_DOMAIN=quizoom-a1d35.firebaseapp.com
REACT_APP_FB_DB_URL=https://quizoom-a1d35.firebaseio.com
REACT_APP_FB_PROJECT_ID=quizoom-a1d35
REACT_APP_FB_STORAGE_BUCKET=quizoom-a1d35.appspot.com
REACT_APP_FB_MESSAGING_SENDER_ID=859728211120
REACT_APP_FB_APP_ID=1:859728311120:web:a6fcb976298cbaa3be9f75
```



Well, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Enjoy With Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:e2e`

Launches the UI tests based on cypress. For more details see [cypress.io](https://www.cypress.io/) documentation.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
