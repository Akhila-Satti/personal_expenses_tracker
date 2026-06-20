import axios from "axios";
function AddExpense(props) {
  function NewExpense(e) {
    e.preventDefault();
    const f = e.target;
    const resnum = props.budgetnames.filter((i) => i.id == f.budgetname.value);
    const d = {
      id: Date.now(),
      bid: resnum[0].id,
      name: f.ExpenseName.value,
      amount: Number(f.amount.value),
      date: f.date.value,
      budgetname: resnum[0].bn,
    };
    axios
      .post('http://localhost:5000/api/expenses/', d)
      .catch((err) => {
        console.log(err)});

    f.reset();

    alert("added succesfully!");
    
   
  }

  return (
    <form onSubmit={NewExpense} id="addingexpense">
      <table>
        <thead>
          <tr>
            <th>
              <label htmlFor="ExpenseName">Expense Name</label>
            </th>
            <th>
              <label htmlFor="amount">Amount</label>
            </th>
            <th>
              <label htmlFor="date">Date</label>
            </th>
            <th>
              <label htmlFor="budgetname">BudgetName</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                id="ExpenseName"
                name="ExpenseName"
                required
              ></input>
            </td>
            <td>
              <input type="number" id="amount" name="amount" required></input>
            </td>
            <td>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              ></input>
            </td>
            <td>
              <select id="budgetname" name="budgetname" required>
                <option value="">select a budget</option>
                {props.budgetnames.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.bn}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="expensesbtn" type="submit">
                Add the expense
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
export default AddExpense;
