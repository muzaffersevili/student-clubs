
import { Component, ChangeEvent } from "react";
import SclubDataService from "../services/sclub.service";
import { Link } from "react-router-dom";
import ISclubData from '../types/sclub.type';

type Props = {};

type State = {
    sclubs: Array<ISclubData>,
    currentSclub: ISclubData | null,
    currentIndex: number,
    searchName: string
};

export default class sclubShowList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveSclubs = this.retrieveSclubs.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSclub = this.setActiveSclub.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            sclubs: [],
            currentSclub: null,
            currentIndex: -1,
            searchName: "",
        };
    }

    async componentDidMount() {
        await this.retrieveSclubs();
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

    setActiveSclub(sclub: ISclubData, index: number) {
        this.setState({
            currentSclub: sclub,
            currentIndex: index
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
                            sclubs.map((sclub: ISclubData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveSclub(sclub, index)}
                                    key={index}
                                >
                                    {sclub.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentSclub ? (
                        <div>

                            <h4>
                                <strong>Student Club</strong>
                            </h4>

                            <div>
                                <h5>
                                    <strong>Name:</strong>
                                </h5>{" "}
                                {currentSclub.name}
                            </div>

                            <div>
                                <h5>
                                    <strong>Description:</strong>
                                </h5>{" "}
                                {currentSclub.description}
                            </div>

                            <div>
                                <h5>
                                    <strong>Status:</strong>
                                </h5>{" "}
                                {currentSclub.isActive ? "Active" : "Inactive"}
                            </div>

                            <div>
                                <h3>
                                    <Link
                                        to={"/sclubss/"}
                                        className="badge badge-success"
                                    >
                                        Be a Member
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