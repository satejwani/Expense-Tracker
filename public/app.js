// document.addEventListener('DOMContentLoaded', function() {
//   // DOM Elements
//   const expenseForm = document.getElementById('expense-form');
//   const expenseList = document.getElementById('expense-list');
//   const totalAmount = document.getElementById('total-amount');
//   const filterCategory = document.getElementById('filter-category');
//   const modal = document.getElementById('edit-modal');
//   const closeModal = document.querySelector('.close');
//   const editForm = document.getElementById('edit-form');

//   // Set default date to today
//   document.getElementById('date').valueAsDate = new Date();

//   // Fetch all expenses
//   fetchExpenses();

//   // Event Listeners
//   expenseForm.addEventListener('submit', addExpense);
//   filterCategory.addEventListener('change', fetchExpenses);
//   closeModal.addEventListener('click', () => modal.style.display = 'none');
//   window.addEventListener('click', (e) => {
//     if (e.target === modal) modal.style.display = 'none';
//   });
//   editForm.addEventListener('submit', updateExpense);

//   // Fetch expenses from API
//   function fetchExpenses() {
//     const category = filterCategory.value;
//     let url = '/api/expenses';
    
//     fetch(url)
//       .then(response => response.json())
//       .then(expenses => {
//         // Filter expenses by category if selected
//         if (category) {
//           expenses = expenses.filter(expense => expense.category === category);
//         }
        
//         displayExpenses(expenses);
//         calculateTotal(expenses);
//       })
//       .catch(error => console.error('Error fetching expenses:', error));
//   }

//   // Display expenses in the list
//   function displayExpenses(expenses) {
//     expenseList.innerHTML = '';
    
//     if (expenses.length === 0) {
//       expenseList.innerHTML = '<li class="expense-item">No expenses found</li>';
//       return;
//     }
    
//     expenses.forEach(expense => {
//       const date = new Date(expense.date).toLocaleDateString();
      
//       const li = document.createElement('li');
//       li.className = 'expense-item';
//       li.innerHTML = `
//         <div class="expense-info">
//           <div class="expense-title">${expense.title}
//             <span class="category-badge category-${expense.category}">${expense.category}</span>
//           </div>
//           <div class="expense-details">${date}</div>
//         </div>
//         <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
//         <div class="expense-actions">
//           <button class="btn-edit" data-id="${expense._id}">Edit</button>
//           <button class="btn-delete" data-id="${expense._id}">Delete</button>
//         </div>
//       `;
      
//       expenseList.appendChild(li);
//     });
    
//     // Add event listeners to edit and delete buttons
//     document.querySelectorAll('.btn-delete').forEach(button => {
//       button.addEventListener('click', deleteExpense);
//     });
    
//     document.querySelectorAll('.btn-edit').forEach(button => {
//       button.addEventListener('click', openEditModal);
//     });
//   }

//   // Calculate and display total amount
//   function calculateTotal(expenses) {
//     const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//     totalAmount.textContent = `$${total.toFixed(2)}`;
//   }

//   // Add a new expense
//   function addExpense(e) {
//     e.preventDefault();
    
//     const expense = {
//       title: document.getElementById('title').value,
//       amount: parseFloat(document.getElementById('amount').value),
//       date: document.getElementById('date').value,
//       category: document.getElementById('category').value
//     };
    
//     fetch('/api/expenses', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(expense)
//     })
//       .then(response => response.json())
//       .then(data => {
//         expenseForm.reset();
//         document.getElementById('date').valueAsDate = new Date();
//         fetchExpenses();
//       })
//       .catch(error => console.error('Error adding expense:', error));
//   }

//   // Delete an expense
//   function deleteExpense() {
//     const id = this.getAttribute('data-id');
    
//     fetch(`/api/expenses/${id}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.json())
//       .then(data => fetchExpenses())
//       .catch(error => console.error('Error deleting expense:', error));
//   }

//   // Open edit modal and populate form
//   function openEditModal() {
//     const id = this.getAttribute('data-id');
    
//     fetch(`/api/expenses/${id}`)
//       .then(response => response.json())
//       .then(expense => {
//         document.getElementById('edit-id').value = expense._id;
//         document.getElementById('edit-title').value = expense.title;
//         document.getElementById('edit-amount').value = expense.amount;
//         document.getElementById('edit-date').value = new Date(expense.date).toISOString().split('T')[0];
//         document.getElementById('edit-category').value = expense.category;
        
//         modal.style.display = 'block';
//       })
//       .catch(error => console.error('Error fetching expense details:', error));
//   }

//   // Update an expense
//   function updateExpense(e) {
//     e.preventDefault();
    
//     const id = document.getElementById('edit-id').value;
//     const expense = {
//       title: document.getElementById('edit-title').value,
//       amount: parseFloat(document.getElementById('edit-amount').value),
//       date: document.getElementById('edit-date').value,
//       category: document.getElementById('edit-category').value
//     };
    
//     fetch(`/api/expenses/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(expense)
//     })
//       .then(response => response.json())
//       .then(data => {
//         modal.style.display = 'none';
//         fetchExpenses();
//       })
//       .catch(error => console.error('Error updating expense:', error));
//   }
// });





document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const totalAmount = document.getElementById('total-amount');
  const filterCategory = document.getElementById('filter-category');
  const modal = document.getElementById('edit-modal');
  const closeModal = document.querySelector('.close');
  const editForm = document.getElementById('edit-form');

  // Set default date to today
  document.getElementById('date').valueAsDate = new Date();

  // Fetch all expenses
  fetchExpenses();

  // Event Listeners
  expenseForm.addEventListener('submit', addExpense);
  filterCategory.addEventListener('change', fetchExpenses);
  closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
  editForm.addEventListener('submit', updateExpense);

  // Fetch expenses from API
  function fetchExpenses() {
    const category = filterCategory.value;
    let url = '/api/expenses';
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(expenses => {
        console.log('Fetched expenses:', expenses);
        // Filter expenses by category if selected
        if (category) {
          expenses = expenses.filter(expense => expense.category === category);
        }
        
        displayExpenses(expenses);
        calculateTotal(expenses);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        expenseList.innerHTML = '<li class="expense-item">Error loading expenses. Please try again later.</li>';
      });
  }

  // Display expenses in the list
  function displayExpenses(expenses) {
    expenseList.innerHTML = '';
    
    if (!Array.isArray(expenses) || expenses.length === 0) {
      expenseList.innerHTML = '<li class="expense-item">No expenses found</li>';
      return;
    }
    
    expenses.forEach(expense => {
      try {
        const date = new Date(expense.date).toLocaleDateString();
        
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
          <div class="expense-info">
            <div class="expense-title">${expense.title}
              <span class="category-badge category-${expense.category}">${expense.category}</span>
            </div>
            <div class="expense-details">${date}</div>
          </div>
          <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
          <div class="expense-actions">
            <button class="btn-edit" data-id="${expense._id}">Edit</button>
            <button class="btn-delete" data-id="${expense._id}">Delete</button>
          </div>
        `;
        
        expenseList.appendChild(li);
      } catch (err) {
        console.error('Error displaying expense:', err, expense);
      }
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', deleteExpense);
    });
    
    document.querySelectorAll('.btn-edit').forEach(button => {
      button.addEventListener('click', openEditModal);
    });
  }


  
  // Calculate and display total amount
  function calculateTotal(expenses) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Add a new expense
  function addExpense(e) {
    e.preventDefault();
    
    const expense = {
      title: document.getElementById('title').value,
      amount: parseFloat(document.getElementById('amount').value),
      date: document.getElementById('date').value,
      category: document.getElementById('category').value
    };
    
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
      .then(response => response.json())
      .then(data => {
        expenseForm.reset();
        document.getElementById('date').valueAsDate = new Date();
        fetchExpenses();
      })
      .catch(error => console.error('Error adding expense:', error));
  }

  // Delete an expense
  function deleteExpense() {
    const id = this.getAttribute('data-id');
    
    fetch(`/api/expenses/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => fetchExpenses())
      .catch(error => console.error('Error deleting expense:', error));
  }

  // Open edit modal and populate form
  function openEditModal() {
    const id = this.getAttribute('data-id');
    
    fetch(`/api/expenses/${id}`)
      .then(response => response.json())
      .then(expense => {
        document.getElementById('edit-id').value = expense._id;
        document.getElementById('edit-title').value = expense.title;
        document.getElementById('edit-amount').value = expense.amount;
        document.getElementById('edit-date').value = new Date(expense.date).toISOString().split('T')[0];
        document.getElementById('edit-category').value = expense.category;
        
        modal.style.display = 'block';
      })
      .catch(error => console.error('Error fetching expense details:', error));
  }

  // Update an expense
  function updateExpense(e) {
    e.preventDefault();
    
    const id = document.getElementById('edit-id').value;
    const expense = {
      title: document.getElementById('edit-title').value,
      amount: parseFloat(document.getElementById('edit-amount').value),
      date: document.getElementById('edit-date').value,
      category: document.getElementById('edit-category').value
    };
    
    fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    })
      .then(response => response.json())
      .then(data => {
        modal.style.display = 'none';
        fetchExpenses();
      })
      .catch(error => console.error('Error updating expense:', error));
  }
});