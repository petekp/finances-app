import React, { Component } from 'react'
import Firebase from 'firebase'
import styles from './style.css'
import {firebaseConfig} from './firebase'
import {AddExpenseForm} from './AddExpenseForm'
import {ExpenseList} from './ExpenseList'

// eslint-disable-next-line
const app = Firebase.initializeApp(firebaseConfig)
const database = Firebase.database()

const expensesData = database.ref('data/expenses').orderByKey()

const initialFormState = {
  title: '',
  date: '',
  amount: '',
  category: '',
  type: ''
}

const initialExpensesState = []

class App extends Component {
  constructor() {
    super()

    this.state = {
      formState: initialFormState,
      expenses: initialExpensesState
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.pushExpense = this.pushExpense.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  componentDidMount() {
    this.connectToFirebase()

    expensesData.on('value', snapshot => {
      const expenses = []

      Object.keys(snapshot.val()).forEach(key => {
        expenses.push(snapshot.val()[key])
      })
      this.setState({expenses: expenses})
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
    const newFormState = {...this.state.formState}
    newFormState[e.target.name] = e.target.value
    this.setState({formState: newFormState})
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const data = {...this.state.formState}

    if (!data.title)
      data.title = data.category
    if (!data.type)
      data.type = "Unspecified"
    if (!data.amount) {
      alert('amount needed')
      return false
    }
    this.pushExpense(data)
  }

  pushExpense(data) {
    database.ref('data/expenses').push(data)
    this.clearForm()
  }

  clearForm() {
    this.setState({formState: initialFormState})
  }

  render() {
    var expenses = this.state.expenses

    return (
      <div className="App" style={styles}>
        <AddExpenseForm {...this.state.formState}
                        handleChange={this.handleChange}
                        handleFormSubmit={this.handleFormSubmit} />
        <ExpenseList {...expenses} />
      </div>
    )
  }
}

export default App
