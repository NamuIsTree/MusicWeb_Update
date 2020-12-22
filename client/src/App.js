import React from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import './App.css';

class AddAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            artist : "",
            genre : 0,
            nation : "",
            year : 0,
            volume : 0,
            rating : 0.0
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addAlbum()
        .then((response) => {
            console.log(response);
        })
    }

    addAlbum = async () => {
        const {name, artist, genre, nation, year, volume, rating} = this.state;
        const url = 'http://moonmusic.duckdns.org:8081/api/upload';

        const obj = {
            name: name,
            artist: artist,
            genre: genre,
            nation: nation,
            year: year,
            volume: volume,
            rating: rating
        };

        const response = await axios.post(url, obj);
    }

    render() {
        return (
            <form onSubmit = {this.handleFormSubmit}>
                <h2>Album UPLOAD</h2>
                <h4>장르 [ 1:POP, 2:R&B/Soul, 3:Rock, 4:J-POP, 5:Jazz, 6:HipHop, 7:Electronic, 8:Others ]</h4>
                앨범이름 : <input type = "text" name="name" value = {this.state.name} onChange={this.handleValueChange} /> <br/>
                아티스트 : <input type = "text" name="artist" value = {this.state.artist} onChange={this.handleValueChange} /> <br/>
                장 르 : <input type = "text" name="genre" value = {this.state.genre} onChange={this.handleValueChange} /> <br/>
                국 가 : <input type = "text" name="nation" value = {this.state.nation} onChange={this.handleValueChange} /> <br/>
                출시연도 : <input type = "text" name="year" value = {this.state.year} onChange={this.handleValueChange} /> <br/>
                볼 륨 : <input type = "text" name="volume" value = {this.state.volume} onChange={this.handleValueChange} /> <br/>
                Rating : <input type = "text" name="rating" value = {this.state.rating} onChange={this.handleValueChange} /> <br/>
                <button type="submit">업로드 하기</button>
            </form>
        );
    }
}

class Album extends React.Component {
    render() {
        const {id, name, artist} = this.props;
        const imgsrc = "http://moonmusic.duckdns.org:3000/images/" + id + ".jpg";

        return (
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell><img src={imgsrc} alt={name} height="150" width="150"/></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{artist}</TableCell>
            </TableRow>
        );
    }
}

class App extends React.Component {

    state = {
        albums: []
    }

    componentDidMount() {
        document.title = "음평회 앨범 Upload Webpage"
        this.getAlbums();
    }

    getAlbums = async () => {
        var url = "http://moonmusic.duckdns.org:8081/api/albums";
        const albums = await axios.get(url);
        this.setState({albums:albums.data});
    } 

    render() {
        const {albums} = this.state;

        return (
            <div>
                <center>
                    <h1>
                        대중 음악의 이해
                    </h1>
                    <h2>
                        정기 음평회 UPLOAD WEBPAGE
                    </h2>              
                <AddAlbum/>
                </center>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>음평회 순서</TableCell>
                            <TableCell>Album Cover</TableCell>
                            <TableCell>Album Name</TableCell>
                            <TableCell>Artist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {albums.map(album => (
                            <Album 
                                key = {album.id}
                                id = {album.id}
                                name = {album.name}
                                artist = {album.artist}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default App;
