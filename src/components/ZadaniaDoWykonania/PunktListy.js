import React, { Component } from 'react';
import Overlay from "./Overlay"
import { MDBIcon } from "mdbreact";
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBPopover, MDBPopoverBody,
    MDBPopoverHeader, MDBTooltip
} from 'mdbreact';


class PunktyListy extends Component {
    state = {
        editMode: false,
        editText: this.props.zadanie.model,
        dataZaladunku: this.props.zadanie.dataZaladunku,
        index: 1,
        modal14: false,
        editModeDataZaladunku: false,
    }
    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }
    onToggleEditMode = () => {// funcja do edycji
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.zadanie.model,

        }));

    };
    onChangeEditText = event => {// funcja do edycji
        this.setState({
            editText: event.target.value
        });
    };
    onSaveEditText = () => {// funcja do edycji
        this.props.onEditMessage(
            this.props.zadanie,

            this.state.editText);
        this.setState({ editMode: false });
    };

    onToggleEditDataZaladunku = () => {// funcja do edycji
        this.setState(state => ({
            editModeDataZaladunku: !state.editModeDataZaladunku,
            editDataZaladunku: this.props.zadanie.dataZaladunku
        }));

    };
    onChangeEditDataZaladunku = event => {// funcja do edycji
        this.setState({
            editDataZaladunku: event.target.value
        });
    };

    onSaveEditDataZaladunku = () => {// funcja do edycji
        this.props.onEditDataZaladunku(
            this.props.zadanie,
            this.state.editDataZaladunku);
        this.setState({ editModeDataZaladunku: false });
    };


    render() {
        const { id, dataZlecenia, model, vin, firma, osoba, nrDo, nrAuto, nrPrzyczepa, dataZaladunku, dataRozladunku, uwagi, cmr, faktura } = this.props.zadanie




        return (< >

            <div className="wrapperLista">
                <div className="punktyListy1">
                    <div className="punktListy">
                        <MDBIcon icon="check-circle" onClick={this.toggle(14)} />
                        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                            <MDBModalHeader toggle={this.toggle(14)}>Czy uznajesz zlecenie z dnia <br />{dataZlecenia} za wykonane.</MDBModalHeader>
                            <MDBModalFooter>
                                <MDBBtn size="sm" outline onClick={this.toggle(14)}>Wróć</MDBBtn>
                                <MDBBtn size="sm" outline onClick={() => this.props.zmiana(id)}>Tak</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </div>
                </div>
                <div className="punktyListy2">
                    <div className="punktListy"><h1>{model}</h1> </div>
                    <div className="punktListy"><h1>{osoba}</h1> </div>
                </div>
                <div className="punktyListy3">
                    <div className="punktListy"><h1>{dataZaladunku}</h1> </div>
                    <div className="punktListy"><h1>{dataRozladunku}</h1> </div>
                </div>
                <div className="punktyListy4">
                    <div className="punktListy"><Overlay
                        id={id}
                        dataZlecenia={dataZlecenia}
                        model={model}
                        vin={vin}
                        firma={firma}
                        osoba={osoba}
                        nrDo={nrDo}
                        nrAuto={nrAuto}
                        nrPrzyczepa={nrPrzyczepa}
                        dataZaladunku={dataZaladunku}
                        dataRozladunku={dataRozladunku}
                        uwagi={uwagi}
                        cmr={cmr}
                        faktura={faktura}
                        editMode={this.state.editMode}
                        editText={this.state.editText}
                        zadanie={this.props.zadanie}
                        onToggleEditMode={this.onToggleEditMode}
                        onChangeEditText={this.onChangeEditText}
                        onSaveEditText={this.onSaveEditText}
                        editDataZaladunku={this.state.editDataZaladunku}
                        onToggleEditDataZaladunku={this.onToggleEditDataZaladunku}
                        onChangeEditDataZaladunku={this.onChangeEditDataZaladunku}
                        onSaveEditDataZaladunku={this.onSaveEditDataZaladunku}
                        editModeDataZaladunku={this.state.editModeDataZaladunku}
                    />
                    </div>
                </div>
            </div >
        </ >);
    }
}

export default PunktyListy;

