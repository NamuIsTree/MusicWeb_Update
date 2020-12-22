import React from 'react';

class Album extends React.Component {
    render() {
        const {id, name, artist, rating};
        return (
            <center>
            <div>
                Hello! I'm Albums.
            </div>
            </center>
        )
    }
}

export default Album;