import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
    render() {
        return (
            <div className="ui cards">
                {this.props.pets.map((petElem) => (
                    <Pet onAdoptPet={this.props.onAdoptPet} pet={petElem} key={petElem.id} />
                ))}
            </div>
        );
    }
}

export default PetBrowser;
