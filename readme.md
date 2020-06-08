# example of a firebase login with bring your own identity
- Not having to store user credentials is a great way to limit exposure as a data custodian.  
- Frontend authenticates with a byo identity flavor (google, github, linkedin... managed via widget configureFirebaseLoginWidget) and receives a bearer token back  
- Backend validate bearer by calling firebase with google.oauth2.id_token.verify_firebase_token  


# instructions
git clone  

goto https://console.firebase.google.com/  
If it is not already associated with your GCP project, chose Add a project from the project drop down at the top of the screen  
![select project img](./img/cb-select-project.png =302x)  


Click the gear icon in the topleft of the Firebase menu, and Chose project settings  
![select project img](./img/fb-proj-settings.png =576x)  


On the general page add a web app under "your apps" (leave hosting unchecked)  
Copy the JavaScript config into ./frontend/main.js  
![select project img](./img/fb-js-config.png =907x)  

also in main.js change backendHostUrl to match your backend  
and change the CORs front end url to match your front end application URL in main.py in the backend folder  


gcloud app deploy backend/app.yaml --project <your-project-id>  
gcloud app deploy frontend/app.yaml  --project <your-project-id>  


# split front / back ends
Facilitate independent deployments and isolate deployments to only what changed


## inspiration from 
https://github.com/GoogleCloudPlatform/python-docs-samples.git  
cd python-docs-samples/appengine/standard/firebase/firenotes  

