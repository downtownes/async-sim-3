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
            paginatedUsers: [],
            numberOfUsers: 0,
            currentPage: 1,
            dropdownSelection: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/user/list?page=${0}`).then(res => {
            console.log(res.data);
            this.setState({
                paginatedUsers: res.data[0],
                numberOfUsers: res.data[1]
            })
        })
    }

    buttons(numOfUsers = this.state.numberOfUsers) {
        numOfUsers = numOfUsers /= 4;
        numOfUsers = Math.ceil(numOfUsers);
        console.log(numOfUsers);
        let buttonArray = [];
        for (var i = 1; i <= numOfUsers; i++) {
            console.log(i)
            buttonArray.push(<button className={this.state.currentPage === i ? 'selectedPage' : 'unselectedPages'} onClick={(e) => this.pageChange(e.target.value)} value={i} key={i}>{this.state.currentPage === i ? `Page ${i}` : i}</button>)
        }
        return buttonArray.map(val => val)
    }

    pageChange(pageNumber) {
        console.log(pageNumber)
        this.setState({
            currentPage: +pageNumber//adding the plus sign is going to convert this to a number
        })
        pageNumber = pageNumber * 4 - 4;
        console.log(pageNumber)
        axios.get(`/api/user/list?page=${pageNumber}`).then(res => {
            console.log(res.data)
            this.setState({
                paginatedUsers: res.data[0]
            })
        })
    }

    onChange() {
        axios.get(`/api/user/search?search=0&firstName=`)
    }

    render() {
        console.log(this.props.paginatedUsers);
        console.log(this.state)
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

        let pageButtons = this.buttons();

        return (
            <div className="Search">
                <NavBar />
                <div className="searchMainContainer">
                    <div className="searchFilteringTools">
                        <select className="searchSelectDropdown">
                            <option value="firstName" >First Name</option>
                            <option value="lastName" autofocus>Last Name</option>
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
                    <div className="searchPaginationButtonContainer">
                        {pageButtons}
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