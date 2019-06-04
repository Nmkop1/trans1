import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import { withFirebase } from '../Firebase';

class Overlay extends Component {
    state = {
        widoczny: false
    }

    zmianaWidoczny = () => {
        this.setState({
            widoczny: !this.state.widoczny
        })
    }
    render() {
        const overflayClass = this.state.widoczny ? "modal visible" : "modal"
        const { id, dataZlecenia, model, vin, firma, osoba, nrDo, nrAuto, nrPrzyczepa, dataZaladunku, dataRozladunku, uwagi, cmr, faktura, editMode, editText, zadanie, onToggleEditMode, onChangeEditText, onSaveEditText, editDataZaladunku, onToggleEditDataZaladunku, onChangeEditDataZaladunku, onSaveEditDataZaladunku, editModeDataZaladunku } = this.props
        return (
            <div className="overflay">
                <div className="info" onClick={() => this.zmianaWidoczny()}>
                    <MDBIcon icon="info-circle" />

                </div>
                <div className={overflayClass}  >
                    <div className="wrapperOverflay">
                        <div className="wrapperOverflay_">
                            <div className="jedenOverflay">
                                <div className="dataZlecenia">
                                    <h1>D. zlecenia</h1>
                                </div>
                                <div className=" model">
                                    <h1>Model</h1>
                                </div>
                                <div className=" vin">
                                    <h1>VIN</h1>
                                </div>
                                <div className="firma">
                                    <h1>Firma</h1>
                                </div>
                                <div className="kierowca">
                                    <h1>Kierowca</h1>
                                </div>
                                <div className="nrDo">
                                    <h1>Nr dowodu</h1>
                                </div>
                                <div className="nrAuto">
                                    <h1>Nr auta</h1>
                                </div>
                                <div className="nrPrzyczepa">
                                    <h1>Nr przyczepy</h1>
                                </div>
                                <div className="dataZaladunku">
                                    <h1>D. załadunku</h1></div>
                                <div className="dataRozladunku">
                                    <h1>D. rozładunku</h1></div>
                                <div className="cmr">
                                    <h1>CMR</h1></div>
                                <div className="faktura">
                                    <h1>Faktura</h1>
                                </div>
                                <div className="uwagi">
                                    <h1>Uwagi</h1></div>
                            </div>
                            <div className="dwaOverflay">
                                <div className="dataZlecenia">
                                    <h1>{dataZlecenia} </h1>
                                </div>
                                <div className=" model">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={onChangeEditText}
                                        />
                                    ) : (
                                            <span>
                                                <span>
                                                    {zadanie.model}
                                                </span>
                                            </span>
                                        )}
                                    {editMode ? (
                                        <span>
                                            <div onClick={onSaveEditText}><MDBIcon icon="save" /></div>
                                            <div onClick={onToggleEditMode}><MDBIcon icon="reply-all" /></div>
                                        </span>
                                    ) : (
                                            <div onClick={onToggleEditMode}><MDBIcon far icon="edit" /></div>
                                        )}
                                </div>
                                <div className=" vin">
                                    <h1> {vin}</h1>
                                </div>
                                <div className="firma">
                                    <h1>{firma}</h1>
                                </div>
                                <div className="kierowca">
                                    <h1>{osoba} </h1>
                                </div>
                                <div className="nrDo">
                                    <h1>{nrDo} </h1>
                                </div>
                                <div className="nrAuto">
                                    <h1>{nrAuto} </h1>
                                </div>
                                <div className="nrPrzyczepa">
                                    <h1>{nrPrzyczepa} </h1>
                                </div>
                                <div className="dataZaladunku">

                                    {editModeDataZaladunku ? (
                                        <input
                                            type="date"
                                            value={editDataZaladunku}
                                            onChange={onChangeEditDataZaladunku}
                                        />
                                    ) : (
                                            <span>
                                                <span>
                                                    {zadanie.dataZaladunku}
                                                </span>
                                            </span>
                                        )}
                                    {editModeDataZaladunku ? (
                                        <span>
                                            <div onClick={onSaveEditDataZaladunku}><MDBIcon icon="save" /></div>
                                            <div onClick={onToggleEditDataZaladunku}><MDBIcon icon="reply-all" /></div>
                                        </span>
                                    ) : (
                                            <div onClick={onToggleEditDataZaladunku}><MDBIcon far icon="edit" /></div>
                                        )}

                                </div>
                                <div className="dataRozladunku">
                                    <h1>{dataRozladunku} </h1></div>
                                <div className="cmr">
                                    <h1>{cmr} </h1></div>
                                <div className="faktura">
                                    <h1>{cmr} </h1>
                                </div>
                                <div className="uwagi">
                                    <FileUpload storage={this.props.firebase.storage} id={id} />

                                </div>
                            </div>
                        </div>

                    </div>


                    <p className="close" onClick={() => this.zmianaWidoczny()}><MDBIcon far icon="times-circle" /></p>
                </div>
            </div>
        );
    }
}

export default (withFirebase)(Overlay);

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = this.props.storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                this.props.storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                })
            });
    }
    zmianaWidoczny = () => {
        this.setState({
            widoczny: !this.state.widoczny
        })
    }
    render() {
        const overflayClass = this.state.widoczny ? "modal visible" : "modal"
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (

            <div className="fileUpload">
                <div onClick={() => this.zmianaWidoczny()}>
                    <MDBIcon icon="images" />
                </div>
                <div className={overflayClass}  >
                    <div style={style}>
                        <progress value={this.state.progress} max="100" />
                        <br />
                        <input type="file" onChange={this.handleChange} />
                        <button onClick={this.handleUpload}>Upload</button>
                        <br />
                        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
                        <p onClick={() => this.zmianaWidoczny()}><MDBIcon far icon="times-circle" /></p>
                    </div>
                    {this.props.children}


                </div>
            </div>
        );
    }
}
