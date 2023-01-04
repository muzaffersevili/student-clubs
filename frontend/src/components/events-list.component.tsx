import { Component, ChangeEvent } from "react";
import EventDataService from "../services/event.service";
import { Link } from "react-router-dom";
import IEventData from '../types/event.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = {
  events: Array<IEventData>,
  currentEvent: IEventData | null,
  currentIndex: number,
  searchTitle: string,
  isAdmin: boolean
};

export default class EventList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.removeAllEvents = this.removeAllEvents.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
        events: [],
        currentEvent: null,
      currentIndex: -1,
      searchTitle: "",
      isAdmin: false
    };
  }

  async componentDidMount() {
    const isAdmin = await AdminControl();
    this.setState({ isAdmin });

    if (isAdmin) {
      await this.retrieveEvents();
    }
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
        searchTitle: searchTitle
    });
  }

  async retrieveEvents(): Promise<void> {
    EventDataService.getAll()
      .then((response: any) => {
        this.setState({
            events: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEvents();
    this.setState({
        currentEvent: null,
      currentIndex: -1
    });
  }

  setActiveEvent(event: IEventData, index: number) {
    this.setState({
        currentEvent: event,
      currentIndex: index
    });
  }

  removeAllEvents() {
    EventDataService.deleteAll()
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
        currentEvent: null,
      currentIndex: -1
    });

    EventDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
            events: response.data
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
      const { searchTitle, events, currentEvent, currentIndex } = this.state;

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
            <h4>Event List</h4>

            <ul className="list-group">
              {events &&
                events.map((event: IEventData, index: number) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveEvent(event, index)}
                    key={index}
                  >
                    {event.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-lg btn-danger"
              onClick={this.removeAllEvents}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentEvent ? (
              <div>

                <h4>
                  <strong>Event</strong>
                </h4>

                <div>
                  <h5>
                    <strong>Title:</strong>{currentEvent.title}
                  </h5>{" "}

                </div>

                <div>
                  <h5>
                    <strong>Description:</strong>{currentEvent.description}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h5>
                    <strong>Location:</strong>{currentEvent.location}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h5>
                    <strong>Start Date:</strong>{currentEvent.startDate}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h5>
                    <strong>End Date:</strong>{currentEvent.endDate}
                  </h5>{" "}
                  
                </div>

                <div>
                  <h3>
                    <Link
                      to={"/events/" + currentEvent.id}
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
                <p>Please click on an Event...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

}