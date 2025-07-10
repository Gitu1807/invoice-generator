let items = [];

function addItem() {
  const prodName = document.getElementById("prodName").value;
  const hsn = document.getElementById("hsn").value;
  const price = parseFloat(document.getElementById("price").value);
  const qty = parseFloat(document.getElementById("qty").value);

  const total = price * qty;
  items.push({ prodName, hsn, price, qty, total });

  let errorMsg = "";

  if (!prodName) errorMsg += "Please enter Product Name.\n";
  if (!hsn) errorMsg += "Please enter HSN Code.\n";
  if (!price) errorMsg += "Please enter Price.\n";
  if (price <= 0) errorMsg += "Please enter a valid Price greater than 0.\n";
  if (!qty) errorMsg += "Please enter Quantity.\n";
  if (qty <= 0) errorMsg += "Please enter a valid Quantity greater than 0.\n";

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  // Clear product input fields after adding
  document.getElementById("prodName").value = "";
  document.getElementById("hsn").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("total").value = "";

  updatePreview();
}

function calculateProductTotal() {
  const price = parseFloat(document.getElementById("price").value) || 0;
  const qty = parseFloat(document.getElementById("qty").value) || 0;
  const taxPercent = parseFloat(document.getElementById("tax").value) || 0;
  const discountPercent = parseFloat(document.getElementById("discount").value) || 0;

  let baseTotal = price * qty;
  const taxAmount = (baseTotal * taxPercent) / 100;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalProductTotal = baseTotal + taxAmount - discountAmount;

  document.getElementById("total").value = finalProductTotal.toFixed(2);
}

function updatePreview() {
  document.getElementById("prevInvoiceNum").innerText = document.getElementById("invoiceNumber").value || "";
  document.getElementById("prevInvoiceDate").innerText = document.getElementById("invoiceDate").value || "--";
  document.getElementById("prevDueDate").innerText = document.getElementById("dueDate").value || "--";

  document.getElementById("prevCompanyName").innerText = document.getElementById("companyName").value || "--";
  document.getElementById("prevCompanyAddress").innerText = document.getElementById("companyAddress").value || "--";
  // document.getElementById("prevCompanyPhone").innerText = document.getElementById("companyPhone").value || "--";
  document.getElementById("prevCompanyEmail").innerText = document.getElementById("companyEmail").value || "--";
  // document.getElementById("prevCompanyTax").innerText = document.getElementById("companyTax").value || "--";

  document.getElementById("prevCustomerName").innerText = document.getElementById("customerName").value || "--";
  document.getElementById("prevCustomerAddress").innerText = document.getElementById("customerAddress").value || "--";
  // document.getElementById("prevCustomerPhone").innerText = document.getElementById("customerPhone").value || "--";
  document.getElementById("prevCustomerEmail").innerText = document.getElementById("customerEmail").value || "--";
  // document.getElementById("prevCustomerTax").innerText = document.getElementById("customerTax").value || "--";

  const companyStateCode = document.getElementById("companyStateCode").value;
const customerStateCode = document.getElementById("customerStateCode").value;

document.getElementById("prevCompanyTax").innerText = companyStateCode+" " + (document.getElementById("companyTax").value || "--");
document.getElementById("prevCustomerTax").innerText = customerStateCode+" " + (document.getElementById("customerTax").value || "--");


 const companyPhoneCode = document.getElementById("companyPhoneCode").value;
const customerPhoneCode = document.getElementById("customerPhoneCode").value;
document.getElementById("prevCompanyPhone").innerText = "+"+companyPhoneCode+" "+(document.getElementById("companyPhone").value || "--");
document.getElementById("prevCustomerPhone").innerText = "+"+customerPhoneCode+" "+(document.getElementById("customerPhone").value || "--");
   
  
  const bankDetails = document.getElementById("bankDetails").value;
  const bankLines = bankDetails.split("\n").filter(line => line.trim() !== "");

  let formatted = "";

  if (bankLines.length > 0) {
    // All lines come below the label, joined with <br>
    formatted = "<br>" + bankLines.join("<br>");
  } else {
    formatted = "--";
  }

  document.getElementById("prevBank").innerHTML = formatted;

  document.getElementById("prevNotes").innerText = document.getElementById("noteDetails").value || "--";

  const table = document.getElementById("itemTable");
  table.innerHTML = `
    <tr>
      <th>Product</th>
      <th>HSN</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
    </tr>
  `;

  let subtotal = 0;
  items.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.prodName}</td>
        <td>${item.hsn}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.qty}</td>
        <td>${item.total.toFixed(2)}</td>
      </tr>
    `;
    subtotal += item.total;
  });

  const taxPercent = parseFloat(document.getElementById("tax").value) || 0;
  const discountPercent = parseFloat(document.getElementById("discount").value) || 0;

  const taxAmount = (subtotal * taxPercent) / 100;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal + taxAmount - discountAmount;

  // document.getElementById("prevTax").innerText = taxAmount.toFixed(2);
  document.getElementById("prevTax").innerText = document.getElementById("tax").value;
  document.getElementById("prevDiscount").innerText = document.getElementById("discount").value;
  // document.getElementById("prevDiscount").innerText = discountAmount.toFixed(2);
  document.getElementById("prevSubtotal").innerText = finalTotal.toFixed(2);
}

function printInvoice() {
  
    let errorMsg = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s\.\,\&\-\_]+$/;

  if (!document.getElementById("invoiceNumber").value.trim()) errorMsg += "Invoice Number is required.\n";
  if (!document.getElementById("invoiceDate").value.trim()) errorMsg += "Invoice Date is required.\n";
  if (!document.getElementById("dueDate").value.trim()) errorMsg += "Due Date is required.\n";

  if (!document.getElementById("companyName").value.match(nameRegex)) errorMsg += "Company Name is must be in text.\n";
  if (!document.getElementById("customerName").value.match(nameRegex)) errorMsg += "Customer Name is must be in text.\n";
  if (!document.getElementById("companyName").value.trim()) errorMsg += "Company Name is required.\n";
  if (!document.getElementById("customerName").value.trim()) errorMsg += "Customer Name is required.\n";
  if (!document.getElementById("companyAddress").value.trim()) errorMsg += "Company Address is required.\n";
  if (!document.getElementById("customerAddress").value.trim()) errorMsg += "Customer Address is required.\n";

  if (!document.getElementById("companyPhone").value.match(phoneRegex)) errorMsg += "Company Phone must be 10 digits.\n";
  if (!document.getElementById("customerPhone").value.match(phoneRegex)) errorMsg += "Customer Phone must be 10 digits.\n";

  if (!document.getElementById("companyEmail").value.match(emailRegex)) errorMsg += "Invalid Company Email.\n";
  if (!document.getElementById("customerEmail").value.match(emailRegex)) errorMsg += "Invalid Customer Email.\n";

  if (!document.getElementById("companyTax").value.trim()) errorMsg += "Company Tax Number is required.\n";
  if (!document.getElementById("customerTax").value.trim()) errorMsg += "Customer Tax Number is required.\n";
  if (!document.getElementById("bankDetails").value.trim()) errorMsg += "Bank Details are required.\n";

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

    const printContent = document.querySelector('.right-panel').innerHTML;

  // Save original page content
  const originalContent = document.body.innerHTML;

  // Replace body with right panel content
  document.body.innerHTML = printContent;

  window.print();

    document.body.innerHTML = originalContent;

  // Reload scripts (to reattach event listeners if needed)
  location.reload();
}

document.getElementById("logoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("logoPreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Update product total on price, qty, tax, or discount change
document.getElementById("price").addEventListener("input", calculateProductTotal);
document.getElementById("qty").addEventListener("input", calculateProductTotal);
document.getElementById("tax").addEventListener("input", calculateProductTotal);
document.getElementById("discount").addEventListener("input", calculateProductTotal);
