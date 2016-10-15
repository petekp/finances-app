import React, { Component } from 'react'
import Firebase from 'firebase'
import styles from './style.css'
import {firebaseConfig} from './firebase'
import {AddExpenseForm} from './AddExpenseForm'
import {ExpenseList} from './ExpenseList'
import {ExpenseListItem} from './ExpenseListItem'

// eslint-disable-next-line
var app,
    database,
    expensesData

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
    this.removeExpense = this.removeExpense.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line
    app = Firebase.initializeApp(firebaseConfig)
    database = Firebase.database()
    expensesData = database.ref('/')

    this.connectToFirebase()

    expensesData.on('value', snapshot => {
      const expenses = []

      Object.keys(snapshot.val()).forEach(key => {
        let newObj = snapshot.val()[key]
        newObj.id = key
        expenses.push(newObj)
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
    const newExpense = expensesData.push()
    newExpense.set(data)
    this.clearForm()
  }

  handleItemClick({id}) {
    this.removeExpense('expenses', id)
  }

  removeExpense(type, id) {
    const expenseRef = database.ref(`/${id}`)
    expenseRef.remove((error) => {
      console.log(error)
      console.log(`data/${type}/${id} removed successfully.`)
    })
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

        <ExpenseList>
          {Object.keys(expenses).map(obj => {
            const data = expenses[obj]
            return (<ExpenseListItem {...data}
                                     handleItemClick={this.handleItemClick.bind(this, data)}
                                     key={data.id} />)
          })}
        </ExpenseList>
      </div>
    )
  }
}

export default App
