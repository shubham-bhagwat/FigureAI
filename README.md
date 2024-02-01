# FigureAI Project Dashboard

Welcome to the FigureAI Project Dashboard – a web application designed to visualize key performance indicators (KPIs) with interactive speedometers. This dashboard provides insights into various aspects of FigureAI project, including Upper Level Systems, Connectivity, Manipulation, Locomotion, AI/Intelligence, Perception, and Electrification.

## Features

- **Interactive Speedometers**: Each KPI is represented by an interactive speedometer, providing a quick overview of its performance.
- **Modal View**: Click on a KPI to view detailed information in a modal with a larger speedometer for a closer look at the current status.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- react-d3-speedometer: A React component for creating customizable speedometers.
- Modal: A simple modal component for React.
- Oracle SQL: Backend database for storing KPI details.

## Getting Started

Follow these steps to set up and run the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shubham-bhagwat/FigureAI.git

2. **Install Dependencies**:
    ```bash
    cd figureai-dashboard
    npm install

3. **Run the Application**: 
    ```bash
    npm start
The application will be accessible at http://localhost:3000.


## Configuration

Adjust the Oracle SQL database connection details in the backend to match your setup. The backend configuration can be found in the server.js file.

## KPI Details

Modify the KPI details in the kpiDetails.js file to reflect the specific details and conditions for each KPI.


Feel free to contribute to the project by submitting issues or pull requests. Your feedback and enhancements are welcome!
