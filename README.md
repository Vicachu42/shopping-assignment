# shopping-assignment

Update so far:
-
- Product requirements fulfilled
- These endpoints work:
	- Get all the products
	- Put all the products into a cart
	- Delete products from cart
	- Getting the cart with products in it
- A product can't be put into the cart twice
- Error message if you try to put the same product in the cart twice
- Error message if you try to delete a product from the cart that doesn't exist
- When adding a product, you get info about the specific product.
- Updated route parameters so you can get, post and a product by typing the number instead of for example "?id=1"
- Added response codes to the products
- Split into two modules. While you can get the products and the carts, you can't post or delete anything yet.

This is missing:
-

Done for a passing grade:
-
- Contains a package.json with all the dependencies
- Every functionality working
- Being able to use GET, POST, etc at the right time (or argue for your choice)
- Well thought out names for variables and functions
- Well thought out names for endpoints

Missing for a passing grade:
-

If I have time/energy:
-
- Code review
- Add a message to the adding or deleting of products