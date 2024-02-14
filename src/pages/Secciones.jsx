import React from 'react';
import Header from '../components/Header';
import CronometroComponente from '../components/CronometroComponente';
import ListaMaterial from '../components/ListaMaterial';

function Secciones() {
  return (
    <>
      <Header />

      <div className="flex flex-col sm:flex-row p-5">
        <div className="mx-auto sm:ml-8 sm:mr-4 mt-4 sm:mt-26 w-full sm:w-1/2">
          <CronometroComponente />
        </div>
        <div className="mx-auto sm:ml-4 sm:mr-8 mt-4 sm:mt-26 w-full sm:w-1/2">
          <ListaMaterial></ListaMaterial>
        </div>
      </div>
    </>
  );
}

export default Secciones;
