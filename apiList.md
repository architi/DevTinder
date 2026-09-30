# DevTinder APIs

### authRouter
- POST/login
- POST /signin
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### connectionRequestRouter
:/ means dynamic (for these 2 under it)
- POST/request/send/:status/:toUserId
  - interested
  - ignored
- POST/request/recieve/:status/:requestId 
  - accepted
  - rejected

### userRouter
- GET /user/feed (this gets the other users id)
- GET /user/connections
- GET /user/requests

# status: ignored -> me SENDING left swipping/passing the userId +ent on the feed
        interested -> me SENDING right swipping/liking the userId +ent on the feed
        accepted -> my like has been accepted by the other userId
        rejected -> i have been rejected by the other userId

