import React, { Component } from 'react'
import Firebase from 'firebase'
import styles from './style.css'
import {categories} from './config'
import {firebaseConfig} from './firebase'
import {NewExpenseForm} from './NewExpenseForm'
import {ExpenseList} from './ExpenseList'

// eslint-disable-next-line
const app = Firebase.initializeApp(firebaseConfig)
const database = Firebase.database()
const expensesData = database.ref('data/expenses').orderByKey()

class App extends Component {
  constructor() {
    super()

    this.state = {
      formState: {
        title: '',
        date: '',
        amount: '',
        category: '',
        type: ''
      },
      expenses: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.pushExpense = this.pushExpense.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  componentDidMount() {
    this.connectToFirebase()

    expensesData.on('value', snapshot => {
      var newExpenses = []
      Object.keys(snapshot.val()).forEach(key => {
        newExpenses.push(snapshot.val()[key])
      })
      this.setState({expenses: newExpenses})
    })

  }

  connectToFirebase() {
    Firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
      // eslint-disable-next-line
      var errorCode = error.code
      // eslint-disable-next-line
      var errorMessage = error.message
    })
  }

  handleChange(e) {
    var oldState = this.state.formState

    var newFormState = {
        title: oldState.title,
        date: oldState.date,
        amount: oldState.amount,
        category: oldState.category,
        type: oldState.type
    }

    newFormState[e.target.name] = e.target.value
    this.setState({formState: newFormState})
  }

  handleFormSubmit(e) {
    e.preventDefault()

    var data = this.state.formState
    if (!data.title) {
      data.title = data.category
    }

    this.pushExpense(data)
  }

  pushExpense(data) {
    database.ref('data/expenses').push(data)
    this.clearForm()
  }

  clearForm() {
    var emptyFormState = {
        title: '',
        date: '',
        amount: '',
        category: '',
        type: ''
    }
    this.setState({formState: emptyFormState})
  }

  render() {
    var expenses = this.state.expenses

    return (
      <div className="App" style={styles}>
        <NewExpenseForm {...this.state}
                        handleChange={this.handleChange}
                        handleFormSubmit={this.handleFormSubmit} />
        <ExpenseList {...expenses} />
      </div>
    )
  }
}

export default App
