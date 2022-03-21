# OSN-analysis-dashboard
Project in IMT4807.

## How to run the project?

### Backend
1. Clone or download this repository to your local machine.
2. Install all the libraries mentioned in the requirements.txt file with the command `pip3 install -r backend/requirements.txt`
3. Create a file name `config.ini` in backend folder
4. Paste the code in `config.ini` and insert key deatils which you will get keys here [developer.twitter.com](https://developer.twitter.com/en)
```
[twitter]

api_key = Your Keys
api_key_secret = Your Keys
```
5. `$ python backend/API/app.py`
6. Visit http://127.0.0.1:5000/docs

### Frondend
1. Install Node JS
2. `$ cd frondend`
3. `$ yarn install`
4. `$ npm start`
5. Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)