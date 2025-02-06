
let userLogIn = JSON.parse(localStorage.getItem('logInUser'));

function razorPay(e){ 
  if(userLogIn.length>0){
    let totalOfItems = document.getElementById('total-of-items');
    let valueTotal = (parseFloat(totalOfItems.innerHTML));
        var options = {
          key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
          amount: valueTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "USD",
          name: "MyShop Checkout",
          description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          theme: {
            color: "#000",
          },
          image:
            "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
        };
      
        var rzpy1 = new Razorpay(options);
        rzpy1.open();
        let items = JSON.parse(localStorage.getItem('added'));
        items.length = 0;
        localStorage.setItem('added',items);
        
        e.preventDefault();
      
  }
  else{
    alert("Log in first to make payment.");
  }
}



