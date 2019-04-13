# GrampsWatch
The easiest way to monitor your nephew's GitHub progress. 

## How it works

 - First of all, you need to create an account.
 - WIP

## Instalation

1. Install [curl](https://curl.haxx.se), [node](https://nodejs.org/en/), [composer](https://getcomposer.org/), [php](http://php.net) 
2. Backend
  - `cd backend`
  - `cp .env.example .env`
  - Edit the .env file to match your database configuration
  - `composer install`
  - `php artisan jwt:secret`
  - `php artisan key:gen`
  - `php artisan migrate:fresh`
  - `php artisan serve`
  - This should open a webserver on localhost, port 8000
  - It is recommended that you chnge the php.ini `MAX_POST_SIZE` and `MAX_FILE_UPLOAD_SIZE` to allow large files to be uploaded.

3. Frontend
  - `cd frontend`
  - `npm install`
  - `npm start`
  - This should open a server on port 3000

## Used languages

- Laravel, for the backend
- React with a few packages like Redux and Router, for the frontend
- Semantic UI as the UI library

## Notes

-You may experience problems, due to the GitHub API requests cap, depending on how big the accounts you are checking are.
-Five points are given for each public repository the account created, and one point is given for each push.
-You can manually run the cronjb by using `php artisan update:puncte` in the backend folder.


## Contribuitors

- **Hutu Tudor** - frontend
- **Baroncea Andrei** - backend
