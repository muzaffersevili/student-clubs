
import { Component, ChangeEvent } from "react";
import AnnouncementDataService from "../services/announcement.service";
import { Link } from "react-router-dom";
import ISannouncementData from '../types/announcement.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = {
  announcements: Array<ISannouncementData>,
  currentAnnouncement: ISannouncementData | null,
  currentIndex: number,
  searchTitle: string,
  isAdmin: boolean
};

export default class AnnouncementList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAnnouncements = this.setActiveAnnouncements.bind(this);
    this.removeAllAnnouncements = this.removeAllAnnouncements.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
        announcements: [],
        currentAnnouncement: null,
      currentIndex: -1,
      searchTitle: "",
      isAdmin: false
    };
  }

  async componentDidMount() {
    const isAdmin = await AdminControl();
    this.setState({ isAdmin });

    if (isAdmin) {
      await this.retrieveAnnouncements();
    }
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
        searchTitle: searchTitle
    });
  }

  async retrieveAnnouncements(): Promise<void> {
    AnnouncementDataService.getAll()
      .then((response: any) => {
        this.setState({
            announcements: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAnnouncements();
    this.setState({
        currentAnnouncement: null,
      currentIndex: -1
    });
  }

  setActiveAnnouncements(announcement: ISannouncementData, index: number) {
    this.setState({
        currentAnnouncement: announcement,
      currentIndex: index
    });
  }

  removeAllAnnouncements() {
    AnnouncementDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
        currentAnnouncement: null,
      currentIndex: -1
    });

    AnnouncementDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
            announcements: response.data
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
      const { searchTitle, announcements, currentAnnouncement, currentIndex } = this.state;

      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Student Clubs List</h4>

            <ul className="list-group">
              {announcements &&
                announcements.map((announcement: ISannouncementData, index: number) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAnnouncements(announcement, index)}
                    key={index}
                  >
                    {announcement.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-lg btn-danger"
              onClick={this.removeAllAnnouncements}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentAnnouncement ? (
              <div>

                <h4>
                  <strong>Student Club</strong>
                </h4>

                <div>
                  <h5>
                    <strong>Name:</strong>{currentAnnouncement.title}
                  </h5>{" "}

                </div>

                <div>
                  <h5>
                    <strong>Description:</strong>{currentAnnouncement.description}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h5>
                    <strong>Status:</strong>{currentAnnouncement.isActive ? "Active" : "Inactive"}
                  </h5>{" "}
                </div>

                <div>
                  <h3>
                    <Link
                      to={"/sclubs/" + currentAnnouncement.id}
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