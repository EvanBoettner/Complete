import {  
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    IonAlert,
    useIonRouter, } from "@ionic/react";
    import { personCircle } from "ionicons/icons";
    import React, { useState } from "react";
    import { app } from "../components/firebase-config";
    import { auth } from "../components/firebase-config";
    import { getDatabase, ref } from 'firebase/database';
    import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
    import { db } from "../components/firebase-config";

    const database = getDatabase(app)

    const Login: React.FC = () => {
    
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [message, setMessage] = useState<string>('');
        const [isError, setIserror] = useState<boolean>(false);
    
        const navigation = useIonRouter();
    
        const handleLogin = () => {
            if (validate_email(email) === false || validate_password(password) === false){
                //Don't run the code
                setMessage("Please enter a valid email or password");
                setIserror(true);
                return
            }
    
    
           const auth = getAuth();
           signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                //Declare user variable
                let user = auth.currentUser
    
                //Add this user to Firebase Database
                // let databaseRef = database.ref()
    
                let userData = {
                    email : email,
                    password : password,
                    lastLogin : Date.now()
                }
    
                //Push to Firebase Database
                // databaseRef.child('users/' + user!.uid).update(userData)
                //Done
                navigation.push('/app/Home/', 'root', 'replace')
            })
            .catch((error:any) => {
                //firebase will use this to alert errors
                setMessage("Auth failiure! Please try again");
                setIserror(true);
            });
    
            function validate_email(email: any) {
                let expression = /^[^@]+@\w+(\.\w+)+\w$/
                if(expression.test(email) === true ) {
                    //email is good
                    return true;
                } else {
                    //email is bad
                    return false;
                }
            };
            
            function validate_password(password: any) {
                //Firebase only accepts greater than 6
                if(password < 6){
                    return false
                } else {
                    return true
                }
            };
            
            };
    
    
        return (
            <IonPage>
            <IonHeader>
              <IonToolbar color="dark">
                <IonTitle className="ion-text-center">GE Rocket Booking</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
              <IonRow>
                <IonCol>
                  <IonAlert
                    isOpen={isError}
                    onDidDismiss={() => setIserror(false)}
                    cssClass="my-custom-class"
                    header={"Error!"}
                    message={message}
                    buttons={["Dismiss"]}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonIcon
                    color="danger"
                    style={{ fontsize: "70px", color: "#0040ff" }}
                    icon={personCircle}
                    size='large'
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <p style={{ fontSize: "small" }}>Welcome to GE Rocket Booking</p>
                  <IonButton color="danger" expand="block" onClick={handleLogin}>
                    Login
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonContent>
          </IonPage>
        );
      };
      
      export default Login;