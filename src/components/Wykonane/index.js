import React, { Component } from 'react';
import { compose } from 'recompose';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../index.scss";

import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redireact } from 'react-router-dom';
import PunktListy from "./PunktListy"



class Wykonane extends Component {//wczytywanie usera
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

        const counter = 1
        const { index, dataZlecenia, model, vin, firma, osoba, nrDo, nrAuto, nrPrzyczepa, dataZaladunku, dataRozladunku, uwagi, cmr, faktura, active, data } = zadania[zadanie]
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

  zmiana = (id) => {// zmiana active:false
    this.props.firebase.zadanie(id).update({
      ...this.state.zadane,
      active: false

    })
  }


  render() {

    return (
      <>{this.state.spinners ? <CircularIndeterminate /> :
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

          <div className="wrapperLista_" >
            <ListaWykonane zadania={this.state.zadania}
              removeZadanie={this.removeZadanie}
              onEditMessage={this.onEditMessage}
              onEditDataZaladunku={this.onEditDataZaladunku}
              zmiana={this.zmiana}
            />
          </div>
        </div>
      }
      </>
    );
  }

}

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;


export default compose(
  withFirebase,

  withAuthorization(condition),
)(Wykonane);


const ListaWykonane = (props) => {
  const activeFalse = props.zadania.filter(zadanie => !zadanie.active)// filtrowanie z active:false

  //sortowanie w kolejności
  if (activeFalse.length >= 2) {
    activeFalse.sort((a, b) => {
      if (a.data < b.data) {
        return 1
      }
      if (a.data > b.data) {
        return -1
      }
      return 0
    })
  }



  const zadania = activeFalse.map(zadanie => <PunktListy key={zadanie.id}
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


const CircularIndeterminate = () => {//spinners
  const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });
  return (
    <div className="spinners">
      <CircularProgress className="spin" />
    </div>
  );
}