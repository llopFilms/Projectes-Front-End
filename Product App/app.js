class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card mb-4">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="product">
            <b>Product:</b> ${product.name}
            <b>Price:</b> ${product.price}
            <b>Year:</b> ${product.year}
          </div>
          <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
      </div>
    `;
    productList.appendChild(element);
  }

  deleteProduct(element) {
    if (element.name == "delete") {
      element.parentElement.parentElement.parentElement.remove();
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2 mb-2`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");
    container.insertBefore(div, app);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }
}

//DOM events
document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    event.preventDefault();
    const product = new Product(name, price, year);
    const ui = new UI();
    if (name === "" || price === "" || year === "") {
      return ui.showMessage("Complete fileds, please", "warning");
    }
      ui.addProduct(product);
      ui.resetForm();
      ui.showMessage("Product added successfully", "success");      
  });

document
  .getElementById("product-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteProduct(event.target);
    ui.showMessage("Product deleted successfully", "danger");
  });
