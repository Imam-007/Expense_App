const myForm=document.getElementById('addForm')
const expList=document.getElementById('expense-list')
myForm.addEventListener('submit', addExpense)

document.addEventListener('DOMContentLoaded', domLoad)

function domLoad(){
    axios.get('/expense/get-expenses')
        .then(response => {
            const data = response.data
            const expenses = data.expenses

            //clear existing list
            expList.innerHTML = ''

            expenses.forEach(expense => {
                let newExpense=document.createElement('li')
                newExpense.className="list-group-item"
                newExpense.innerHTML=`${expense.title}::${expense.amount}::${expense.category}`
                let delBtn=document.createElement('button')
                delBtn.innerText="Delete"
                delBtn.className="btn btn-danger btn-sm float-right delete"
                delBtn.id = new Date().getTime()
                delBtn.addEventListener('click',removeExpense)

                function removeExpense(event){
                    const expId = expense.id

                    axios.delete(`/expense/delete-expense/${expId}`)
                        .then(result => {
                            domLoad()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

                let edBtn=document.createElement('button')
                edBtn.innerText="Edit"
                edBtn.className="btn btn-success btn-sm float-right"
                edBtn.addEventListener('click',editExpense)

                function editExpense(event){
                    const expId = expense.id

                    document.getElementById('expense').value = expense.amount
                    document.getElementById('desc').value = expense.title
                    
                    axios.get(`/expense/edit-expenses/${expId}`)
                        .then(response => {
                          expList.removeChild(newExpense) 
                        })
                        .catch(err => {
                            console.log(err)
                        })
            }

            newExpense.appendChild(delBtn)
            newExpense.appendChild(edBtn)
            expList.appendChild(newExpense)
            myForm.reset()
        })
    })
    .catch(err => {
        console.log(err)
    })
}

function addExpense(e){
    e.preventDefault()

    const data ={
        expenseAmount: document.getElementById('expense').value,
        expenseTitle: document.getElementById('desc').value,
        expenseCategory: document.getElementById('category').value
    }

    axios.post('/expense/add-expense', data)
        .then(response => {
            console.log(response)
            domLoad();
        })
        .catch(err => {
            console.log(err)
        })   
    
}