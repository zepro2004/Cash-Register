let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
let denominations = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];
const cash = parseFloat(document.getElementById("cid").value);
const changeDue = document.getElementById("change-due");

const calculateChange = () => {
  let change = cash - price;
  let totalCID = cid.reduce((sum, curr) => sum + curr[1], 0);
  totalCID = Math.round(totalCID * 100) / 100;
  if (change < 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  if (change === totalCID) {
    changeDue.innerText = "Status: CLOSED";
    return;
  }
  denominations.forEach((key, value) => {
    let available = cid.find((c) => c[0] === key)[1];
    let amount = 0;
    while (change >= value && available > 0) {
      change -= value;
      change = Math.round(change * 100) / 100;
      available -= value;
      amount += value;
    }
    if (amount > 0) denominations.push([key, amount]);
  });
  if (change > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else {
    changeDue.innerText = `Status: OPEN\n${JSON.stringify(changeArr)}`;
  }
};

// purchaseBtn.addEventListener("click", () => {
//   alert("Purchase successful!");
//   addDrawerAmount();
// });

// const updateCid = (change) => {
//   cid.forEach((drawer) => {
//     if (drawer[0] === change[0]) {
//       drawer[1] -= change[1];
//     }
//   });
// };

// drawerAmount.onload = addDrawerAmount();

// const addDrawerAmount = () => {
//   drawerAmount.innerHTML += `
//     <h2>Change in drawer: </h2>
//     <p>Pennies: ${cid[PENNY].value}</p>
//     <p>Nickels: ${cid[NICKEL].value}</p>
//     <p>Dimes: ${cid[DIME].value}</p>
//     <p>Quarters: ${cid[QUARTER].value}</p>
//     <p>Ones: ${cid[ONE].value}</p>
//     <p>Fives: ${cid[FIVE].value}</p>
//     <p>Tens: ${cid[TEN].value}</p>
//     <p>Twenties: ${cid[TWENTY].value}</p>
//     <p>Hundreds: ${cid[HUNDRED].value}</p>
//   `;
// };
