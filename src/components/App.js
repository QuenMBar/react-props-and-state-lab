import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            pets: [],
            filters: {
                type: "all",
            },
        };
    }

    handleChangeType = (event) => {
        this.setState({
            filters: {
                ...this.state.filters,
                type: event.target.value,
            },
        });
    };

    handleFindPetsClick = () => {
        let url;
        switch (this.state.filters.type) {
            case "all":
                url = "/api/pets";
                break;
            case "cat":
                url = "/api/pets?type=cat";
                break;
            case "dog":
                url = "/api/pets?type=dog";
                break;
            case "micropig":
                url = "/api/pets?type=micropig";
                break;
            default:
                url = "/api/pets";
                break;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    pets: data,
                });
            });
    };

    handleAdoptPet = (id) => {
        let ind = this.state.pets.findIndex((pet) => pet.id === id);
        this.setState(({ pets }) => ({
            pets: [
                ...pets.slice(0, ind),
                {
                    ...pets[ind],
                    isAdopted: true,
                },
                ...pets.slice(ind + 1),
            ],
        }));
    };

    render() {
        return (
            <div className="ui container">
                <header>
                    <h1 className="ui dividing header">React Animal Shelter</h1>
                </header>
                <div className="ui container">
                    <div className="ui grid">
                        <div className="four wide column">
                            <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick} />
                        </div>
                        <div className="twelve wide column">
                            <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
