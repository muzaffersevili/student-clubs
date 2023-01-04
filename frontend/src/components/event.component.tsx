import React, { Component, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// EventDataService  ISeventData paths
import EventDataService from "../services/event.service";
import ISeventData from "../types/event.type";

import AdminControl from '../services/admin-control';
import { date } from "yup/lib/locale";

type Props = { id: string; navigation: any }

//parameters change
type State = {
    currentEvent: ISeventData;
    message: string;
    adminAccess: boolean
}


function withParams(Component: any) {
    return (props: any) => {
        const navigation = useNavigate();
        const params = useParams();
        return <Component {...props} id={params} navigation={navigation} />;
    }
}

class Events extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.updateActive = this.updateActive.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            currentEvent: {
                id: null,
                title: "",
                description: "",
                location: "",
                endDate: "",
                startDate: ""
            },
            message: "",
            adminAccess: false
        };
    }

    async componentDidMount() {// may cause a problem
        const adminAccess = await AdminControl();
        this.setState({ adminAccess });
        if (adminAccess) {
            let id: string;

            id = this.props.id;
            console.log(id);
            if (id) {
                this.getEvent(id);
            }
        }
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentEvent: {
                ...prevState.currentEvent,
                description: description,
            },
        }));
    }

    onChangeLocation(e: ChangeEvent<HTMLInputElement>) {
        const location = e.target.value;

        this.setState((prevState) => ({
            currentEvent: {
                ...prevState.currentEvent,
                location: location,
            },
        }));
    }

    onChangeEndDate(e: ChangeEvent<HTMLInputElement>) {
        const endDate = e.target.value;

        this.setState((prevState) => ({
            currentEvent: {
                ...prevState.currentEvent,
                endDate: endDate,
            },
        }));
    }

    onChangeStartDate(e: ChangeEvent<HTMLInputElement>) {
        const startDate = e.target.value;

        this.setState((prevState) => ({
            currentEvent: {
                ...prevState.currentEvent,
                startDate: startDate,
            },
        }));
    }


    getEvent(idProp: any) {
        EventDataService.get(idProp.id)
            .then((response: any) => {
                this.setState({
                    currentEvent: response,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateActive(status: boolean) {
        const data: ISeventData = {
            id: this.state.currentEvent.id,
            title: this.state.currentEvent.title,
            location: this.state.currentEvent.location,
            endDate: this.state.currentEvent.endDate,
            startDate: this.state.currentEvent.endDate,
            description: this.state.currentEvent.description,
        };

        EventDataService.update(data, this.state.currentEvent.id)
            .then((response: any) => {
                this.setState((prevState) => ({
                    currentEvent: {
                        ...prevState.currentEvent,
                    },
                    message: "The status was updated successfully!"
                }));
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateEvent() {
        EventDataService.update(
            this.state.currentEvent,
            this.state.currentEvent.id
        )
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The Event was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    deleteEvent() {
        EventDataService.delete(this.state.currentEvent.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.navigation("/events");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        if (!this.state.adminAccess) {
            return (
                <div className="container">
                    <header className="jumbotron">
                        <h3>{"Require Admin Role!"}</h3>
                    </header>
                </div>
            );
        }
        else {
            const { currentEvent } = this.state;

            return (
                <div>
                    {currentEvent ? (
                        <div className="edit-form">
                            <h3><strong>Event</strong></h3>
                            <form>
                                <div className="form-group">
                                    <h4>
                                        <label htmlFor="name">Title</label>
                                    </h4>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="name"
                                        value={currentEvent.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <h4>
                                        <label htmlFor="description">Description</label>
                                    </h4>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="description"
                                        value={currentEvent.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>

                                <div className="form-group">
                                    <h4>
                                        <label htmlFor="location">Location</label>
                                    </h4>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="location"
                                        value={currentEvent.location}
                                        onChange={this.onChangeLocation}
                                    />
                                </div>

                                <div className="form-group">
                                    <h4>
                                        <label htmlFor="startDate">Start Date</label>
                                    </h4>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="startDate"
                                        value={currentEvent.startDate}
                                        onChange={this.onChangeStartDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <h4>
                                        <label htmlFor="endDate">End Date</label>
                                    </h4>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="endDate"
                                        value={currentEvent.endDate}
                                        onChange={this.onChangeEndDate}
                                    />
                                </div>


                            </form>

                            <h3>
                                <button
                                    className="badge badge-danger mr-2"
                                    onClick={this.deleteEvent}
                                >
                                    Delete
                                </button>
                            </h3>

                            <h3>
                                <button
                                    type="submit"
                                    className="badge badge-success"
                                    onClick={this.updateEvent}
                                >
                                    Update
                                </button>
                                <p>{this.state.message}</p>
                            </h3>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on an Event...</p>
                        </div>
                    )}
                </div>
            );
        }

    }
}

export default withParams(Events)