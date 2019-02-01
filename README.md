
A react-based web application for [this backend](https://github.com/Ashkanph/deliveryServiceBackend) (A delivery service).

## Usage

* First install the needed packages:

    ```bash
        npm install
    ```

* Development: Just use the below code, and it will open the app in your browser at the address of `http://localhost:4000/` and will watch your changes.

    ```bash
        npm run dev
    ```

    * Please notice that `dist/setting.js` contains some important configurations (the backend address, etc)
    * There are one `manager` and ten `biker` in the backend mockup data. You can use these usernames and passwords to login:

        ```javascript
        username: manager
        password: managerpw

        username: biker1
        password: biker1pw

        username: biker2
        password: biker2pw

        username: biker3
        password: biker3pw

        etc...
        ```

* Production: The below code will build two files of `bundles.js` and `style.css` in the `dist` directory.

    ```bash
        npm run build
    ```

    * If you want to test the product, You can use the `test-server.js` which is in the root of the project, and it will open the app at `http://localhost:8000/`:
        
        ```bash
            node test-server.js
        ```

## To do
  * Why not using websocket instead? It is easier and more suitable for this purpose.
    * Or at least use `long polling` to get the live data (Shamefully I have used setInterval to get the new data)
  * Do not send the raw password to the backend!!! (Use stronger methods, For example using `nonce` and `iv` to create and send a login token instead of raw passwords) 
  * Improve the UI/UX :( (especially for the small screens)
  * Add limit to the delivery datetime picker in the `Parcels` page (Delivery time must be after pickup time).
  * Add filter by name of bikers, pickup time, delivery time
  * etc