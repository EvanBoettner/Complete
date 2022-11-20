import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./Rocketbooking.css";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { db } from "../components/firebase-config";

const Rbooking: React.FC = () => {
  const [events, setEvents] = useState([{}]);
  const event = [
    {
      title: "The Title", // a property!
      start: "2022-11-11", // a property!
      end: "2022-11-11", // a property! ** see important note below about 'end' **
      groupId: "a1",
    },
  ];
  useEffect(() => {
    onSnapshot(collection(db, "Bookings"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    // console.log(events);
  }, [events]);


  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Rocket Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="calendar">
          <EventCalendar/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rbooking;
