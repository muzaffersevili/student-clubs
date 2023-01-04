import { Component, ChangeEvent } from "react";
import EventDataService from "../services/event.service";
import ISeventData from '../types/event.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = ISeventData & {
  submitted: boolean
  adminAccess: boolean
};

export default class AddEvent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      location: "",
      endDate: "",
      startDate: "",
      submitted: false,
      adminAccess: false
    };
  }
  async componentDidMount() {
    this.setState({
      adminAccess: await AdminControl()
    });
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeLocation(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeEndDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      endDate: e.target.value
    });
  }

  onChangeStartDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      startDate: e.target.value
    });
  }

  saveEvent() {
    const data: ISeventData = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      endDate: this.state.endDate,
      startDate: this.state.startDate
    };

    EventDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          endDate: response.data.endDate,
          startDate: response.data.startDate,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newEvent() {
    this.setState({
      id: null,
      title: "",
      description: "",
      location: "",
      endDate: "",
      startDate: "",
      submitted: false
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
      const { submitted, title, description, location, endDate, startDate } = this.state;

      return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success btn-lg" onClick={this.newEvent}>
                Add Event
              </button>
            </div>
          ) : (
            <div>
              <h4>
                <div className="form-group">

                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={title}
                    onChange={this.onChangeTitle}
                    title="title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    required
                    value={location}
                    onChange={this.onChangeLocation}
                    name="location"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="startDate"
                    required
                    value={startDate}
                    onChange={this.onChangeStartDate}
                    name="startDate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="endDate"
                    required
                    value={endDate}
                    onChange={this.onChangeEndDate}
                    name="endDate"
                  />
                </div>

                <button onClick={this.saveEvent} className="btn btn-success btn-lg">
                  Submit
                </button>
              </h4>
            </div>
          )}
        </div>
      );
    }
  }

}