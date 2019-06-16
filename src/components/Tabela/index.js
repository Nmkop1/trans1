import React, { Component } from 'react';
import { compose } from 'recompose';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "../../index.scss";

import {
  AuthUserContext,
  withAuthorization,

} from '../Session';
import { withFirebase } from '../Firebase';


import CircularProgress from '@material-ui/core/CircularProgress';

import { MDBCard, MDBListGroup, MDBListGroupItem, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBTooltip } from "mdbreact";
import { MDBIcon } from "mdbreact";


import { Link, Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


class Tabela extends Component {//wczytywanie usera
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      ok: false,
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
      <div className="wrapperTabela">

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
    spinners: true,

    columns: [{
      dataField: 'dataZlecenia',
      text: 'Zlecenie',
      sort: true,


      style: {
        fontWeight: 'bold',
        fontSize: '14px'
      }
    },
    {
      dataField: 'model',
      text: 'Auto',
      sort: true,
      style: {
        fontWeight: 'bold',
        fontSize: '14px'
      }

    }, {
      dataField: 'osoba',
      text: 'Kierowca',
      sort: true,
      style: {
        fontWeight: 'bold',
        fontSize: '14px'
      }
    }]
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
  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  zmiana = (id) => {// zmiana active:false przy wykonaniu zadania
    this.props.firebase.zadanie(id).update({
      ...this.state.zadanie,
      active: false,

    })

  }

  render() {
    const expandRow = {
      onlyOneExpanding: true,

      renderer: row => (
        < div >
          <MDBContainer>
            <MDBCard
              style={{
                width: "5rem",
                marginTop: ".5rem",
                marginRight: ".5rem"
              }}
              className="w-50 mb-1">
              <MDBListGroup  >
                <MDBListGroupItem ><h1>{`VIN`} </h1>  <p>{`${row.vin}`}</p></MDBListGroupItem>
                <MDBListGroupItem ><h1>{`Firma`} </h1>  <p>{`${row.firma}`}</p> </MDBListGroupItem>
                <MDBListGroupItem> <h1>{`Zał.`} </h1>  <p>{`${row.dataZaladunku}`}</p></MDBListGroupItem>
                <MDBListGroupItem> <h1>{`Roz.`} </h1>  <p>{`${row.dataRozladunku}`}</p></MDBListGroupItem>
                <MDBListGroupItem> <h1>{`Uwagi`} </h1>  <p>{`${row.uwagi}`}</p></MDBListGroupItem>
              </MDBListGroup>

            </MDBCard>
            <MDBCard style={{ width: "5rem", marginTop: ".5rem" }} className="w-50 mb-1">
              <MDBListGroup>
                <MDBListGroupItem> <h1>{`Dowód`} </h1>  <p>{`${row.nrDo}`}</p></MDBListGroupItem><MDBListGroupItem> <h1>{`Nr rej`} </h1>  <p>{`${row.nrAuto}`}</p></MDBListGroupItem>
                <MDBListGroupItem> <h1>{`Prz.`} </h1>  <p>{`${row.nrPrzyczepa}`}</p></MDBListGroupItem>
                <MDBListGroupItem> <h1>{`CMR`} </h1> {!row.cmr ? <p>{`TAK`}</p> : <p>{`NIE`}</p>}</MDBListGroupItem>
                <MDBListGroupItem> <h1>{`Faktura`} </h1> {!row.cmr ? <p>{`TAK`}</p> : <p>{`NIE`}</p>}</MDBListGroupItem>
              </MDBListGroup>
            </MDBCard>
          </MDBContainer>

          <MDBListGroup>
            <MDBBtn size="sm" outline onClick={this.toggle(14)}>Wykonano</MDBBtn>
            <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
              <MDBModalHeader toggle={this.toggle(14)}>Czy uznajesz zlecenie z dnia <br />{row.dataZlecenia} za wykonane.</MDBModalHeader>
              <MDBModalFooter>
                <MDBBtn size="sm" outline onClick={this.toggle(14)}>Wróć</MDBBtn>
                <MDBBtn size="sm" outline onClick={() => this.zmiana(row.id)}>Tak</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBListGroup>
        </div >
      ),
      showExpandColumn: true,
      expandByColumnOnly: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <MDBIcon icon="minus" />;
        }
        return <MDBIcon icon="plus" />;
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <MDBIcon icon="minus" />
          );
        }
        return (
          <MDBIcon icon="arrows-alt-v" style={{ color: " #009170" }} className="  ml-1" />
        );
      }
    };
    const defaultSorted = [{
      dataField: 'dataZlecenia',
      order: 'desc'// zmiana kierunku sortowania asc
    }];





    const options = {
      paginationSize: 2,
      pageStartIndex: 1,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.state.zadania.length
      }],


    };


    const zadania = this.state.zadania.filter(zadanie => zadanie.active)// filtrowanie z active:true


    return (
      <>

        {
          this.state.spinners ? <CircularIndeterminate /> :
            <BootstrapTable
              bootstrap4
              keyField='id'
              data={zadania}
              columns={this.state.columns}
              expandRow={expandRow}// dodatkowa informacja
              striped
              hover
              condensed
              tabIndexCell// obramowanie na komórce
              pagination={paginationFactory(options)}
              defaultSorted={defaultSorted}
              headerClasses="header-class"// clasa nagłowka
            />
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
)(Tabela);









function CircularIndeterminate() {//spinners
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

