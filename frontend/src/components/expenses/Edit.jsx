function EditExpenses(props) {
  console.log("edited");
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
    const newData = props.expensedata.map((d) => {
      if (d.id === props.id) {
        return newd;
      } else {
        return d;
      }
    });
    const updatedBudgets = props.budgetdata.map((b) => {
      if (newd.bid === props.bid) {
        if (b.id === newd.bid) {
          return {
            ...b,
            spent: (b.spent || 0) + newd.amount - props.expenseamount,
            remaining:
              (b.remaining || b.amount) - newd.amount + props.expenseamount,
          };
        }
      }
      if (newd.bid !== props.bid) {
        if (b.id === newd.bid) {
          return {
            ...b,
            spent: (b.spent || 0) + newd.amount,
            remaining: (b.remaining || b.amount) - newd.amount,
          };
        }
        if (b.id === props.bid) {
          return {
            ...b,
            spent: (b.spent || 0) - props.expenseamount,
            remaining: (b.remaining || b.amount) +props.expenseamount,
          };
        }
      }
      return b; // Return un-targeted elements as they were
    });

    props.setBudgetData(updatedBudgets);
    props.setExpenseData(newData);
    props.setEditExpense(null);
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
