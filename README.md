# GrampsWatch

The easiest way to monitor your nephew's GitHub progress.

## How it works

 - Firstly, create an account. You can do this by pressing the register button and then filling your name, email and password.
 - When you need to login, click login and fill your data.
 - When you are in the dashboard, you can add your nephews by clicking the add button.
 - You have to add their GitHub username in the GitHub field.
 - It may take up to 15 minutes to have all your nephew's repositories.
 - You will have a list of nephews on your left.
 - You can view the nephew's repositories in the center.
 - In the right, you can view details about the nephew, like name, GitHub username and points.
 - You can modify a nephew by clicking edit.
 - You can delete a nephew by clicking delete.
 - You may need to refresh once in a while, so click the refresh button.
 - You can logout using the logout button.
 - The points are calculated like this: 5 points per repository and 1 per commit.
 - If you have any questions, feel free to contact us on hututudor@yahoo.ro.

## Instalation

1. Install [curl](https://curl.haxx.se), [node](https://nodejs.org/en/), [composer](https://getcomposer.org/), [php](http://php.net)

2. You need to add this in your crontab "* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1"

3. Backend

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

4. Frontend

- `cd frontend`
- `npm install`
- `npm start`
- This should open a server on port 3000

## Used languages

- Laravel, for the backend
- React with a few packages like Redux and Router, for the frontend
- Semantic UI as the UI library

## Notes

- You may experience problems, due to the GitHub API requests cap, depending on how big the accounts you are checking are.
- Five points are given for each public repository the account created, and one point is given for each push.
- You can manually run the cronjb by using `php artisan update:puncte` in the backend folder.

## Contribuitors

- **Hutu Tudor** - frontend
- **Baroncea Andrei** - backend
