import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: string;
}

export default class BoardStudent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getStudentBoard().then(
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
            <button type="submit" className="btn btn-info btn-lg">Show Student Clubs</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Memberships</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Events</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg">Show Announcements</button>
          </div>
        </header>
      </div>
    );
  }
}

export {BoardStudent};