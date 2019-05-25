# RxOn

### Project Description

RxOn is an online pharmacy platform that provides basic services of a brick and mortar pharmacy. There are two user types: 1-Patient  2-Pharmacist. The basic data it stores are prescriptions and their statuses for each patient. Patients can add prescriptions, and pharmacists can approve and fill prescriptions. Additional functionality can include payment integration, live-chat with pharmacists, and image recognition for prescription uploads.

### Details: a Patient User 

Anyone who has a prescription from a health provider. The patient user can register an account and then can upload/enter their prescription to request it to be filled. The patient must upload photo their prescription and fill in the form.

The patient can then choose whether they want to pick-up their prescription from the nearest partner pharmacy or ask it to be delivered. The platform updates the status of the prescription. 

There are six basic statuses:
1. Pending 2. Ready for pick up 3. Shipped 4. Canceled 5. Out of stock 6. Complete

The platform keeps all the patient medication history that they uploaded to the platform. 

### Details: a Pharmacist User

A pharmacist will be able to view all prescriptions, current statuses of each prescription, and associated patient user. 
The pharmacist can also update the status of the prescription according to action taken. So for example if a pending prescription is filled and the patient chose the “pick up option” then the pharmacist will update the status of the prescription to be ready to pick up.

### Minimal Requirements
* Patient and pharmacist/admin login
    * Select button to indicate whether user is a patient or pharmacist
* Patient home page
    * List of prescriptions
    * Prescriptions have name, strength, dose and status (pending approval, ready for pick-up, picked up/past)
    * Able to add a new prescription through basic text-field input
* Patient account page
    * Contact information and medical history
    * Title, first name, last name, gender, address, phone number, email, photo (?)
* Pharmacist home page
    * List of prescriptions to be filled
    * List of filled prescriptions
    * Each prescription has patient name, drug name, strength/dose
      * Patient name will be a link to the patient’s profile so pharmacist is able to contact them easily if need be
    * Button after prescription in ‘to-be-filled’ column to move it to ‘filled’ column
    * Button after prescription in ‘filled’ column to remove it from list
* Pharmacist account page
    * Contact information and other verification info
    * Pharmacy name, address, phone number

### Standard Requirements
* More sophisticated prescription adding (e.g. adding image, verification)
* Patient account page: show more details, restrict access and editing based on user type
  * e.g. prescription history
* Batch prescription filling
* Refilling past prescriptions
* Pharmacist can add price of medication that will appear on patient’s page next to their prescription ready for pick up
* Allow creation of pharmacist account through some verification

### Stretch Requirements
* Adding support for login with Google/Fb/ account
* Chat box where patient user is able to chat with pharmacist
* Database of prescriptions so that patient can easily input the medication data
* Payment integration with Stripe
* Image recognition where platform fills in the prescription form 
   * *note: legally the patient must upload their actual prescription but we also need the patient to fill in the prescription form)-Google Vision API.*
* User usage analytics
* Deployment of the application

### Minimal Requirement Breakdown
(see sub-bullet points of each minimal requirement above)

### Prototypes
#### Pharmacist home screen
![Image of pharmacist home screen](images/pharmacist_home.jpg?raw=true "Pharmacist Home")
#### Patient home screen
![Image of patient home screen](images/patient_home.jpg?raw=true "Patient Home")
#### Login screen and patient profile screen
![Image of login and profile](images/login_and_profile.jpg?raw=true "Login and Profile")