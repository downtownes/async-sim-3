import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getAllUsers, getFriends } from '../../ducks/reducer';
import _ from 'underscore';
import '../../App.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendedUsers: [],
            friendsList: [],
            usersFiltered: [],
            completeFilter: []
        }
        this.sortedBy = this.sortedBy.bind(this);
    }

    componentDidMount() {
        axios.all([axios.get('/api/auth/authenticated'), axios.get('/api/recommended'), axios.get('/api/friend/list')]).then(res => {

            this.props.getUser(res[0].data);
            this.props.getAllUsers(res[1].data);
            this.props.getFriends(res[2].data);
        })
    }


    //THIS IS THE PROJECT FOR THE WEEKEND
    sortedBy(value) {

        axios.get('/api/recommended').then(res => {
            this.props.getAllUsers(res.data);
        })

        let filteredUsers = this.props.allUsers.filter((val) => {
            return val[value] === this.props.user[value]
        })
        console.log(filteredUsers)
        let filteredUsersArray = filteredUsers;
        console.log(this.state.usersFiltered)
        let justFriendIds = [];
        this.props.usersFriends.map((val, i) => {
            justFriendIds.push(val.friend_id);
        })
        let filteredFriends = filteredUsersArray.filter((userId, i) => {
            return justFriendIds.indexOf(userId.id) === -1;
        })
        this.setState({
            recommendedUsers: filteredFriends
        })
    }

    // sortWithFriends(value) {
    //     this.sortedBy(value);
    //     let justFriendIds = [];
    //     console.log(this.state.usersFiltered)
    //     this.props.usersFriends.map((val, i) => {
    //         justFriendIds.push(val.friend_id);
    //     })
    //     let filteredFriends = this.state.usersFiltered.filter((userId, i) => {
    //         return justFriendIds.indexOf(userId.id) === -1;
    //     })
    //     console.log(this.state.usersFiltered);
    //     console.log(filteredFriends)
    //     this.setState({
    //         recommendedUsers: filteredFriends
    //     })
    // }

    addFriend(friendId) {
        let friend = {
            id: this.props.user.id,
            friend_id: friendId
        }
        axios.post('/api/friend/add', friend).then(res => {
            this.props.history.push('/home');
        })
    }


    render() {
        const { getUser } = this.props; //this ONLY WORKS INSIDE THE RENDER METHOD
        console.log(this.props.allUsers);
        console.log(this.state.usersFiltered);
        console.log(this.state.recommendedUsers);

        let userCards = this.state.recommendedUsers.map((val, i) => {
            return <div key={i} className="recommendedFriend">
                <div className="imageAndNameContainer">
                    <img src={val.profilepic} className="recommendedFriendPic" />
                    <div className="nameContainer">
                        <h3 value={val.firstname} className="recommendedFriendName">{val.firstname}</h3>
                        <h3 value={val.lastname} className="recommendedFriendName">{val.lastname}</h3>
                    </div>
                </div>
                <button value={val.id} className="addFriendButton" onClick={(e) => this.addFriend(e.target.value)}>Add Friend</button>
            </div>
        })

        return (
            <div className="Home">
                <NavBar />
                <div className="middleHomeContainer">
                    <div className="topTwoContainers">
                        <div className="homeNameAndImageContainer">
                            <div className="homeProfileAvatar">
                                <img className="avatarImage" src={this.props.user.profilepic} />
                            </div>
                            <div className="homeProfileIcons">
                                <h4>{this.props.user.firstname + '' + this.props.user.lastname}</h4>
                                <Link to="/profile"><button className="homeEditProfileButton">Edit Profile</button></Link>
                            </div>
                        </div>
                        <div className="welcomeToHelo">
                            <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                        </div>
                    </div>
                    <div className="homeBottomContainer">
                        <div className="homeTitleAndSelect">
                            <h3 className="recommendedFriends">Recommended Friends</h3>
                            <div className="sortedBy">
                                <h4 >Sorted By</h4>
                                <select onChange={(e) => this.sortedBy(e.target.value)} className="sortingDropdown">
                                    <option value="firstname">First Name</option>
                                    <option value="lastname">Last Name</option>
                                    <option value="gender">Gender</option>
                                    <option value="hobby">Hobby</option>
                                    <option value="haircolor">Hair Color</option>
                                    <option value="eyecolor">Eye Color</option>
                                    <option value="birthday">Birthday</option>
                                </select>
                            </div>
                        </div>
                        <div className="recommendedFriendsContainer">
                            {userCards}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user, allUsers, usersFriends } = state;

    return {
        user,
        allUsers,
        usersFriends
    }
}
export default connect(mapStateToProps, { getUser, getAllUsers, getFriends })(Home);


        // let justFriendIds = [];
        // this.props.usersFriends.map((val, i) => {
        //     justFriendIds.push(val.friend_id);
        // })
        //Tuesday or homework
        // let filteredFriends = filteredUsers.filter((userId, i) => {
        //     return justFriendIds.indexOf(userId.id) === -1;
        // })
        // } else {
        //     this.setState({
        //         recommendedUsers: this.state.usersFiltered
        //     })
        // }