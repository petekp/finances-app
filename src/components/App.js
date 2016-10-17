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
    expensesData = database.ref('/data/expenses')

    this.connectToFirebase()

    expensesData.on('value', snapshot => {

      if(!snapshot.val()) {
        return
      }

      const expenses = []

      Object.keys(snapshot.val()).forEach(key => {
        const expense = snapshot.val()[key]
        expense.id = key
        expenses.push(expense)
      })

      this.setState({expenses: expenses})
    })

    expensesData.on('child_added', snapshot => {
      if(!snapshot) {
        return
      }
      console.log(`${snapshot.key} was added.`)
    })

    expensesData.on('child_removed', snapshot => {
      if(snapshot == null) {
        return
      }
      console.log(`${snapshot.key} was removed.`)
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

    const formInputValues = {...this.state.formState}

    if (!formInputValues.title)
      formInputValues.title = formInputValues.category
    if (!formInputValues.type)
      formInputValues.type = "Unspecified"
    if (!formInputValues.amount) {
      alert('amount needed')
      return false
    }
    this.pushExpense(formInputValues)
  }

  pushExpense(formInputValues) {
    expensesData
      .child(expensesData.push().key)
      .set(formInputValues)

    this.clearForm()
  }

  handleItemClick({id}) {
    this.removeExpense(id)
  }

  removeExpense(id) {
    const expenseRef = expensesData.child(id)

    expenseRef.remove((error) => {
      if(error)
        console.log(error)
    })
  }

  renderExpenseListItems = (expenses) => (
    Object.keys(expenses).map(obj => {
      const data = expenses[obj]
      return (
        <ExpenseListItem {...data}
                         key={data.id}
                         handleItemClick={this.handleItemClick.bind(this, data)} />
      )
    })
  )

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
          {this.renderExpenseListItems(expenses)}
        </ExpenseList>
      </div>
    )
  }
}

export default App
