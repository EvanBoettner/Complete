import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSplitPane,
    IonMenu,
    IonRouterOutlet,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonSearchbar,
} from '@ionic/react'
import { homeSharp, logOutSharp, rocketSharp } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Rbooking from './Rocketbooking';

const Menu: React.FC = () => {

    const paths =[
        {name: 'Home', url: '/app/Home', icon: homeSharp},
        {name: 'Rocket Booking', url: '/app/Rocketbooking', icon: rocketSharp},
    ]

    return(
    <IonPage>
        <IonSplitPane when='ios' contentId='main'>
            <IonMenu contentId='main'>
            <IonSearchbar value="Search"></IonSearchbar>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                

                <IonContent>
                    {paths.map((item, index) => (
                        <IonMenuToggle key={index}>
                            <IonItem routerLink={item.url} routerDirection='forward'>
                                <IonIcon size='large' slot='start' icon={item.icon} />
                                {item.name}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                    <IonItem button routerLink='/' routerDirection='back'>
                        <IonIcon
                        size='large'
                        slot='start'
                        icon={logOutSharp}
                        ></IonIcon>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonContent>
            </IonMenu>

            <IonRouterOutlet id='main'>
                <Route exact path='/app/Home' component={Home} />
                <Route exact path='/app/Rocketbooking' component={Rbooking} />

                <Route exact path='/app'>
                    <Redirect to='/app/Home' />
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    </IonPage>
    )

};

export default Menu