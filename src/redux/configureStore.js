import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

export default function configureStore(initialState) {

	var	firebaseConfig = {
	    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
	}

	const rfConfig = {} // optional redux-firestore Config Options

	// Initialize firebase instance
	firebase.initializeApp(firebaseConfig)
	// Initialize Cloud Firestore through Firebase
	firebase.firestore();


	const middleware = []

	if (process.env.NODE_ENV !== 'production') {
		middleware.push(require('redux-immutable-state-invariant').default())
	}

	// Add reduxFirestore store enhancer to store creator
	const createStoreWithFirebase = compose(
	  reduxFirestore(firebase, rfConfig), // firebase instance as first argument, rfConfig as optional second
	  applyMiddleware(...middleware)
	)(createStore)

	// Add Firebase to reducers
	const rootReducer = combineReducers({
	  firestore: firestoreReducer
	})

	// Create store with reducers and initial state
	const store = createStoreWithFirebase(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

	return store;

}
