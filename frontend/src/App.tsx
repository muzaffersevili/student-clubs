import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import BoardStudent from "./components/board-student.component";
import BoardCounselor from "./components/board-counselor.component";
import BoardAdmin from "./components/board-admin.component";
import BoardChairPerson from "./components/board-chairperson.component";

import AddSclub from "./components/add-sclub.component";
import Sclub from "./components/sclub.component";
import SclubsList from "./components/sclubs-list.component";
import SclubsShowList from "./components/sclubShow.component";

import AddUser from "./components/add-user.component";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";

import AddAnnouncement from "./components/add-announcement.component";
import Announcement from "./components/announcement.component";
import AnnouncementsList from "./components/announcements-list.component";

import AddEvent from "./components/add-event.component";
import Event from "./components/event.component"
import EventsList from "./components/events-list.component";

import EventBus from "./common/EventBus";

type Props = {};

type State = {
  showStudentBoard: boolean,
  showCounselorBoard: boolean,
  showChairPersonBoard: boolean,
  showAdminBoard: boolean,

  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showStudentBoard: false,
      showCounselorBoard: false,
      showChairPersonBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showCounselorBoard: user.roles.includes("ROLE_COUNSELOR"),
        showChairPersonBoard: user.roles.includes("ROLE_CHAIRPERSON"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showStudentBoard: false,
      showCounselorBoard: false,
      showChairPersonBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showStudentBoard, showCounselorBoard, showChairPersonBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Student Clubs
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
                </Link>
              </li>
            )}

            {showCounselorBoard && (
              <li className="nav-item">
                <Link to={"/counselor"} className="nav-link">
                  Counselor Board
                </Link>
              </li>
            )}

            {showChairPersonBoard && (
              <li className="nav-item">
                <Link to={"/chairperson"} className="nav-link">
                  Chairperson Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/sclubs"} className="nav-link">
                  Student Clubs
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addSclub"} className="nav-link">
                  Add Student Club
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addUser"} className="nav-link">
                  Add Users
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/announcements"} className="nav-link">
                  Announcements
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addAnnouncement"} className="nav-link">
                  Add Announcement
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/events"} className="nav-link">
                  Events
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addEvents"} className="nav-link">
                  Add Event
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {(currentUser.email)!.split('@')[0]}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/student" element={<BoardStudent />} />
            <Route path="/counselor" element={<BoardCounselor />} />
            <Route path="/chairperson" element={<BoardChairPerson />} />
            <Route path="/admin" element={<BoardAdmin />} />

            <Route path="/sclubs" element={<SclubsList/>} />
            <Route path="/sclubss" element={<SclubsShowList/>} />
            <Route path="/addSclub" element={<AddSclub/>} />
            <Route path="/sclubs/:id" element={<Sclub/>} />

            <Route path="/users" element={<UsersList/>} />
            <Route path="/addUser" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />

            <Route path="/announcements" element={<AnnouncementsList/>} />
            <Route path="/addAnnouncement" element={<AddAnnouncement/>} />
            <Route path="/announcements/:id" element={<Announcement/>} />
            

            <Route path="/events" element={<EventsList/>} />
            <Route path="/addEvent" element={<AddEvent/>} />
            <Route path="/events/:id" element={<Event/>} />
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;