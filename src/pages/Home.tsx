import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Toaster } from 'react-hot-toast';
import { Header } from '../components/Header/Header';
import { Board } from '../components/Board/Board';
import './Home.css';

const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen scrollY={false}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header />
        <Board />
      </div>
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
    </IonContent>
  </IonPage>
);

export default Home;
