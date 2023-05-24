# Samriddhi Agri-Commerce
# Team ID: FS65

# Team Members:
Arun Kumar N (1CR19CS025)
Deepu M (1CR19CS042)
Hemanth Kumar N (1CR19CS069)
# Mentor
Dr. Shreekanth M Prabhu
Professor and Head, Dept. of CSE

# Abstract
Samriddhi is an online platform that connects communities with their local agriculture, promoting sustainable and prosperous agri-commerce.
By eliminating intermediaries and creating direct connections between buyers, sellers, and transporters, Samriddhi fosters transparency, reduces transaction costs, and supports local economies.
This innovative approach allows buyers to purchase fresh, locally grown produce directly from farmers and farming communities, and enables farmers to sell their produce at a fair price, improving their income and livelihoods. 
Samriddhi's commitment to promoting local agriculture and fostering community involvement makes it a game-changer in the world of agri-commerce.

# Technology used
Frontend: HTML, CSS, Javascript, Bootstrap
Backend: NodeJS, ExpressJS
Database: MongoDB
Software: VS Code, Postman, MongoDBCompass

# Installation steps:
step 1: Download and unzip the folder
step 2: Create config.env file in config folder and type below requirements,
        PORT=3000
        DB_URI = mongodb://127.0.0.1:27017/SAMRIDDHIAGRIAPP
        JWT_SECRET=asecretkeywtfftwgrwgrmgkdfkmf
        JWT_EXPIRE=1d
        COOKIE_EXPIRE=5
        SMPT_SERVICE=gmail
        SMPT_MAIL = samriddhiagriapp@gmail.com
        SMPT_PASSWORD = samriddhi@123
        SMTP_HOST = smtp.gmail.com
step 3: run npm init
step 4: to run application use below command,
        npm run dev
