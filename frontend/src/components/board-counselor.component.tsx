import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: string;
}

export default class BoardCounselor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getCounselorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Member List</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Add Event</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Events</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Add Announcement</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Announcements</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Change Chairperson</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Change Student Club Informations</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Student Club Informations</button>
          </div>
        </header>
      </div>
    );
  }
}
export { BoardCounselor };
