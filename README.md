# daily-attendance-ts

ts version for daily attendance

## project

Automatic sign-in daily for multi platforms

### exec

#### cmd

test:
node ./app.js

prod:
NODE_ENV=prod node ./app.js

#### cron

node ./src/jobs/sch.js

prod:
NODE_ENV=prod node ./src/jobs/sch.js

## remark

1. \*Ck exists in the project root directory which has cookie string

2. smtpPassword exists in the project root directory which has password of email

3. [go version for daily attendance](https://github.com/Jehadsama/daily-attendance)
