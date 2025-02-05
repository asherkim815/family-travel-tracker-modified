# Family Travel Tracker Modified

Modified Version Screenshot #1
![family travel tracker modified version screenshot #1](family-travel-tracker-modified1.jpg)

Modified Version Screenshot #2
![family travel tracker modified version screenshot #2](family-travel-tracker-modified2.jpg)

Modified Version Screenshot #3
![family travel tracker modified version screenshot #3](family-travel-tracker-modified3.jpg)

Original Version Screenshot
![family travel tracker original version screenshot](family-travel-tracker-original1.jpg)

## How to Use

1. Download and install Postgres
2. Configure the following, either in index.js or via a dotenv file: user, host, database, password, and port (usually 5432 for Postgres)
3. Run queries.sql queries in Postgres
4. Start the server and send a get request

## About the App

This project came from a Udemy course by Angela Yu, The Complete 2024 Web Development Bootcamp.
I modified it the following way:

1. Add new features

- Remove user button
- Remove country button
- Add datalist of all countries, searchable and clickable
- Make certain texts take current user's color (e.g. if you click on Venat, all texts except users' names will turn deep sky blue)
- Disable deleting last user to prevent ejs crash

2. Rework UI
3. Minimize codes (most notably css)
