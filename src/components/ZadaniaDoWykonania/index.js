import React, { Component } from 'react';
import { compose } from 'recompose';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../index.scss";
import { ClipLoader } from 'react-spinners';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';


import PunktListy from "./PunktListy"
import { Link, Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


class DoWykonania extends Component {//wczytywanie usera
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div className="wrapperZadania_">

        <Messages users={this.state.users} />

      </div>
    );
  }
}

class MessagesBase extends Component {

  state = {
    loading: false,
    zadania: [],
    ok: false,
    spinners: true
  }



  componentDidMount() {
    this.setState({
      loading: true,

    });

    this.props.firebase.zadania().on('value', snapshot => {// podieranie wszystkich danych z Firebase
      const zadania = snapshot.val();
      let newState = [];

      for (let zadanie in zadania) {


        const { dataZlecenia, model, vin, firma, osoba, nrDo, nrAuto, nrPrzyczepa, dataZaladunku, dataRozladunku, uwagi, cmr, faktura, active, data } = zadania[zadanie]
        newState.push({
          id: zadanie,
          dataZlecenia,
          model,
          vin,
          firma,
          osoba,
          nrDo,
          nrAuto,
          nrPrzyczepa,
          dataZaladunku,
          dataRozladunku,
          uwagi,
          cmr,
          faktura,
          active,
          data

        });

      }

      this.setState({
        zadania: newState,
        spinners: false
      });


    });

  };

  componentWillUnmount() {
    this.props.firebase.zadania().off();
  }

  onEditMessage = (zadanie, model) => {// edycja zadania
    const { id, ...messageSnapshot } = zadanie;
    this.props.firebase.zadanie(zadanie.id).set({
      ...messageSnapshot,
      model,


    });
  };
  onEditDataZaladunku = (zadanie, dataZaladunku) => {// edycja zadania
    const { id, ...messageSnapshot } = zadanie;
    this.props.firebase.zadanie(zadanie.id).set({
      ...messageSnapshot,

      dataZaladunku,

    });
  };

  removeZadanie = (id) => {// usuwanie zadania
    this.props.firebase.zadanie(id).remove();

  }

  zmiana = (id) => {// zmiana active:false przy wykonaniu zadania
    this.props.firebase.zadanie(id).update({
      ...this.state.zadane,
      active: false,

    })
    this.setState({
      ok: true
    })
  }


  render() {
    // if (this.state.ok === true) {
    //   return <Redirect to={ROUTES.HOME1} />
    // }
    const Spinners = () => (
      <div className='spinners'>
        <ClipLoader
          color={'#009170'}
          loading={this.state.loading}
          size={70}
        />
      </div>//https://reactjsexample.com/a-collection-of-loading-spinner-components-for-react/
    );
    return (

      <>
        <div>
          <div className="opisListy">
            <div></div>
            <div>
              <div className="opis"><p>Model</p></div>
              <div className="opis"><p>Przewoźnik</p></div>

            </div>
            <div>
              <div className="opis"><p>Załadunek</p></div>
              <div className="opis"><p>Rozładunek</p></div>
            </div>
          </div>
          {this.state.spinners ? <Spinners /> :
            <div className="wrapperLista_" >
              <ListaZadania zadania={this.state.zadania}
                removeZadanie={this.removeZadanie}
                onEditMessage={this.onEditMessage}
                onEditDataZaladunku={this.onEditDataZaladunku}
                zmiana={this.zmiana}
              />
            </div>}

        </div>
      </ >

    );
  }
}

const Messages = withFirebase(MessagesBase);
const condition = authUser => !!authUser;
export default compose(
  withFirebase,

  withAuthorization(condition),
)(DoWykonania);




const ListaZadania = (props) => {
  const active = props.zadania.filter(zadanie => zadanie.active)// filtrowanie z active:true

  //sortowanie w kolejności
  if (active.length >= 2) {
    active.sort((a, b) => {
      if (a.data < b.data) {
        return 1
      }
      if (a.data > b.data) {
        return -1
      }
      return 0
    })
  }

  const zadania = active.map(zadanie => <PunktListy key={zadanie.id}
    zadanie={zadanie}
    removeZadanie={props.removeZadanie}
    zmiana={props.zmiana}
    onEditMessage={props.onEditMessage}
    onEditDataZaladunku={props.onEditDataZaladunku}
  />)// pojedyńcze zadanie do PunktListy


  return (<>
    {zadania}

  </>
  );
}



