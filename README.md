# Can of Books

**Author**: [Ben Mills](https://github.com/akkanben) and [Jordan Fleming](https://github.com/Jofleming)
**Version**: 1.0.2

## Overview

The Can of Books server repo can be used to pull book data from a MongoDB database. 

## Getting Started

- Setup an Atlas MongoDB account and retrieve your database url. Be sure to add your external IP address to the settings there.
- Set `DB_URL` to equal your address details with password as found on the Atlas site (see connect).
- Set the `PORT` env variable to equal 3001 or similar.
- Use `node seed.js` while the server is not running to seed the database with a few books.
- Start the serer with `npm start`.


## Architecture

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Cors

## Change Log

11-08-2021 4:59pm - Application now has a fully-functional express server, with a GET route for the books path and can store book models in the database.
11-09-2021 10:30pm - Application has working delete and post routes for adding and removing books from the database.

## Estimates

| # | Feature Name                            | Estimated Time |  Start   | Finish  | Actual |
| - | --------------------------------------- | -------------- | -------- | ------- | ------ |
| 1 | Set up Repos                            | 01:00          | 02:00PM  | 03:00PM | 01:00  |
| 2 | Storage                                 | 01:30          | 03:00PM  | 05:00PM | 02:00  |
| 3 | Book Component                          | 02:00          | 05:00PM  | 06:00PM | 01:00  |
| - | Book Component Cont                     | 00:00          | 08:30PM  | 10:30PM | 02:00  |
| 4 | Post Route                              | 01:00          | 04:30PM  | 06:30PM | 02:00  |
| 5 | Delete Route                            | 01:30          | 08:15PM  | 10:15PM | 02:00  |
| 6 |                                         | 00:00          | 00:00PM  | 00:00PM | 00:00  |

## Credit and Collaborations
Worked with Ben Mills to create and deploy this app.

## Logistical
What hours will you be available to communicate?
- Will be available to respond to slack/text from 9AM to 9PM.

What platform will you use to communicate (ie. Slack, phone …)?
- We will use Slack in order to communicate

How often will you take breaks?
- Follow the break process that we have been doing in class.

What is your plan if you start to fall behind?
- Stay up and put in extra hours to work. 


## Cooperative
Make a list of each person’s strengths.
- Jordan: Communication, CSS/Front-end
- Ben: Problem Solving, Analytical Thinking, Back-end programming.

How can you best utilize these strengths in the development of your application?
- Work together, lean on each other's strengths in the driver role.

In what areas do you each want to develop greater strength?
- Jordan: I want to develop better technical skills/back-end comfort.
- Ben: Better organization and planning.

Knowing that every person in your team needs to understand the code, how do you plan to approach the day-to-day development?
- We will be driving/navigating together through the process. Will be talking over every bit of code.


## Conflict Resolution
What will your team do if one person is pulling all the weight while the other person is not contributing?
- Talk about it if it doesn't feel even to touch base, try to make sure projects are evenly distributed, and last step bring in a mediator.

What will your team do if one person is taking over the project and not letting the other member contribute?
- Up front communication about any concerns/want to restribute work load to allow equal time on project.

How will you approach each other and the challenge of building an application knowing that it is impossible for two people to be at the exact same place in understanding and skill level?
- Do our best to bring other person up to speed. Treat each circumstance as an opportunity to learn or to mentor to cement own knowledge.
