import React from 'react'

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
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addAlbum() {
        const {name, artist, genre, nation, year, volume, rating} = this.state;
        const url = 'http://moonmusic.duckdns.org:8081/api/customers';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('artist', artist);
        formData.append('genre', genre);
        formData.append('nation', nation);
        formData.append('year', year);
        formData.append('volume', volume);
        formData.append('rating', rating);

        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }

        return postMessage(url, formData, config);
    }

    render() {
        return (
            <form onSubmit = {this.handleFormSubmit}>
                <h1>Album Upload</h1>
                앨범명  : <input type = "text" name="name" value = {this.state.name} onChange={this.handleValueChange} /> <br/>
                가수명  : <input type = "text" name="artist" value = {this.state.artist} onChange={this.handleValueChange} /> <br/>
                장 르   : <input type = "text" name="genre" value = {this.state.genre} onChange={this.handleValueChange} /> <br/>
                국 적   : <input type = "text" name="nation" value = {this.state.nation} onChange={this.handleValueChange} /> <br/>
                연 도   : <input type = "text" name="year" value = {this.state.year} onChange={this.handleValueChange} /> <br/>
                Volume  : <input type = "text" name="volume" value = {this.state.volume} onChange={this.handleValueChange} /> <br/>
                Rating  : <input type = "text" name="rating" value = {this.state.rating} onChange={this.handleValueChange} /> <br/>
                <button type="submit">업로드 하기</button>
            </form>
        );
    }
}

export default AddAlbum;