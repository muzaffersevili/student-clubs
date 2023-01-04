import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import UserDataService from "../services/user.data.service";


type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  currentRoles: Array<string>
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
      currentUser: { accessToken: "" },
      currentRoles: []
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    this.retrieveRoles(currentUser);
  }

  retrieveRoles(currentUser: IUser) {
    UserDataService.getRoles(currentUser.id)
      .then((response: any) => {
        this.setState({
          currentRoles: response
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
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
                  style={{ borderRadius: "50%" }}
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
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Name:</strong>{currentUser.name}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Surname:</strong>{currentUser.surname}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Phone:</strong> {currentUser.phone}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Email:</strong>{currentUser.email}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Personal Email:</strong>{currentUser.personalEmail}
                </label>{" "}

              </div>
              <div>
                <label>
                  <strong>Password:</strong>{"***********"}

                </label>{" "}
              </div>
              <div>
                <label>
                  <strong>Roles:</strong>{this.state.currentRoles}
                </label>{" "}

              </div>
            </div>
            </div> : null}
      </div>
    );
  }
}

export { Profile };
