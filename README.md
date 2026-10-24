# Fish Farm Management System (FFMS)

A full-stack database management system built to automate the operations of a 96-acre fish farm in Gharo, Sindh. 

**Course:** Database Management Systems (DBMS)
**Student:** Daniyal Siddiqui (UBIT, University of Karachi)
**Professor:** Khalid Jamal

## Technology Stack
- **Frontend:** Next.js (React), Tailwind CSS, Axios
- **Backend:** Django REST Framework, Python
- **Database:** PostgreSQL (16 Tables)
- **Auth:** Django Session Authentication

## Core Features (16 Modules)
- **Operations:** Ponds, Batches, Fingerling Stocking
- **Inventory:** Feed Deliveries, Feed Consumption
- **Health & Security:** Water Quality (pH/Ammonia), Mortality, Security Incidents
- **HR:** Workers, Attendance
- **Sales:** Harvests, Buyers, Auctions, Sales
- **Finance:** Expenses, Dynamic Profit/Loss Reports Dashboard

## How to Run Locally

### 1. Database Setup (PostgreSQL)
Create a database named `ffms` and a user `ffms_user` with password `ffms_pass123`.

### 2. Backend (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Create .env file in backend/ with your database credentials
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data  # Loads demo data
python manage.py runserver