import axios from "axios";
function EditExpenses(props) {
  
  function ChangeExpense(e) {
    e.preventDefault();
    const f = e.target;
    let resnum = props.budgetnames.filter((i) => i.id == f.budgetname.value);

    const newd = {
      id: props.id,
      bid: resnum[0].id,
      name: f.expensename.value,
      amount: Number(f.amt.value),
      date: f.date.value,
      budgetname: resnum[0].bn,
    };
    
    axios.put(`http://localhost:5000/api/expenses/${newd.id}`,{newd:newd,oldbid:props.bid,expenseamount:props.expenseamount})
      
    .catch(err=>console.log(err))
   

   
   
  }
  return (
    <>
      <tr>
        <td colSpan="4">
          <form onSubmit={ChangeExpense}>
            <input
              type="text"
              placeholder="Enter expense name"
              name="expensename"
            ></input>

            <input
              type="Number"
              placeholder="enter expense amount"
              name="amt"
            ></input>

            <input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            ></input>

            <select name="budgetname">
              <option value="">select the value</option>
              {props.budgetnames.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.bn}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
          </form>
        </td>
      </tr>
    </>
  );
}
export default EditExpenses;
