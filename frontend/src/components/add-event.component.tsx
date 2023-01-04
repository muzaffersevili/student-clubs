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
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      submitted: false,
      adminAccess: false
    };
  }
  async componentDidMount() {
    this.setState({
      adminAccess: await AdminControl()
    });
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  saveEvent() {
    const data: ISeventData = {
      title: this.state.title,
      description: this.state.description
    };

    EventDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
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
      const { submitted, title, description } = this.state;

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

                  <label htmlFor="name">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={title}
                    onChange={this.onChangeName}
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