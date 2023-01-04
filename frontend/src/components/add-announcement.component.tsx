import { Component, ChangeEvent } from "react";
import AnnouncementDataService from "../services/announcement.service";
import ISannouncementData from '../types/announcement.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = ISannouncementData & {
  submitted: boolean
  adminAccess: boolean
};

export default class AddAnnouncement extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveAnnouncement = this.saveAnnouncement.bind(this);
    this.newAnnouncement = this.newAnnouncement.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      isActive: true,
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

  saveAnnouncement() {
    const data: ISannouncementData = {
      title: this.state.title,
      description: this.state.description
    };

    AnnouncementDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          isActive: response.data.isActive,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newAnnouncement() {
    this.setState({
      id: null,
      title: "",
      description: "",
      isActive: true,
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
              <button className="btn btn-success btn-lg" onClick={this.newAnnouncement}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <h4>
                <div className="form-group">

                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={title}
                    onChange={this.onChangeTitle}
                    name="title"
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

                <button onClick={this.saveAnnouncement} className="btn btn-success btn-lg">
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