import React, { Component } from 'react';
import axios from 'axios';
import { getPaginatedUsers } from '../../ducks/reducer';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import '../../App.css';


class Search extends Component {
    constructor() {
        super();
        this.state = {
            paginatedUsers: []
        }
    }

    componentDidMount() {
        axios.get(`/api/user/list?page=${0}`).then(res => {
            console.log(res.data);
            this.setState({
                paginatedUsers: res.data
            })
        })
    }

    render() {
        console.log(this.props.paginatedUsers);
        let userCards = this.state.paginatedUsers.map((val, i) => {
            return (
                <div key={i} className="recommendedFriend">
                    <div className="imageAndNameContainer">
                        <img src={val.profilepic} className="recommendedFriendPic" />
                        <div className="nameContainer">
                            <h3 value={val.firstname} className="recommendedFriendName">{val.firstname}</h3>
                            <h3 value={val.lastname} className="recommendedFriendName">{val.lastname}</h3>
                        </div>
                    </div>
                    <button value={val.id} className="addFriendButton" onClick={(e) => this.addFriend(e.target.value)}>Add Friend</button>
                </div>
            )
        })

        return (
            <div className="Search">
                <NavBar />
                <div className="searchMainContainer">
                    <div className="searchFilteringTools">
                        <select className="searchSelectDropdown">
                            <option>First Name</option>
                            <option>Last Name</option>
                        </select>
                        <input className="searchInputBox" />
                        <button className="searchSearchButton">Search</button>
                        <button className="searchResetButton">Reset</button>
                    </div>
                    <div className="searchContainerHoldingFriendContainer">
                        <div className="searchFriendsContainer">
                            {userCards}
                        </div>
                    </div>
                    <div>
                        <button>Page 1</button>
                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    const { paginatedUsers } = state;

    return {
        paginatedUsers
    }
}
export default connect(mapStateToProps, { getPaginatedUsers })(Search);