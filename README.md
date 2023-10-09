# daily-attendance-ts

ts version for daily attendance

## project

Automatic sign-in daily for multi platforms

### exec

#### cmd

test:
go run cmd/main.go

prod:
DAILY_ENV=prod go run cmd/main.go

#### cron

test:
go run cmd/main.go cron

prod:
DAILY_ENV=prod go run cmd/main.go cron

## remark

1. \*Ck exists in the project root directory which has cookie string

2. smtpPassword exists in the project root directory which has password of email

3. [go version for daily attendance](https://github.com/Jehadsama/daily-attendance)

## todo

- [x] mail
- [ ] error handle
- [x] cron
