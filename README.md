## Instructions for running the project

- Change directoary into this folder
- Run 
    ```bash
    npm install
    ```
- To start the server, run
    ```bash
    node index.js
    ```

-----------
- The API will on default run on port 3000, and can be access on port 3000
- The APIs implemented are under these addresses:
    * http://localhost:3000/point **GET request**  API for checking the points for all players
    * http://localhost:3000/spend **POST request**  API for spending the points
    * http://localhost:3000/transaction **POST request**  API for posting transactions on points

- However, you can specify the port by using environment variables as well, e.g:
    ```bash
    env PORT=8080 node index.js
    ```
-----------

## For development and testing
To test the API, you can manually feed data into it. However, I have also provided a script. You can run the script like this:
    ```
    ./http-automation.sh 3000
    ```
Where you substitute 3000 by the port number you speicify