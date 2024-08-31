# Arabic Store Web Project

This project is an Arabic store web application built with **React.js**, **Laravel 11**, and **Tailwind CSS**. It offers a modern, responsive shopping experience with the convenience of ordering via **WhatsApp**.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Backend Setup (Laravel)](#step-2-backend-setup-laravel)
  - [Step 3: Frontend Setup (React.js)](#step-3-frontend-setup-reactjs)
- [Running the Application](#running-the-application)

## Screenshots
![App Screenshot](https://i.imgur.com/aM7SBHd.png)
![App Screenshot](https://i.imgur.com/i7oizfx.png)

## Features

- **React.js Frontend**: A dynamic and interactive user interface.
- **Laravel 11 Backend**: A powerful backend framework providing RESTful API support.
- **Tailwind CSS**: Ensures a responsive, modern design across all devices.
- **WhatsApp Ordering**: Allows users to place orders directly through WhatsApp.

## Technologies Used

- **React.js** - For building the frontend UI.
- **Laravel 11** - For backend development and API creation.
- **Tailwind CSS** - For responsive and customizable styling.
- **MySQL** - Database management.
- **WhatsApp API** - For enabling order placements via WhatsApp.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.x or later)
- **npm** or **yarn**
- **PHP** (v8.x or later)
- **Composer**
- **MySQL** (or any other compatible database)
- **Git**

## Installation

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lahmidiElidrissi/arabic-store-web.git
cd arabic-store-web
```

### Step 2: Backend Setup (Laravel)

Install PHP dependencies using Composer:

```bash
composer install
```

Copy the .env.example file to .env:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Run the database migrations to create the necessary tables:

```bash
php artisan migrate
```

Run seeder data

```bash
php db:seed
```


### Step 3: Frontend Setup (React.js)

Navigate to the frontend directory:
```bash
cd ../frontEnd
```

Install JavaScript dependencies using npm:
```bash
npm install
```

## Running the Application

### Step 1: Start the Backend Server

Navigate to the backend directory and run the Laravel development server:

```bash
php artisan serve
```

The backend will be accessible at http://127.0.0.1:8000/.

### Step 2: Start the Frontend Server

Navigate to the frontend directory and start the React development server:

```bash
cd ../frontEnd
npm run dev

```

The frontend will be accessible at http://localhost:5173.