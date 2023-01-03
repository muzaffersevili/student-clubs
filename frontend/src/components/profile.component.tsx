import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
/**
 * This page gets current User from Local Storage
 *  by calling AuthService.getCurrentUser() method and show user information (with token).
 */
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <div className="text-center">
                <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  style={{borderRadius: "50%"}}
                />
              </div>
              <h3>
                {"\n"}
              </h3>
              <h3>

                <div className="text-center">
                  <strong>{currentUser.email}</strong>'s Profile
                </div>
              </h3>
            </header>
            <h4>
              <strong>Email:</strong>{" "}
              {currentUser.email}
              {"\n"}
            </h4>
            <h4>
              <strong>Phone Number:</strong>{" "}
              Phone Number
              {"\n"}
            </h4>
            <h4>
              <strong>Authorities:{"\n"}</strong>
            </h4>
            <ul>
              <h5>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </h5>
            </ul>
          </div> : null}
      </div>
    );
  }
}

export { Profile };
