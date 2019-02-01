
A react-based web application for a this backend (A delivery service).

## Usage

* First install the needed packages:

    ```bash
        npm install
    ```

* Development: Just use the below code, and it will open the app in your browser at the address of `http://localhost:4000/` and will watch your changes.

    ```bash
        npm run dev
    ```

* Production: The below code will build two files of `bundles.js` and `style.css` in the `dist` directory.

    ```bash
        npm run build
    ```

    * If you want to test the product, You can use the `test-server.js` which is in the root of the project, and it will open the app at `http://localhost:8000/`:
        
        ```bash
            node test-server.js
        ```

* To do
  * Why not using websocket instead? It is easier and more suitable for this purpose.
  * Do not send the raw password to the backend!!! (Use stronger methods, For example using `nonce` and `iv` to create and send a login token instead of raw passwords) 
  * Improve the responsive display of the tables :(
  * Add filter by name of bikers, pickup time, delivery time
  * etc