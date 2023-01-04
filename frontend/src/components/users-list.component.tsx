import { Component, ChangeEvent } from "react";
import UserDataService from "../services/user.data.service";
import { Link } from "react-router-dom";
import IUser from '../types/user.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = {
    users: Array<IUser>,
    currentUser: IUser | null,
    currentRoles: Array<string>,
    currentIndex: number,
    searchName: string,
    isAdmin: boolean
};

export default class UsersList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentRoles: [],
            currentIndex: -1,
            searchName: "",
            isAdmin: false
        };
    }

    async componentDidMount() {
        const isAdmin = await AdminControl();
        this.setState({ isAdmin });

        if (isAdmin) {
            await this.retrieveUsers();
        }
    }

    onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    async retrieveUsers(): Promise<void> {
        UserDataService.getAll()
            .then((response: any) => {
                this.setState({

                    users: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    retrieveRoles(currentUser: IUser){
        UserDataService.getRoles(currentUser.id)
            .then((response: any) => {
                this.setState({
                    currentRoles: response
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setActiveUser(user: IUser, index: number) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
        this.retrieveRoles(user);
    }
    searchName() {
        this.setState({
            currentUser: null,
            currentIndex: -1
        });

        UserDataService.findByName(this.state.searchName)
            .then((response: any) => {
                this.setState({
                    users: response.data
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
            const { searchName, users, currentUser, currentIndex } = this.state;

            return (
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control-lg"
                                placeholder="Search by name"
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
                            {users &&
                                users.map((user: IUser, index: number) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveUser(user, index)}
                                        key={index}
                                    >
                                        {user.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {currentUser ? (
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
                                        <strong>Phone:</strong>{currentUser.phone}
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
                                        <strong>Roles:</strong>{this.state.currentRoles}
                                    </label>{" "}

                                </div>
                                <Link
                                    to={"/users/" + currentUser.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a User...</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

}