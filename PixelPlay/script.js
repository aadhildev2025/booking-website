  const form = document.getElementById("bookingForm");
  const type = document.getElementById("type");
  const additional = document.getElementById("additional");
  const priceDisplay = document.getElementById("priceDisplay");
  const priceHidden = document.getElementById("priceHidden");

  function calculatePrice() {
    const typeVal = type.value;
    const extraHours = parseInt(additional.value) || 0;

    let basePrice = 0;
    if (typeVal === "Solo") basePrice = 500;
    if (typeVal === "Duo") basePrice = 800;

    const totalPrice = basePrice + (basePrice * extraHours);
    priceDisplay.textContent = `Total Price: Rs.${totalPrice}`;
    priceHidden.value = `Rs.${totalPrice}`;
    return totalPrice;
  }

  type.addEventListener("change", calculatePrice);
  additional.addEventListener("change", calculatePrice);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const slot = document.getElementById("slot").value;
    const typeVal = type.value;
    const extra = additional.value;
    const total = calculatePrice();

    const formData = new FormData(form);
    formData.append("Final Amount", `Rs.${total}`);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        const message = `🎮 *New Booking*%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ASlot: ${slot}%0AType: ${typeVal}%0AAdditional Hours: ${extra}%0ATotal Price: Rs.${total}`;
        const phoneNumber = "94714304378";
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

        form.reset();
        priceDisplay.textContent = "Total Price: ₹0";
      } else {
        alert("Error submitting form.");
      }
    }).catch(() => {
      alert("Something went wrong!");
    });
  });