import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { Redirect, } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';




class Zlecenie extends Component {
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
      <div className="wrapperZadania">
        <Messages users={this.state.users} />
      </div>
    );
  }
}

class MessagesBase extends Component {
  minDate = new Date().toISOString().slice(0, 10)// aktualna data
  data = new Date().toISOString()
  state = {

    dataZlecenia: this.minDate,
    data: this.data,
    model: "",
    vin: "",
    firma: "",
    osoba: "",
    nrDo: "",
    nrAuto: "",
    nrPrzyczepa: "",
    dataZaladunku: this.minDate,
    dataRozladunku: this.minDate,
    uwagi: "",
    cmr: false,
    faktura: false,
    items: [],
    ok: false,
    active: true
  }



  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = (event) => {// dodawanie do tablicy elementów zadania
    const { dataZlecenia, model, vin, firma, osoba, nrDo, nrAuto, nrPrzyczepa, dataZaladunku, dataRozladunku, uwagi, cmr, faktura, active, data } = this.state
    this.props.firebase.zadania().push({

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

    this.setState({// czyszczenie
      currentItem: '',
      username: '',
      dataZlecenia: this.minDate,
      model: "",
      vin: "",
      firma: "",
      osoba: "",
      nrDo: "",
      nrAuto: "",
      nrPrzyczepa: "",
      dataZaladunku: this.minDate,
      dataRozladunku: this.minDate,
      uwagi: "",
      cmr: false,
      faktura: false,
      ok: true,
      data: this.data
    });

    event.preventDefault();


  };

  handleChange = e => {// uzuskiwanie value
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "date") {
      this.setState({
        [name]: e.target.value
      });
    } else if (type === "checkbox") {
      this.setState({
        [name]: e.target.checked
      });
    }
  };


  render() {
    if (this.state.ok === true) {
      return <Redirect to={ROUTES.ZADANIADOWYKONANIA} />
    }
    return (
      <>

        <div className='zadania_'>
          <section className="zadania__">
            <h1>Wprowadź zlecenie </h1>
            <form className="zadania___" onSubmit={this.handleSubmit}>
              <div className="form">
                <div className=" form-group">
                  <p>Data zlecenia</p>
                  <label htmlFor="dataZlecenia">
                    <input
                      className="form-control "
                      type="date"
                      id="dataZlecenia"
                      name="dataZlecenia"
                      value={this.state.dataZlecenia}
                      onChange={this.handleChange}
                      min={this.minDate}
                    />
                  </label>
                </div>
                <div>
                  <div className="form-group  ">
                    <p>Samochód</p>
                    <label htmlFor="model">
                      <input
                        placeholder="Model"
                        className="form-control"
                        type="text"
                        id="model"
                        name="model"
                        value={this.state.model}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="vin">
                      <input
                        placeholder="VIN"
                        className="form-control"
                        type="text"
                        id="vin"
                        name="vin"
                        value={this.state.vin}
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div className="form-group ">
                    <p>Dane przewoźnika</p>

                    <label htmlFor="firma">
                      <input
                        placeholder="Firma"
                        className="form-control"
                        type="text"
                        id="firma"
                        name="firma"
                        value={this.state.firma}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="osoba">
                      <input
                        placeholder="Imię i Nazwisko"
                        className="form-control"
                        type="text"
                        id="osoba"
                        name="osoba"
                        value={this.state.osoba}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="nrDo">
                      <input
                        placeholder="Nr do. osobistego"
                        className="form-control"
                        type="text"
                        id="nrDo"
                        name="nrDo"
                        value={this.state.nrDo}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="nrAuto">
                      <input
                        placeholder="Nr rej. samochodu"
                        className="form-control"
                        type="text"
                        id="nrAuto"
                        name="nrAuto"
                        value={this.state.nrAuto}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="nrPrzyczepa">
                      <input
                        placeholder="Nr do. przyczepy"
                        className="form-control"
                        type="text"
                        id="nrPrzyczepa"
                        name="nrPrzyczepa"
                        value={this.state.nrPrzyczepa}
                        onChange={this.handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group  ">
                  <p>Dane transportowe</p>
                  <div className="wrapperOstatnie">
                    <label className="labelOstatnie" htmlFor="dataZaladunku">
                      <input
                        className="form-control"
                        type="date"
                        id="dataZaladunku"
                        name="dataZaladunku"
                        value={this.state.dataZaladunku}
                        onChange={this.handleChange}
                        min={this.minDate}
                      />
                    </label>
                    <p>Załadunek</p>
                  </div>
                  <div className="wrapperOstatnie">
                    <label className="labelOstatnie" htmlFor="dataRozladunku">
                      <input
                        className="form-control"
                        type="date"
                        id="dataRozladunku"
                        name="dataRozladunku"
                        value={this.state.dataRozladunku}
                        onChange={this.handleChange}
                        min={this.minDate}
                      />
                    </label>
                    <p>Rozładunek</p>
                  </div>
                  <label htmlFor="uwagi">
                    <input
                      placeholder="Uwagi"
                      className="form-control"
                      type="text"
                      id="uwagi"
                      name="uwagi"
                      value={this.state.uwagi}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="wrapperCmr" >
                  <div className="wrapperChecbox">
                    <label className=" " htmlFor="cmr">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cmr"
                        name="cmr"
                        checked={this.state.cmr}
                        onChange={this.handleChange}
                      />
                      CMR
                        </label>
                    <label className=" " htmlFor="faktura">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="faktura"
                        name="faktura"
                        checked={this.state.faktura}
                        onChange={this.handleChange}
                      />
                      Faktura
                        </label>
                  </div>

                </div>
                <button >Zapisz</button>
              </div>
            </form>
          </section>
        </div>
      </>
    );
  }

}

const Messages = withFirebase(MessagesBase);


const condition = authUser => !!authUser;

export default compose(
  withFirebase,

  withAuthorization(condition),
)(Zlecenie);





