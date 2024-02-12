import React from 'react';
import Header from '../components/Header';
import CronometroComponente from '../components/CronometroComponente';
import ListaMaterial from '../components/ListaMaterial';

function Secciones() {
  return (
    <>
      <Header />

      <div className="flex  p-5">
        <div className="ml-36 mr-36 w-1/2 mt-26">
          <CronometroComponente />
        </div>
        <div className="mr-52 ml-36 w-1/2 mt-26">
          <ListaMaterial></ListaMaterial>
        </div>
      </div>
    </>
  );
}

export default Secciones;
