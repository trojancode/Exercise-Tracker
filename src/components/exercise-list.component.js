import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td><Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a></td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = { exercises: [] };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({
                    exercises: res.data
                });
            })
            .catch((error) => {
                console.log((error));

            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList() {
        return this.state.exercises.map(currentExcersise => {
            return <Exercise exercise={currentExcersise} deleteExercise={this.deleteExercise} key={currentExcersise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <td>Username</td>
                            <td>Description</td>
                            <td>Duration</td>
                            <td>Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
