import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Sclub from "./sclub.component";

type Props = {};

type State = {
  content: string;
}

export default class BoardAdmin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
    if(this.state.content == "Require Admin Role!"){
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
      );
    }
    else{
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>KRAL BABA GERİ DÖNDÜ</h3>
          </header>
        </div>
      );
    }
    
  }
}
export { BoardAdmin };
