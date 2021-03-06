# Phonebook
A simple phone book application built using NodeJS without any framework, Pug template engine for boiler plate, MySQL for database and Docker.
<br>
<table>
    <tr>
        <th>Node JS (no framework)</th>
        <th>Pug</th>
        <th>MySQL</th>
        <th>Docker</th>
    </tr>
</table>
<hr>

Goals: 
- Add a name and associate it with either one number or more than one. 
- Show a list of names. 
- Show a name with numbers associated with it.

## Steps to run
- Copy `.env_sample` to `.env` and change configuration values.
- Run `docker-compose up` from root directory to start the server.
- Visit `localhost:8080` from browser to launch the application.
- Press `ctrl+c` to exit docker and run `docker-compose down` to stop the application.
- Alternatively, run `docker-compose down -v` to also delete the volumes.