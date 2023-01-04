
import { Component, ChangeEvent } from "react";

import LogService from "../services/log.service"
import ILogData from "../types/log.type"

import AdminControl from '../services/admin-control';
import { Link } from "react-router-dom";

type Props = {};

type State = {
  logs: Array<ILogData>,
  currentLog: ILogData | null,
  currentIndex: number,
  searchName: string,
  isAdmin: boolean
  content: string
}

export default class BoardAdmin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrievelogs = this.retrievelogs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLog = this.setActiveLog.bind(this);

    this.removeAllLogs = this.removeAllLogs.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      logs: [],
      currentLog: null,
      currentIndex: -1,
      searchName: "",
      isAdmin: false,
      content: ""
    };
  }

  async componentDidMount() {
    const isAdmin = await AdminControl();
    this.setState({ isAdmin });

    if (isAdmin) {
      await this.retrievelogs();
    }
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  async retrievelogs(): Promise<void> {
    LogService.getAll()
      .then((response: any) => {
        this.setState({
          logs: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievelogs();
    this.setState({
      currentLog: null,
      currentIndex: -1
    });
  }
  setActiveLog(log: ILogData, index: number) {
    this.setState({
      currentLog: log,
      currentIndex: index
    });
  }
  removeAllLogs() {
    LogService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentLog: null,
      currentIndex: -1
    });

    LogService.findByName(this.state.searchName)
      .then((response: any) => {
        this.setState({
          logs: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    if (!this.state.isAdmin) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>{"Require Admin Role!"}</h3>
          </header>
        </div>
      );
    }
    else {
      const { searchName, logs, currentLog, currentIndex } = this.state;
      return (
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control-lg"
              placeholder="Search by title"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Logs</h4>

          <ul className="list-group">
            {logs &&
              logs.map((log: ILogData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLog(log, index)}
                  key={index}
                >
                  {log.messageType}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-lg btn-danger"
            onClick={this.removeAllLogs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentLog ? (
            <div>
              <h4>Log</h4>
              <div>
                <label>
                  <strong>Type:</strong>{currentLog.messageType}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Message:</strong>{currentLog.message}
                </label>{" "}

              </div>

              <Link
                to={"/logs/" + currentLog.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Log...</p>
            </div>
          )}
        </div>
        </div>
      );
    }


  }
}
export { BoardAdmin };