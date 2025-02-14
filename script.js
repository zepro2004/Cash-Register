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
const cash = document.getElementById("cash");
const totalPrice = document.getElementById("price-screen");
const denominationValue = document.getElementById("cash-drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const displayChange = document.getElementById("change-due");
const denominationsName = {
  PENNY: "Pennies",
  NICKEL: "Nickels",
  DIME: "Dimes",
  QUARTER: "Quarters",
  ONE: "Ones",
  FIVE: "Fives",
  TEN: "Tens",
  TWENTY: "Twenties",
  "ONE HUNDRED": "Hundreds",
};

const runProgram = () => {
  if (!cash.value) {
    return;
  }
  if (Number(cash.value) < 0) {
    alert("Cash amount cannot be negative");
    cash.value = "";
    return;
  }
  calculateChange();
};

purchaseBtn.addEventListener("click", runProgram);

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runProgram();
  }
});


const changePrint = (status, change) => {
  displayChange.innerHTML = `<p>Status: ${status}</p>`;
  displayChange.innerHTML += change
    .map(([name, amount]) => `<p>${name}: $${amount}</p>`)
    .join("");
};

const calculateChange = () => {
  const roundedCash = Math.round(Number(cash.value) * 100);
  const roundedPrice = Math.round(price * 100);
  let changeDue = roundedCash - roundedPrice;

  if (roundedCash < roundedPrice) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }

  if (roundedCash === roundedPrice) {
    displayChange.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cash.value = "";
    return;
  }

  const cidReverse = [...cid]
    .reverse()
    .map(([name, amount]) => [name, Math.round(amount * 100)]);
  const cidTotal = cidReverse.reduce(
    (sum, denomination) => sum + denomination[1],
    0
  );
  const result = {
    status: "OPEN",
    change: []
  };

  if (cidTotal < changeDue) {
    displayChange.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    cash.value = "";
    return;
  }

  if (cidTotal === changeDue) {
    result.status = "CLOSED";
  }

  const denominationValues = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

  for (let i = 0; i <= cidReverse.length; i++) {
    if (changeDue >= denominationValues[i] && changeDue > 0) {
      const [name, amount] = cidReverse[i];
      const amountRemoved = Math.min(amount, changeDue);
      const count = Math.floor(amountRemoved / denominationValues[i]);
      const amountForEach = denominationValues[i] * count;
      changeDue -= amountForEach;

      if (count > 0) {
        result.change.push([name, amountForEach / 100]);
      }
    }
  }

  if (changeDue > 0) {
    displayChange.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  changePrint(result.status, result.change);
  update(result.change);
};

const update = (change) => {
  
  console.log("update() function is running");
  console.log("Current cid state:", cid); // Check if `cid` has expected values

  if (change) {
    change.forEach(([name, amount]) => {
      const arr = cid.find(([changeName]) => changeName === name);
      arr[1] = (Math.round(arr[1] * 100) - Math.round(amount * 100)) / 100;
    });
  }

  totalPrice.textContent = `Total: $${price}`;
  cash.value = "";
  denominationValue.innerHTML = `<p><strong>Change in drawer: </strong></p>
  ${cid
    .map(([name, amount]) => `<p>${denominationsName[name]}: $${amount}</p>`)
    .join("")}`;
};

update();
