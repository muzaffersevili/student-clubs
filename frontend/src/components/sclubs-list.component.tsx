
import { Component, ChangeEvent } from "react";
import SclubDataService from "../services/sclub.service";
import { Link } from "react-router-dom";
import ISclubData from '../types/sclub.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = {
  sclubs: Array<ISclubData>,
  currentSclub: ISclubData | null,
  currentIndex: number,
  searchName: string,
  isAdmin: boolean
};

export default class SclubsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSclubs = this.retrieveSclubs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSclub = this.setActiveSclub.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      sclubs: [],
      currentSclub: null,
      currentIndex: -1,
      searchName: "",
      isAdmin: false
    };
  }

  async componentDidMount() {
    const isAdmin = await AdminControl();
    this.setState({ isAdmin });

    if (isAdmin) {
      await this.retrieveSclubs();
    }
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  async retrieveSclubs(): Promise<void> {
    SclubDataService.getAll()
      .then((response: any) => {
        this.setState({
          sclubs: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSclubs();
    this.setState({
      currentSclub: null,
      currentIndex: -1
    });
  }

  setActiveSclub(tutorial: ISclubData, index: number) {
    this.setState({
      currentSclub: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    SclubDataService.deleteAll()
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
      currentSclub: null,
      currentIndex: -1
    });

    SclubDataService.findByName(this.state.searchName)
      .then((response: any) => {
        this.setState({
          sclubs: response.data
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
      const { searchName, sclubs, currentSclub, currentIndex } = this.state;

      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
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
            <h4>Student Clubs List</h4>

            <ul className="list-group">
              {sclubs &&
                sclubs.map((tutorial: ISclubData, index: number) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveSclub(tutorial, index)}
                    key={index}
                  >
                    {tutorial.name}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-lg btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentSclub ? (
              <div>

                <h4>
                  <strong>Student Club</strong>
                </h4>

                <div>
                  <h5>
                    <strong>Name:</strong>{currentSclub.name}
                  </h5>{" "}

                </div>

                <div>
                  <h5>
                    <strong>Description:</strong>{currentSclub.description}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h5>
                    <strong>Status:</strong>{currentSclub.isActive ? "Active" : "Inactive"}
                  </h5>{" "}
                </div>

                <div>
                  <h3>
                    <Link
                      to={"/sclubs/" + currentSclub.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                  </h3>
                </div>

              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Student Club...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

}