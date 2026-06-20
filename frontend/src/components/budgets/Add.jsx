import axios from 'axios';
function AddBudget(props) {
  
  function NewBudget(e) {
    e.preventDefault();

    const f = e.target;
    const d = {
      id:Date.now(),
      bn: f.budgetName.value,
      duration:
        (new Date(f.to.value) - new Date(f.from.value)) /
          (1000 * 60 * 60 * 24) +
        1,
      to: f.to.value,
      from: f.from.value,
      amount: Number(f.amount.value),
      spent:0,
      remaining:Number(f.amount.value),
    };
    
    axios.post('http://localhost:5000/api/budgets/',d).then(res=>{
      
        props.setBudgetNames(res.data);
      }).catch(err=>{
        console.log(err)
      })
    
    f.reset();
  }
  return (
    <>
      <form onSubmit={NewBudget} id="budgetsadding">
        <table>
          <thead>
            <tr>
              <th rowSpan="2">
                <label htmlFor="budgetName">BudgetName</label>
              </th>

              <th colSpan="2">
                Duration<hr></hr>
              </th>
              <th rowSpan="2">
                <label htmlFor="amount">Amount</label>
              </th>
            </tr>
            <tr>
              <th>
                <label htmlFor="from">From</label>
              </th>
              <th>
                <label htmlFor="to">To</label>
              </th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" id="budgetName" name="budgetName" required />
              </td>
              <td>
                <input type="date" id="from" name="from" required />
              </td>
              <td>
                <input type="date" id="to" name="to" required />
              </td>
              <td>
                <input type="number" id="amount" name="amount" required />
              </td>
              <td>
                
              </td>
              <td>
                <button className="budgetsbtn" type="submit">
                  add this budget
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
export default AddBudget;