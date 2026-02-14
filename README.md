# AI Symptom Prediction System

A machine learning–based healthcare decision-support application that predicts possible diseases from user-selected symptoms.  
This project demonstrates how Artificial Intelligence can assist in early health awareness and preventive healthcare.

---

## Project Overview
The AI Symptom Prediction System allows users to select symptoms through a simple web interface. A trained machine learning classification model analyzes the selected symptoms and predicts the most likely disease along with a confidence score.

This system is designed for educational purposes and health awareness only and does not replace professional medical diagnosis.

---

## Features
- Symptom selection interface
- Machine learning disease prediction
- Confidence score display
- Lightweight and fast prediction
- Simple and user-friendly UI

---

## Tech Stack
- Python
- Pandas
- Scikit-learn
- Streamlit
- Machine Learning (Decision Tree Classifier)

---

## Project Structure
AI_Symptom_Predictor
│
├── dataset.csv
├── train_model.py
├── app.py
├── model.pkl
└── README.md

---

## How It Works
1. Dataset containing symptoms and diseases is loaded
2. Machine learning model is trained using a classification algorithm
3. User selects symptoms in the web interface
4. Model predicts possible disease
5. Result is displayed with confidence score

---

## Installation & Run

Clone the repository:
git clone <your-repo-link>
cd AI_Symptom_Predictor

Install dependencies:
pip install pandas scikit-learn streamlit

Run the application:
streamlit run app.py

---

## Future Improvements
- Larger medical dataset
- Mobile application version
- Doctor consultation integration
- Cloud deployment
- Improved prediction accuracy

---

## Author
Aditya Warji
KLE College of Engineering and Technology (KLECET)

---

## Disclaimer
This project is for educational and awareness purposes only and should not be used as a substitute for professional medical advice.
